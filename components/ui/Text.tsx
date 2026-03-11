import { Text as RNText, type TextProps as RNTextProps } from "react-native";
import { cn } from "@/lib/utils";

type TextVariant = "h1" | "h2" | "body" | "caption";

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<TextVariant, string> = {
  h1: "text-3xl font-bold text-gray-900",
  h2: "text-2xl font-semibold text-gray-900",
  body: "text-base text-gray-700",
  caption: "text-sm text-gray-500",
};

export function Text({ variant = "body", className, children, ...props }: TextProps) {
  return (
    <RNText className={cn(variantStyles[variant], className)} {...props}>
      {children}
    </RNText>
  );
}
