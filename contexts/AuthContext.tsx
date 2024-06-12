import { useStorageState } from "@/hooks/useStorageState";
import {
  useLoginMutation,
  useTwoFactorAuthenticationLoginMutation,
} from "@/services/api";
import React from "react";
import { Alert } from "react-native";

export const AuthContext = React.createContext<{
  login: (email: string, password: string) => Promise<any>;
  login2fa: (otp_id: string, otp: number) => Promise<any>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  login: () => Promise.resolve(null),
  login2fa: () => Promise.resolve(null),
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function AuthContextProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  const [loginMutation, { isLoading: isLoadingLoginMutation }] =
    useLoginMutation();
  const [login2faMutation, { isLoading: isLoading2faLoginMutation }] =
    useTwoFactorAuthenticationLoginMutation();

  return (
    <AuthContext.Provider
      value={{
        login: async (email, password) => {
          try {
            const data = await loginMutation({
              email,
              password,
            }).unwrap();
            return data;
          } catch (error) {
            Alert.alert("Error", error?.data?.message, [{ text: "OK" }]);
          }
        },
        login2fa: async (otp_id, otp) => {
          try {
            const { data } = await login2faMutation({
              otp_id,
              otp,
            }).unwrap();
            setSession(data?.token);
            return data;
          } catch (error) {
            Alert.alert("Error", error?.data?.message, [{ text: "OK" }]);
          }
        },
        signOut: () => {
          setSession(null);
        },
        session: session,
        isLoading:
          isLoadingLoginMutation || isLoading2faLoginMutation || isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
