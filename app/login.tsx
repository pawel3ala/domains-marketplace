import { router } from "expo-router";

import { StyleSheet, View, Text, Image } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuthContext } from "@/hooks/useAuthContext";
import TextInput from "@/components/TextInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CtaButton from "@/components/CtaButton";

interface FormInputs {
  email: string;
  password: string;
}

const schema = z.object({
  email: z.string().min(1) && z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const defaultValues = {
  email: "testa@email.com",
  password: "123456789",
};

export default function Login() {
  const { login, isLoading } = useAuthContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ email, password }: typeof defaultValues) => {
    const { data } = await login(email, password);
    if (!data?.otp_id) {
      return;
    }
    router.replace({
      pathname: "/otp",
      params: { otp_id: String(data?.otp_id) },
    });
  };

  return (
    <>
      <ThemedView style={styles.container}>
        <Image source={require("@/assets/images/logo.png")} />
        <ThemedText style={{ fontSize: 18, fontWeight: "bold" }}>
          Sign in to your account
        </ThemedText>
        <View style={{ justifyContent: "center", width: "100%" }}>
          <TextInput
            control={control}
            name="email"
            label="Email"
            isError={errors.email?.message != null}
            style={styles.textInput}
          />
          {errors.email?.message != null && <Text>{errors.email.message}</Text>}
        </View>
        <View style={{ justifyContent: "center", width: "100%" }}>
          <TextInput
            control={control}
            name="password"
            label="Password"
            secureTextEntry={true}
            isError={errors.password?.message != null}
            style={styles.textInput}
          />
        </View>
        <CtaButton
          title={"Login"}
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
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
    gap: 10,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  textInput: {
    marginBottom: 10,
  },
});
