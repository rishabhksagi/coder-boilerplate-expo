import { TouchableOpacity, Text } from "react-native";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 border-blue-600",
  secondary: "bg-gray-600 border-gray-600",
  outline: "bg-transparent border-gray-300",
};

const variantTextStyles: Record<ButtonVariant, string> = {
  primary: "text-white",
  secondary: "text-white",
  outline: "text-gray-900",
};

export function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  className,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={cn(
        "px-6 py-3 rounded-lg border items-center justify-center",
        variantStyles[variant],
        disabled && "opacity-50",
        className
      )}
      activeOpacity={0.7}
    >
      <Text
        className={cn(
          "text-base font-semibold",
          variantTextStyles[variant]
        )}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
