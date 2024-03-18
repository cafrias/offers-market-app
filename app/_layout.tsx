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
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient();

export default function HomeLayout() {
  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}

function HeaderRight() {
  const { tokens } = useAuth();
  if (tokens) {
    return <Link href="/logout">Logout</Link>;
  }

  return <Link href="/login">Login</Link>;
}
