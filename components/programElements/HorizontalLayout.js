import React from "react";
import { StyleSheet, View } from "react-native";
import Hour from "./Hour";

const HorizontalLayout = ({ hours_arr, style }) => {
  const horizontal_hours = [];
  for (const [hour, hour_value] of Object.entries(hours_arr)) {
    const value = hour_value.value.join("\n");
    horizontal_hours.push(
      <Hour key={hour} hour={{ hour: hour, value: value }} style={style} />
    );
  }
  return <View style={{ ...styles.horizontalLine }}>{horizontal_hours}</View>;
};

const styles = StyleSheet.create({
  horizontalLine: {
    flexDirection: "row",
    justifyContent: "center",
    // paddingHorizontal: 5,
  },
});
export default HorizontalLayout;
