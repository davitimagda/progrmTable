import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "../UI/Card";

const VerticalLayout = ({ hours_arr, header2Name }) => {
  const lines = [];
  for (const [hour, hour_value] of Object.entries(hours_arr)) {
    lines.push(
      <Card key={hour} style={styles.detailItemStyle}>
        <Text>{hour_value.name}</Text>
        <Text style={styles.detailItemNameStyle}>
          {hour_value.value.join("\n")}
        </Text>
      </Card>
    );
  }
  return (
      <View key={header2Name} style={styles.veticalCard}>
        <Card key={header2Name} style={styles.header2TitleStyle}>
          <Text style={styles.header2TitleTextStyle}>{header2Name}</Text>
        </Card>
        {lines}
      </View>
  );
};

export default VerticalLayout;

const styles = StyleSheet.create({
  veticalCard: {
    justifyContent: "space-around",
    marginVertical: 5,
    marginHorizontal: 5,
  },
  header2TitleStyle: {
    alignItems:"center",
    textAlignVertical: "center",
    textAlign: "center",
    backgroundColor: "rgb(9, 190, 208)" /*"#5f8589",*/,
    marginVertical: 0.4,
    paddingHorizontal: 1,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    borderRadius: 4,
    borderColor: "#ccc",
  },
  header2TitleTextStyle: {
    color: "white",
  },
  detailItemStyle: {
    flexDirection: "row",
    paddingHorizontal: 1,
    borderRadius: 4,
    marginVertical: 0.5,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  detailItemNameStyle: {
    paddingLeft: 5,
  },
});
