import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "../UI/Card";
import { useTheme } from "../../contexts/ThemeContext";

const VerticalLayout = ({ hours_arr, header2Name }) => {
  const { colors } = useTheme();
  const styles = defaultStyles(colors);
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

const defaultStyles = (Colors) =>
  StyleSheet.create({
    veticalCard: {
      justifyContent: "space-around",
      marginVertical: 10,
      marginHorizontal: 5,
    },
    header2TitleStyle: {
      alignItems: "center",
      textAlignVertical: "center",
      textAlign: "center",
      backgroundColor: "rgb(9, 190, 208)" /*"#5f8589",*/,
      backgroundColor: Colors.filter2,
      marginVertical: 0.4,
      paddingHorizontal: 5,
      paddingVertical: 5,
      // borderBottomWidth: 0.5,
      // borderRightWidth: 0.5,
      borderRadius: 0,
      // borderColor: "#ccc",
    },
    header2TitleTextStyle: {
      color: Colors.textColor,
    },
    detailItemStyle: {
      flexDirection: "row",
      // paddingHorizontal: 1,
      borderRadius: 0,
      marginVertical: 0.5,
      paddingHorizontal: 5,
      paddingVertical: 5,
      backgroundColor: Colors.gridBackground,
    },
    detailItemNameStyle: {
      paddingLeft: 5,
    },
  });
