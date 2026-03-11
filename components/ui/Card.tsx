import { View } from "react-native";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <View
      className={cn(
        "bg-white rounded-xl p-4 shadow-sm border border-gray-100",
        className
      )}
    >
      {children}
    </View>
  );
}
