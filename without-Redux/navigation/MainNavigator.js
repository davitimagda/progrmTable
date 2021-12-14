import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, SafeAreaView } from "react-native";

import Colors from "../constants/colors";

import HomeScreen, {
  screenOptions as homeScreenOptions,
} from "../screens/HomeScreen";
import FilterScreen, {
  screenOptions as filterScreenOptions,
} from "../screens/FilterScreen";
import SetFiltersScreen, {
  screenOptions as setFiltersScreenOptions,
} from "../screens/SetFiltersScreen";
import ProgramDisplayScreen from "../screens/ProgramDisplayScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  // headerTitleStyle: {
  //   fontFamily: "open-sans-bold",
  // },
  // headerBackTitleStyle: {
  //   fontFamily: "open-sans",
  // },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

console.log("homeScreenOptions");
console.log(homeScreenOptions());
console.log("filterScreenOptions");
console.log(filterScreenOptions);
console.log("setFiltersScreenOptions");
console.log(setFiltersScreenOptions);
const HomeStack = createNativeStackNavigator();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={defaultNavOptions}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={homeScreenOptions}
      />
      <HomeStack.Screen
        name="Filter"
        component={FilterScreen}
        options={filterScreenOptions}
      />
      <HomeStack.Screen
        name="SetFilters"
        component={SetFiltersScreen}
        options={setFiltersScreenOptions}
      />
      <HomeStack.Screen
        name="ProgramDisplay"
        component={ProgramDisplayScreen}
      />
    </HomeStack.Navigator>
  );
};

const SettingsStack = createNativeStackNavigator();

const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen
        name="SetFilter"
        component={SetFiltersScreen}
        options={setFiltersScreenOptions}
      />
    </SettingsStack.Navigator>
  );
};

{
  /* <SettingsStack.Screen name="Home" component={HomeStackScreen} /> */
}

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Settings" component={SettingsStackScreen} />
    </Tab.Navigator>
  );
};

// export default HomeStackScreen;
export default MainTabNavigator;
