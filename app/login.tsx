import { router, Stack } from "expo-router";

import { Button, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function Login() {
  const { signIn } = useAuthContext();

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">Login</ThemedText>
        <Button
          title="Login"
          onPress={() => {
            signIn();
            router.replace("/otp");
          }}
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
