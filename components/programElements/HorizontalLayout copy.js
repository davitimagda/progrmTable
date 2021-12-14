import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Hour from "./Hour";
import Offset from "./Offset";

const HorizontalLayout = ({
  hours_arr,
  header2Name,
  offsetStyle,
}) => {
  const horizontal_hours = [];
  for (const [hour, hour_value] of Object.entries(hours_arr)) {
    const value = hour_value.value.join("\n");
    horizontal_hours.push(
      <Hour
        key={hour}
        hour={{ hour: hour, value: value}}
      />
    );
  }
  return (
    <View style={styles.horizontalLine}>
      <Offset offsetValue={header2Name} offsetStyle={offsetStyle} />
      {horizontal_hours}
    </View>
  );
};

export default HorizontalLayout;

const styles = StyleSheet.create({
  horizontalLine: {
    flexDirection: "row",
    justifyContent: "center",
    // paddingHorizontal: 5,
  },
});
