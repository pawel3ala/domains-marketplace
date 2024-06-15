import { Redirect, Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useIsOnboarded } from "@/hooks/useIsOnboarded";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session, isLoading } = useAuthContext();
  const { isOnboarded, isLoading: isLoadingIsOnboarded } = useIsOnboarded();

  if (isLoading || isLoadingIsOnboarded) {
    return null;
  }

  if (!isOnboarded) {
    return <Redirect href="/onboarding" />;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(top-tabs)"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "User",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
