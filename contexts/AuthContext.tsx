import { useStorageState } from "@/hooks/useStorageState";
import { useLoginMutation } from "@/services/api";
import React from "react";

export const AuthContext = React.createContext<{
  login: (email: string, password: string) => Promise<any>;
  twoFactorAuthenticationLogin: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  login: () => Promise.resolve(null),
  twoFactorAuthenticationLogin: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function AuthContextProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  const [loginMutation, { error, isLoading: isLoadingMutation }] =
    useLoginMutation();

  return (
    <AuthContext.Provider
      value={{
        login: async (email, password) => {
          const data = await loginMutation({
            email,
            password,
          }).unwrap();
          return data;
        },
        twoFactorAuthenticationLogin: () => {
          setSession("xxx");
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading: isLoadingMutation || isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
