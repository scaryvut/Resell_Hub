import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://resell-hub-nine.vercel.app",
});

export const {
  signIn,
  signUp,
  useSession,
  signOut,
} = authClient;