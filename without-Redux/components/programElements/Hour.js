import React from "react";
import { StyleSheet, Text } from "react-native";

const Hour = (props) => {
  return (
    <Text key={props.hour.hour} style={[styles.hourStyle, props.style]}>
      {props.hour.value}
    </Text>
  );
};

export default Hour;

const styles = StyleSheet.create({
  hourStyle: {
    textAlignVertical: "center",
    textAlign: "center",
    marginVertical: 0.4,
    width: 38,
    paddingHorizontal: 1,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "#ccc",
  },
});
