import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Image } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CtaButton from "@/components/CtaButton";
import { useRef, useState } from "react";
import OTPTextInput from "react-native-otp-textinput";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function Otp() {
  const { login2fa, isLoading } = useAuthContext();
  let otpInput = useRef<OTPTextInput>(null);
  const { otp_id } = useLocalSearchParams<{ otp_id: string }>();
  const [otp, setOtp] = useState<string>("");

  const onPress = async () => {
    if (!otp_id) {
      return;
    }
    const result = await login2fa(otp_id, Number(otp));
    if (!result) {
      otpInput.current.clear();
      return;
    }
    router.replace("/");
  };

  return (
    <>
      <ThemedView style={styles.container}>
        <Image source={require("@/assets/images/logo.png")} />
        <ThemedText style={{ fontSize: 18, fontWeight: "bold" }}>
          Verify your account
        </ThemedText>
        <ThemedText style={{ fontSize: 14, fontWeight: "500" }}>
          An OTP has been sent to your phone number +96650******** to verify
          your login:
        </ThemedText>
        <OTPTextInput ref={otpInput} handleTextChange={setOtp} />
        <CtaButton title={"Verify"} onPress={onPress} isLoading={isLoading} />
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
    gap: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
