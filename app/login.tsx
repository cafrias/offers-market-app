import { Link, Stack, router } from "expo-router";
import { useCallback, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

import { login } from "@/api/auth";
import { useAuth } from "@/contexts/auth-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { updateTokens } = useAuth();

  const onSubmit = useCallback(() => {
    // TODO: validate email and password

    setLoading(true);
    login({ email, password })
      .then((tokens) => {
        updateTokens(tokens);
        router.replace("/");
      })
      // TODO: handle auth errors
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [email, password]);

  // TODO: add correct input types
  return (
    <View>
      <Stack.Screen options={{ title: "Login" }} />
      {loading && <Text>Loading ...</Text>}
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" onChangeText={setPassword} />
      <Pressable onPress={onSubmit} disabled={loading}>
        <Text>Login</Text>
      </Pressable>
      <Link style={{ marginTop: 20 }} href="/sign-up">
        Sign Up
      </Link>
    </View>
  );
}
