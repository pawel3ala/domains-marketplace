import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <MaterialTopTabs>
        <MaterialTopTabs.Screen name="active" options={{ title: "Active" }} />
        <MaterialTopTabs.Screen
          name="upcoming"
          options={{ title: "Upcoming" }}
        />
        <MaterialTopTabs.Screen name="closed" options={{ title: "Closed" }} />
      </MaterialTopTabs>
    </SafeAreaView>
  );
}
