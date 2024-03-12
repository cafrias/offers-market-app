// Polyfill to make AWS SDK work in React Native
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import { ReadableStream } from "web-streams-polyfill";
(globalThis as any).ReadableStream = ReadableStream;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, Stack } from "expo-router";
import { Suspense } from "react";
import { Text } from "react-native";

const queryClient = new QueryClient();

export default function HomeLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Text>Loading...</Text>}>
        <Stack
          screenOptions={{
            headerRight: () => {
              return <Link href="/sign-up">Sign up</Link>;
            },
          }}
        />
      </Suspense>
    </QueryClientProvider>
  );
}
