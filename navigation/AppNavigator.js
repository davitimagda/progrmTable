import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./MainNavigator";
import { ThemeProvider } from "../contexts/ThemeContext";
import { FiltersProvider } from "../contexts/FiltersContext";

const AppNavigator = () => {
  return (
      <ThemeProvider>
        <FiltersProvider>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </FiltersProvider>
      </ThemeProvider>
  );
};

export default AppNavigator;
