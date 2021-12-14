import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { useTheme } from "../../contexts/ThemeContext";

const MainButton = (props) => {
  const { colors } = useTheme();
  const styles = defaultStyles(colors);
  return (
    <View style={props.style}>
      <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
        <View style={[styles.button, props.buttonStyle]}>
          <Text style={[styles.buttonText, props.buttonTextStyle]}>
            {props.children}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const defaultStyles = (Colors) =>
  StyleSheet.create({
    button: {
      backgroundColor: Colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 25,
    },
    buttonText: {
      color: "white",
      fontFamily: "open-sans",
      fontSize: 15,
    },
  });

export default MainButton;
