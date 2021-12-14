import React from "react";
import { StyleSheet, View } from "react-native";
import { HOURS_ARRAY } from "../../data/dummy-data";
import Hour from "./Hour";

const HoursHeader = (props) => {
  let hours_section = [];
  for (const [hour, hour_value] of Object.entries(HOURS_ARRAY)) {
    hours_section.push(
      <Hour
        key={hour}
        hour={{ hour: hour, value: hour_value.name }}
        style={{ ...styles.hourStyle, ...props.style }}
      />
    );
  }
  return <View style={styles.hoursHeaderStyle}>{hours_section}</View>;
};

export default HoursHeader;

const styles = StyleSheet.create({
  hoursHeaderStyle: {
    flexDirection: "row",
    height: 22,
  },
  hourStyle: {
    fontSize: 9,
  },
});
