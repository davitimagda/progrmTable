import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  CheckBox,
} from "react-native";
import MainButton from "../UI/MainButton";
import Colors from "../../constants/colors";

const ListSelectItem = ({ index, item, dispatch }) => {
  return (
    <MainButton
      style={styles.buttonContainerStyle}
      onPress={() => dispatch({ type: "toggle", index: index })}
      buttonStyle={
        item.choice == false
          ? styles.buttonStyle
          : { ...styles.buttonStyle, ...styles.buttonSelectedStyle }
      }
      buttonTextStyle={styles.buttonTextStyle}
    >
      <View
        style={
          item.choice == false
            ? styles.checkboxItem
            : { ...styles.checkboxItem, ...styles.buttonTextStyle }
        }
      >
        {/* <TouchableWithoutFeedback
          onPress={() => dispatch({ type: "toggle", index: index })}
        > */}
        {/* <CheckBox
            value={item.choice}
            color="red"
            onValueChange={() => dispatch({ type: "toggle", index: index })}
            style={styles.checkbox}
          ></CheckBox> */}
        <Text
          style={styles.buttonTextStyle}
          onPress={() => dispatch({ type: "toggle", index: index })}
        >
          {item.name}
        </Text>
        {/* </TouchableWithoutFeedback> */}
      </View>
    </MainButton>
  );
};

export default ListSelectItem;

const styles = StyleSheet.create({
  buttonContainerStyle: {
    width: "30%",
    justifyContent: "center",
    // alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: Colors.filter2,
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderRadius: 20,
    justifyContent: "center",
    // alignItems: "center",
    // marginBottom: 3,
    // marginHorizontal: 1,
    marginVertical: 5,
    height: 35,
    // width: "30%",
    // backgroundColor: "rgba(200,200, 200, 0.5)",
  },

  buttonSelectedStyle: {
    backgroundColor: Colors.filter2Selected,
    marginVertical: 5,
  },
  buttonTextStyle: {
    color: "white",
    fontSize: 15,
    textAlign:"center",
    color: "#e9e9e9",
  
  },
  checkboxItem: {
    // flexDirection: "row",
  },
  checkbox: {
    alignSelf: "center",
  },
});
