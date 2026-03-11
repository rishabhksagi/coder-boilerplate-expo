import { useEffect } from "react";
import { Stack } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { queryClient } from "@/lib/query-client";

import "../global.css";

export default function RootLayout() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.parent !== window) {
      try {
        window.parent.postMessage(
          {
            type: "SUPERAGI_CODER_APP_READY",
            payload: { mountTime: Date.now() },
            timestamp: Date.now(),
          },
          "*"
        );
      } catch (err) {
        console.warn("[Coder] Failed to notify parent:", err);
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="health-coder" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}
