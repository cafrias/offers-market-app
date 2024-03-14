import { verifySignUp } from "@/api/auth";
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
    verifySignUp({ username: parsedUser, code: verificationCode })
      .then(() => {
        router.push("/login");
      })
      // TODO: handle auth errors
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [verificationCode]);

  // TODO: add correct input types
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
