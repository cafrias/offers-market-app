const cognitoRegion = process.env.EXPO_PUBLIC_COGNITO_REGION;
if (!cognitoRegion) {
  throw new Error("EXPO_PUBLIC_COGNITO_REGION is missing");
}

const cognitoClientId = process.env.EXPO_PUBLIC_COGNITO_CLIENT_ID;
if (!cognitoClientId) {
  throw new Error("EXPO_PUBLIC_COGNITO_CLIENT_ID is missing");
}

export const API_URL = process.env.EXPO_PUBLIC_API_URL;
export const COGNITO_REGION = cognitoRegion;
export const COGNITO_CLIENT_ID = cognitoClientId;

