import React from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTheme, themes } from "../contexts/ThemeContext";

const SettingsScreen = (props) => {
  const { colors, name, onThemeChange } = useTheme();
  const themes_arr = [];
  for (const [themeName, themeValue] of Object.entries(themes)) {
    themes_arr.push(
      <TouchableOpacity
        key={themeName}
        style={styles.themeContainer}
        onPress={onThemeChange.bind(this, {
          colors: themeValue,
          name: themeName,
        })}
      >
        <Text>{themeName}</Text>
        <View style={styles.colorsContainer}>
          <Text
            key="primary"
            style={[styles.colorText, { backgroundColor: themeValue.primary }]}
          >
            {themeValue.primary}
          </Text>

          <Text
            key="accent"
            style={[styles.colorText, { backgroundColor: themeValue.accent }]}
          >
            {themeValue.accent}
          </Text>
          <Text
            key="filter1"
            style={[styles.colorText, { backgroundColor: themeValue.filter1 }]}
          >
            {themeValue.filter1}
          </Text>
          <Text
            key="filter2"
            style={[styles.colorText, { backgroundColor: themeValue.filter2 }]}
          >
            {themeValue.filter2}
          </Text>
          <Text
            key="filter3"
            style={[styles.colorText, { backgroundColor: themeValue.filter3 }]}
          >
            {themeValue.filter3}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <Button
        onPress={onThemeChange.bind(this, { colors: colors, name: name })}
        title={name}
        color={colors.filter1}
      />
      <View>{themes_arr}</View>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Settings ",
  };
};

const styles = StyleSheet.create({
  screenContainer: {
    paddingBottom: 20,
    marginBottom: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  themeContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    backgroundColor: "white",
    marginVertical: 5,
  },
  colorsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    // width: "100%",
  },
  colorText: {
    width: 50,
    height: 50,
  },
});
export default SettingsScreen;
