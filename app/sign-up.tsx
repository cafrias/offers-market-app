import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { Link, Stack } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { router } from "expo-router";

const dummyPassword = "Willkomen_1990!";
const dummyName = "Karl Karlssen";

// TODO add validation with Zod? and react-hook-form
export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(dummyPassword);
  const [name, setName] = useState(dummyName);
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(() => {
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Name:", name);

    setLoading(true);
    dummySignUp({ email, password, name })
      .then(() => {
        console.log("Signed up");
        router.push(`/verify/${encodeURIComponent(email)}`);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [email, password, name]);

  return (
    <View>
      <Stack.Screen options={{ title: "Sign up" }} />
      {loading && <Text>Loading ...</Text>}
      <TextInput placeholder="Email" onChangeText={setEmail} />
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
      <Link style={{ marginTop: 20 }} href="/verify-email">
        Go to verification
      </Link>
    </View>
  );
}

interface SignUpInput {
  email: string;
  password: string;
  name: string;
}

const defaultRegion = "us-east-1";
const clientId = "4cbm3h5ptvv9sh8s8t9p87qstl";

async function dummySignUp(input: SignUpInput): Promise<void> {
  console.log("Signing up with", input);
  return Promise.resolve();
}

async function signUp(input: SignUpInput): Promise<void> {
  const client = new CognitoIdentityProviderClient({
    region: defaultRegion,
  });

  const command = new SignUpCommand({
    ClientId: clientId,
    Username: input.email,
    Password: input.password,
    UserAttributes: [
      { Name: "email", Value: input.email },
      { Name: "name", Value: input.name },
    ],
  });

  const res = await client.send(command);
  console.log(res);
}
