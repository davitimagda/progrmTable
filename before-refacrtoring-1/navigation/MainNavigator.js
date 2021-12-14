import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import FilterScreen from "../screens/FilterScreen";
import ProgramDisplayScreen from "../screens/ProgramDisplayScreen";

const MainStackNavigator = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <MainStackNavigator.Navigator>
      <MainStackNavigator.Screen name="Home" component={HomeScreen} />
      <MainStackNavigator.Screen name="Filter" component={FilterScreen} />
      <MainStackNavigator.Screen
        name="ProgramDisplay"
        component={ProgramDisplayScreen}
      />
    </MainStackNavigator.Navigator>
  );
};

export default MainNavigator;
