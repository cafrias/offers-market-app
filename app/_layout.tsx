import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { Suspense } from "react";
import { Text } from "react-native";

const queryClient = new QueryClient();

export default function HomeLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Text>Loading...</Text>}>
        <Stack />
      </Suspense>
    </QueryClientProvider>
  );
}
