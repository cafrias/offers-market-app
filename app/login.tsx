import { Stack } from "expo-router";
import { View, Text } from "react-native";

export default function LoginPage() {
  return (
    <View>
      <Stack.Screen options={{ title: "Login" }} />
      <Text>Login</Text>
    </View>
  );
}
