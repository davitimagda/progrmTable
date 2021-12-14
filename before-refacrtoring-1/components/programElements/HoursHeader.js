import React from "react";
import { StyleSheet, View } from "react-native";
import { HOURS_ARRAY } from "../../data/dummy-data";
import Hour from "./Hour";
import Offset from "./Offset";

const HoursHeader = (props) => {
  let hours_section = [];
  for (const [hour, hour_value] of Object.entries(HOURS_ARRAY)) {
    hours_section.push(
      <Hour hour_value={hour_value.name} style={styles.hourStyle} />
    );
  }
  return (
    <View style={styles.hoursHeaderStyle}>
      <Offset offsetValue="" offsetStyle={props.offsetStyle} />
      {hours_section}
    </View>
  );
  // <View style={styles.horizontalHourLine}>

  // </View>;
};

export default HoursHeader;

const styles = StyleSheet.create({
  hoursHeaderStyle: {
    flexDirection: "row",
  },
  hourStyle: {
    fontSize: 9,
  },
});
