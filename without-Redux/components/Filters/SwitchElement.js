import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const SwitchElement = (props) => {
  return (
    <View style={styles.switchContainer}>
      {props.label && <Text>{props.label}</Text>}
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={props.value ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={props.onValueChange}
        value={props.value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 10,
    paddingHorizontal: 10,
  },
});

export default SwitchElement;
