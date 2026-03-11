import { TextInput, type TextInputProps } from "react-native";
import { cn } from "@/lib/utils";

interface InputProps extends TextInputProps {
  className?: string;
}

export function Input({ className, ...props }: InputProps) {
  return (
    <TextInput
      className={cn(
        "border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900 bg-white",
        className
      )}
      placeholderTextColor="#9ca3af"
      {...props}
    />
  );
}
