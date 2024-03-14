// Polyfill to make AWS SDK work in React Native
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import { ReadableStream } from "web-streams-polyfill";
(globalThis as any).ReadableStream = ReadableStream;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, Stack } from "expo-router";
import { Suspense } from "react";
import { Text } from "react-native";
import { AuthProvider, useAuth } from "@/contexts/auth-context";

const queryClient = new QueryClient();

export default function HomeLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Text>Loading...</Text>}>
        <AuthProvider>
          <Stack
            screenOptions={{
              headerRight: HeaderRight,
            }}
          />
        </AuthProvider>
      </Suspense>
    </QueryClientProvider>
  );
}

function HeaderRight() {
  const { tokens } = useAuth();
  if (tokens) {
    return <Link href="/logout">Logout</Link>;
  }

  return <Link href="/login">Login</Link>;
}
