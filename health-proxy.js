/**
 * Lightweight health-check proxy for Expo Web.
 *
 * Starts immediately on the public port (default 5173) and responds to
 * /health-coder with a plain-text "ok" — no bundler compilation needed.
 *
 * Every other request is reverse-proxied to the Expo/Metro dev server
 * running on METRO_PORT (default 19006). While Metro is still compiling,
 * those proxied requests will naturally wait until Metro is ready.
 */

const http = require("http");
const { spawn } = require("child_process");

const PUBLIC_PORT = parseInt(process.env.PORT || "5173", 10);
const METRO_PORT = parseInt(process.env.METRO_PORT || "19006", 10);

// Start Expo dev server on the Metro port
const expo = spawn(
  "npx",
  ["expo", "start", "--web", "--port", String(METRO_PORT), "--host", "0.0.0.0"],
  {
    stdio: "inherit",
    env: { ...process.env },
  }
);

expo.on("error", (err) => {
  console.error("[health-proxy] Failed to start Expo:", err);
  process.exit(1);
});

expo.on("exit", (code) => {
  console.log(`[health-proxy] Expo exited with code ${code}`);
  process.exit(code ?? 1);
});

// Create the proxy server
const server = http.createServer((req, res) => {
  // Instant health check — no Metro needed
  if (req.url === "/health-coder") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("ok");
    return;
  }

  // Proxy everything else to Metro
  const proxyReq = http.request(
    {
      hostname: "127.0.0.1",
      port: METRO_PORT,
      path: req.url,
      method: req.method,
      headers: req.headers,
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    }
  );

  proxyReq.on("error", () => {
    // Metro not ready yet — return 503
    res.writeHead(503, { "Content-Type": "text/plain" });
    res.end("Service starting up...");
  });

  req.pipe(proxyReq, { end: true });
});

// Also proxy WebSocket upgrades (HMR)
server.on("upgrade", (req, socket, head) => {
  const proxyReq = http.request({
    hostname: "127.0.0.1",
    port: METRO_PORT,
    path: req.url,
    method: req.method,
    headers: req.headers,
  });

  proxyReq.on("upgrade", (proxyRes, proxySocket, proxyHead) => {
    socket.write(
      `HTTP/1.1 101 Switching Protocols\r\n` +
        Object.entries(proxyRes.headers)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\r\n") +
        "\r\n\r\n"
    );
    if (proxyHead.length) socket.write(proxyHead);
    proxySocket.pipe(socket);
    socket.pipe(proxySocket);
  });

  proxyReq.on("error", () => {
    socket.destroy();
  });

  proxyReq.end();
});

server.listen(PUBLIC_PORT, "0.0.0.0", () => {
  console.log(`[health-proxy] Listening on port ${PUBLIC_PORT}, proxying to Metro on ${METRO_PORT}`);
});

// Forward signals to Expo
process.on("SIGTERM", () => expo.kill("SIGTERM"));
process.on("SIGINT", () => expo.kill("SIGINT"));
