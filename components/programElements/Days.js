import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Days = ({ days_arr, style }) => {
  const value = days_arr.days.join("\n");
  return (
    <View key={days_arr.filter2} style={{ ...styles.hourStyle, ...style }}>
      <Text>{value}</Text>
    </View>
  );
};

export default Days;

const styles = StyleSheet.create({
  hourStyle: {
    textAlignVertical: "center",
    textAlign: "center",
    minWidth: 38,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "#ccc",
    fontFamily: "open-sans",
  },
});
