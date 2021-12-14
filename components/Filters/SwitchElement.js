import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

const defaultColors = {
  trackColorTrue: "#81b0ff",
  trackColorFalse: "#767577",
  thumbColorFalse: "#f4f3f4",
  thumbColorTrue: "#f5dd4b",
  ios_backgroundColor: "#3e3e3e",
};
const SwitchElement = (props) => {
  const { colors } = useTheme();
  if (colors.trackColorTrue)
    defaultColors.trackColorTrue = colors.trackColorTrue;
  if (colors.trackColorFalse)
    defaultColors.trackColorFalse = colors.trackColorFalse;
  if (colors.thumbColorTrue)
    defaultColors.thumbColorTrue = colors.thumbColorTrue;
  if (colors.thumbColorFalse)
    defaultColors.thumbColorFalse = colors.thumbColorFalse;
  return (
    <View style={styles.switchContainer}>
      {props.label && (
        <Text style={[styles.labelTextStyle, { color: colors.textColor }]}>
          {props.label}
        </Text>
      )}
      <Switch
        style={styles.switch}
        trackColor={{
          false: defaultColors.trackColorFalse,
          true: defaultColors.trackColorTrue,
        }}
        thumbColor={
          props.value
            ? defaultColors.thumbColorTrue
            : defaultColors.thumbColorFalse
        }
        ios_backgroundColor={defaultColors.ios_backgroundColor}
        onValueChange={props.onValueChange}
        value={props.value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal: 0,
    // marginVertical: 0,
    paddingHorizontal: 15,
    paddingVertical: 0,
  },
  switch: {
    padding: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    margin: 0,
    marginHorizontal: 0,
    marginVertical: 0,
    fontSize: 10,
  },
  labelTextStyle: {
    fontFamily: "open-sans",
  },
});

export default SwitchElement;
