import { createContext, useContext, useState } from "react";

interface Tokens {
	idToken: string;
	accessToken: string;
	refreshToken: string;
}

interface AuthState {
	tokens?: Tokens;
	updateTokens: (tokens: Tokens | undefined) => void;
}

export const AuthContext = createContext<AuthState | undefined>(undefined);

export function useAuth(): AuthState {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [authState, setAuthState] = useState<AuthState>({
		updateTokens: (tokens) => {
			setAuthState((prev) => ({ ...prev, tokens }));
		},
	});

	return (
		<AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
	);
}
