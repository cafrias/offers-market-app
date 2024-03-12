import { Stack } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

const dummyEmail = "carlos.a.frias@gmail.com";
const dummyPassword = "Willkomen_1990!";
const dummyName = "Karl Karlssen";

// TODO add validation with Zod? and react-hook-form
export default function SignUpPage() {
  const [email, setEmail] = useState(dummyEmail);
  const [password, setPassword] = useState(dummyPassword);
  const [name, setName] = useState(dummyName);
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(() => {
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Name:", name);
  }, [email, password, name]);

  return (
    <View>
      <Stack.Screen options={{ title: "Sign up" }} />
      {loading && <Text>Loading ...</Text>}
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        defaultValue={dummyEmail}
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        defaultValue={dummyPassword}
      />
      <TextInput
        placeholder="Fullname"
        onChangeText={setName}
        defaultValue={dummyName}
      />
      <Pressable onPress={onSubmit} disabled={loading}>
        <Text>Sign up</Text>
      </Pressable>
    </View>
  );
}
