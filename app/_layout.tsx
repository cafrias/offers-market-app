import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { Suspense } from "react";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient();

export default function HomeLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Text>Loading...</Text>}>
          <Slot />
        </Suspense>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
