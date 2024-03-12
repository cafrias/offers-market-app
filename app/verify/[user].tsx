import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { Pressable, TextInput, View, Text } from "react-native";

type VerifyEmailParams = {
  user: string;
};

export default function VerifyEmailPage() {
  const { user } = useLocalSearchParams<VerifyEmailParams>();
  const parsedUser = useMemo(() => {
    if (!user) {
      throw new Error("Invalid user");
    }
    return decodeURIComponent(user);
  }, [user]);

  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);

  const onVerify = useCallback(() => {
    setLoading(true);
    dummyVerifySignUp({ username: parsedUser, code: verificationCode })
      .then(() => {
        router.push("/login");
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [verificationCode]);

  return (
    <View>
      <Stack.Screen options={{ title: "Verify Email" }} />
      <Text>{parsedUser}</Text>
      <TextInput
        placeholder="Verification Code"
        onChangeText={setVerificationCode}
      />
      <Pressable onPress={onVerify} disabled={loading}>
        <Text>Verify</Text>
      </Pressable>
    </View>
  );
}

type VerifySignUpInput = {
  username: string;
  code: string;
};

const defaultRegion = "us-east-1";
const clientId = "4cbm3h5ptvv9sh8s8t9p87qstl";

async function dummyVerifySignUp(input: VerifySignUpInput) {
  console.log("Verifying with", input);
  return Promise.resolve();
}

async function verifySignUp(input: VerifySignUpInput) {
  // TODO: must reuse client from sign-up.tsx
  const client = new CognitoIdentityProviderClient({
    region: defaultRegion,
  });

  const command = new ConfirmSignUpCommand({
    ClientId: clientId,
    Username: input.username,
    ConfirmationCode: input.code,
  });

  const res = await client.send(command);
  console.log(res);
}
