import { useAuth } from "@/contexts/auth-context";
import {
  AuthFlowType,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { Link, Stack, router } from "expo-router";
import { useCallback, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

const dummyPassword = "Willkomen_1990!";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(dummyPassword);
  const [loading, setLoading] = useState(false);

  const { updateTokens } = useAuth();

  const onSubmit = useCallback(() => {
    console.log("Email:", email);
    console.log("Password:", password);

    setLoading(true);
    login({ email, password })
      .then((tokens) => {
        updateTokens(tokens);
        router.replace("/");
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [email, password]);

  return (
    <View>
      <Stack.Screen options={{ title: "Login" }} />
      {loading && <Text>Loading ...</Text>}
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        defaultValue={dummyPassword}
      />
      <Pressable onPress={onSubmit} disabled={loading}>
        <Text>Login</Text>
      </Pressable>
      <Link style={{ marginTop: 20 }} href="/sign-up">
        Sign Up
      </Link>
    </View>
  );
}

type LoginInput = {
  email: string;
  password: string;
};

function dummyLogin({ email, password }: LoginInput) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

const defaultRegion = "us-east-1";
const clientId = "4cbm3h5ptvv9sh8s8t9p87qstl";

type LoginResult = {
  idToken: string;
  accessToken: string;
  refreshToken: string;
};

async function login({ email, password }: LoginInput) {
  const client = new CognitoIdentityProviderClient({
    region: defaultRegion,
  });

  const command = new InitiateAuthCommand({
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
    ClientId: clientId,
  });

  const { AuthenticationResult } = await client.send(command);
  if (!AuthenticationResult) {
    throw new Error(
      "Application Error: No AuthenticationResult found in response.",
    );
  }

  const { IdToken, AccessToken, RefreshToken } = AuthenticationResult;
  if (!IdToken) {
    throw new Error("Application Error: No IdToken found in response.");
  }
  if (!AccessToken) {
    throw new Error("Application Error: No AccessToken found in response.");
  }
  if (!RefreshToken) {
    throw new Error("Application Error: No RefreshToken found in response.");
  }

  return {
    idToken: IdToken,
    accessToken: AccessToken,
    refreshToken: RefreshToken,
  };
}
