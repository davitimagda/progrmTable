import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MainButton from "../UI/MainButton";
import { useTheme } from "../../contexts/ThemeContext";
import IonIcon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

const ListSelectItem = ({ index, item, dispatch, listName }) => {
  const { colors } = useTheme();
  const styles = defaultStyles(colors, listName);
  let icon;
  let button;
  if (item.choice == true) {
    icon = <IonIcon name="ios-checkmark-done" color="white" size={12} />;
    button = (
      <LinearGradient
        // Button Linear Gradient
        colors={[colors.filter2Selected, colors.accent]}
        style={
          item.choice == false
            ? styles.buttonStyle
            : { ...styles.buttonStyle, ...styles.buttonSelectedStyle }
        }
      >
        <Text
          style={styles.buttonTextStyle}
          onPress={() => dispatch({ type: "toggle", index: index })}
        >
          {item.name} {icon}
        </Text>
        {/* </MainButton> */}

        {/* <Text style={styles.buttonTextStyle}>{item.name} {icon}</Text> */}
      </LinearGradient>
    );
  } else {
    button = (
      <MainButton
        style={styles.buttonContainerStyle1}
        onPress={() => dispatch({ type: "toggle", index: index })}
        buttonStyle={
          item.choice == false
            ? styles.buttonStyle
            : { ...styles.buttonStyle, ...styles.buttonSelectedStyle }
        }
        buttonTextStyle={styles.buttonTextStyle}
      >
        <Text
          style={styles.buttonTextStyle}
          onPress={() => dispatch({ type: "toggle", index: index })}
        >
          {item.name} {icon}
        </Text>
      </MainButton>
    );
  }
  return <View style={styles.buttonContainerStyle}>{button}</View>;
};

export default ListSelectItem;

const defaultStyles = (colors, listName) => {
  let height = 34;
  let width = "35%";
  if (listName == "day") {
    height = 45;
    width = "55%";
  }
  if (listName == "tmima") {
    width = "30%";
  }
  if (listName == "teacher") {
    width = "45%";
  }
  return StyleSheet.create({
    buttonContainerStyle: {
      justifyContent: "center",
      maxWidth: 200,
      width: width,
      borderRadius: 14,
      shadowColor: "white",
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 5,
      backgroundColor: colors.filter2,
      paddingHorizontal: 0,
      paddingVertical: 0,
      margin: 5,
      flexWrap: "nowrap",
    },
    buttonStyle: {
      paddingVertical: 0,
      paddingHorizontal: 10,
      borderRadius: 14,
      justifyContent: "center",
      height: height,
      backgroundColor: "transparent",
      backgroundColor: "rgba(05,05, 05, 0.10)",
      flexGrow: 1,
      flexWrap: "nowrap",
    },

    buttonSelectedStyle: {
      backgroundColor: colors.filter2Selected,
      // shadowColor: "white",
      // shadowOpacity: 0.26,
      // shadowOffset: { width: 0, height: 2 },
      // shadowRadius: 8,
      // elevation: 9,
    },
    buttonTextStyle: {
      color: "white",
      fontSize: 15,
      textAlign: "center",
      color: "#e9e9e9",
      color: colors.textColor,
      borderRadius: 8,
      fontFamily: "open-sans",
      backgroundColor: "transparent",
    },
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5,
    },
    button: {
      padding: 15,
      alignItems: "center",
      borderRadius: 5,
    },
  });
};
