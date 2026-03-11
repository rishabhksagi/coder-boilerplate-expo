import { View, Text } from "react-native";

export default function HomeTab() {
  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <Text className="text-3xl font-bold text-gray-900 mb-4">
        Welcome Home
      </Text>
      <Text className="text-base text-gray-600 text-center">
        This is the home tab. Start building your app here.
      </Text>
    </View>
  );
}
