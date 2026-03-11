import { View, Text } from "react-native";

export default function ExploreTab() {
  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <Text className="text-3xl font-bold text-gray-900 mb-4">Explore</Text>
      <Text className="text-base text-gray-600 text-center">
        Discover new content and features here.
      </Text>
    </View>
  );
}
