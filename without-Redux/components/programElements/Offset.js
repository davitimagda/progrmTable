import React from "react";
import { StyleSheet, Text } from "react-native";

const Offset = (props) => {
  return (
    <Text numberOfLines={1} style={[styles.offsetStyle, props.offsetStyle]}>
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
    marginVertical: 0.4,
    
  },
});
