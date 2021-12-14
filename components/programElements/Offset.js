import React from "react";
import { StyleSheet, Text } from "react-native";

const Offset = (props) => {
  let offsetStyle = {};
  if (props.filter2 == "day") {
    offsetStyle = { fontSize: 12, width: 75 };
  }
  if (props.filter2 == "tmima") {
    offsetStyle = { fontSize: 12, width: 40 };
  }
  if (props.filter2 == "teacher") {
    offsetStyle = { fontSize: 12, width: 75 };
  }
  return (
    <Text
      numberOfLines={1}
      style={[styles.offsetStyle, offsetStyle, props.style]}
    >
      {props.offsetValue}
    </Text>
  );
};

export default Offset;

const styles = StyleSheet.create({
  offsetStyle: {
    textAlignVertical: "center",
    textAlign: "center",
    paddingHorizontal: 1,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "#ccc",
    paddingVertical: 5,
    fontFamily: "open-sans",
  },
});
