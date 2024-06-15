import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  withDelay,
  FadeInDown,
} from "react-native-reanimated";

import { useIsOnboarded } from "@/hooks/useIsOnboarded";
import { router } from "expo-router";

const getOnboardingHeadings = () => {
  return [
    {
      text: "Welcome to\nDomains Marketplace",
      isTitle: true,
      isButton: false,
    },
    {
      text: "Discover domains for sale in our\n Auctions and Buy Now listings",
      isSubtitle: true,
      isButton: false,
    },
    {
      isButton: true,
      text: "Continue",
    },
  ];
};

const ANIMATION_CONFIG = {
  fadeInDownDuration: 1000,
  fadeInDownDelay: 1000,
  expandingLogoDuration: 1000,
  opacityDuration: 1000,
  logoLiftUpDuration: 1000,
  logoSizeMultiplier: 1.3,
};

const Onboarding = () => {
  const { setIsOnboarded } = useIsOnboarded();
  const headings = useMemo(getOnboardingHeadings, []);
  const [shouldRenderHeadeings, setShouldRenderHeadings] = useState(false);

  const opacity = useSharedValue(0);
  const sizeMultiplier = useSharedValue(1);
  const marginTopOffset = useSharedValue(0);

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        {
          scale: sizeMultiplier.value,
        },
        {
          translateY: marginTopOffset.value,
        },
      ],
      position: "absolute",
    };
  });

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: ANIMATION_CONFIG.opacityDuration,
    });
    sizeMultiplier.value = withRepeat(
      withTiming(ANIMATION_CONFIG.logoSizeMultiplier, {
        duration: ANIMATION_CONFIG.expandingLogoDuration,
      }),
      2,
      true
    );
    marginTopOffset.value = withDelay(
      2000,
      withTiming(-100, { duration: ANIMATION_CONFIG.logoLiftUpDuration })
    );
    setTimeout(
      () => setShouldRenderHeadings(true),
      2 * ANIMATION_CONFIG.expandingLogoDuration +
        ANIMATION_CONFIG.logoLiftUpDuration
    );
  }, []);

  const onPress = () => {
    setIsOnboarded();
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("@/assets/images/logo.png")}
        style={logoStyle}
      />
      <View style={{ marginTop: 70, gap: 20 }}>
        {shouldRenderHeadeings &&
          headings.map((heading, index) => {
            return (
              <Animated.View
                entering={FadeInDown.duration(
                  ANIMATION_CONFIG.fadeInDownDuration
                ).delay(index * ANIMATION_CONFIG.fadeInDownDelay)}
                key={heading.text}
              >
                {heading.isTitle && (
                  <Text style={styles.title}>{heading.text}</Text>
                )}
                {heading.isSubtitle && (
                  <Text style={styles.subTitle}>{heading.text}</Text>
                )}
                {heading.isButton && (
                  <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>{heading.text}</Text>
                  </TouchableOpacity>
                )}
              </Animated.View>
            );
          })}
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "lime",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 14,
    textAlign: "center",
  },
  buttonText: {
    color: "lime",
  },
});
