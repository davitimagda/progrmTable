import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback, CheckBox } from "react-native";

const TmimataListItem = ({ index, item, dispatch }) => {
  return (
    <View
      key={index}
      style={
        item.choice == false
          ? styles.checkboxItem
          : { ...styles.checkboxItem, ...styles.card }
      }
    >
      <TouchableWithoutFeedback
        onPress={() => dispatch({ type: "toggle", index: index })}
      >
        <>
          <CheckBox
            value={item.choice}
            onValueChange={() => dispatch({ type: "toggle", index: index })}
            style={styles.checkbox}
          ></CheckBox>
          <Text
            style={styles.label}
            onPress={() => dispatch({ type: "toggle", index: index })}
          >
            {item.name}
          </Text>
        </>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default TmimataListItem;

const styles = StyleSheet.create({
  checkboxItem: {
    flexDirection: "row",
    width: "48%",
    marginBottom: 3,
    marginHorizontal: 3,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 4,
  },
  card: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
