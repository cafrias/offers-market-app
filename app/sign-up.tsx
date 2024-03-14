import { useCallback, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Stack, router } from "expo-router";
import { signUp } from "@/api/auth";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(() => {
    // TODO: validate input
    setLoading(true);
    signUp({ email, password, name })
      .then(() => {
        router.push(`/verify/${encodeURIComponent(email)}`);
      })
      // TODO: handle auth errors
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [email, password, name]);

  // TODO: add correct input types
  return (
    <View>
      <Stack.Screen options={{ title: "Sign up" }} />
      {loading && <Text>Loading ...</Text>}
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" onChangeText={setPassword} />
      <TextInput placeholder="Fullname" onChangeText={setName} />
      <Pressable onPress={onSubmit} disabled={loading}>
        <Text>Sign up</Text>
      </Pressable>
    </View>
  );
}
