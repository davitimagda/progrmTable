import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Hour from "./Hour";
import Offset from "./Offset";

const HorizontalLayout = ({ hours_arr, header2Name, offsetStyle }) => {
  const horizontal_hours = [];
  for (const [hour, hour_value] of Object.entries(hours_arr)) {
    horizontal_hours.push(<Hour hour_value={hour_value.value} />);
  }
  return (
    <View style={styles.horizontalHourLine}>
      <Offset offsetValue={header2Name} offsetStyle={offsetStyle} />
      {horizontal_hours}
    </View>
  );
};

export default HorizontalLayout;

const styles = StyleSheet.create({
  horizontalHourLine: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
});
