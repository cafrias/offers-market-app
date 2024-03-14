import { COGNITO_CLIENT_ID, COGNITO_REGION } from "@/constants/config";
import { AuthFlowType, CognitoIdentityProviderClient, ConfirmSignUpCommand, InitiateAuthCommand, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

export type Tokens = {
  idToken: string;
  accessToken: string;
  refreshToken: string;
};

type LoginInput = {
  email: string;
  password: string;
};


const client = new CognitoIdentityProviderClient({
  region: COGNITO_REGION,
});

export async function login({ email, password }: LoginInput): Promise<Tokens> {
  const command = new InitiateAuthCommand({
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
    ClientId: COGNITO_CLIENT_ID,
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


interface SignUpInput {
  email: string;
  password: string;
  name: string;
}

export async function signUp(input: SignUpInput): Promise<void> {
  const command = new SignUpCommand({
    ClientId: COGNITO_CLIENT_ID,
    Username: input.email,
    Password: input.password,
    UserAttributes: [
      { Name: "email", Value: input.email },
      { Name: "name", Value: input.name },
    ],
  });

  await client.send(command);
}

type VerifySignUpInput = {
  username: string;
  code: string;
};

export async function verifySignUp(input: VerifySignUpInput) {
  const command = new ConfirmSignUpCommand({
    ClientId: COGNITO_CLIENT_ID,
    Username: input.username,
    ConfirmationCode: input.code,
  });

  await client.send(command);
}
