import React, { useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { GET_DEFAULT_ORDER } from "../js/AppSettings.js/AppSettings";
import MainButton from "../components/UI/MainButton";
import Color from "../constants/colors";

const HomeScreen = (props) => {
  const [filter1, setFilter1] = useState("");

  const onPressHandler = (filter1) => {
    const listFilters = {
      selectedData: [{ day: [] }, { tmima: [] }, { teacher: [] }],
      filtersOrder: GET_DEFAULT_ORDER(filter1),
    };
    props.navigation.setParams({ listFilters: listFilters });
    props.navigation.navigate("Filter", listFilters);
  };
  return (
    <View style={styles.screen}>
      <View style={styles.buttonContainer}>
        <MainButton
          style={styles.button}
          buttonStyle={[
            styles.buttonContainerStyle,
            { backgroundColor: Color.filter1 },
          ]}
          buttonTextStyle={styles.buttonTextStyle}
          onPress={() => {
            onPressHandler("day");
            // props.navigation.navigate("Filter", {
            //   // Set default value for filter2 as it comes from Home screen
            //   filtersOrder: {
            //     filter1: "day",
            //     filter2: "teacher",
            //     detailType: "tmima",
            //   },
            // });
          }}
        >
          <Text>Πρόγραμμα Ημέρας</Text>
        </MainButton>
      </View>
      <View style={styles.buttonContainer}>
        <MainButton
          style={styles.button}
          buttonStyle={[
            styles.buttonContainerStyle,
            { backgroundColor: Color.filter2 },
          ]}
          buttonTextStyle={styles.buttonTextStyle}
          onPress={() => {
            onPressHandler("tmima");
            // props.navigation.navigate("Filter", {
            //   filtersOrder: {
            //     filter1: "tmima",
            //     filter2: "day",
            //     detailType: "teacher",
            //   },
            // });
          }}
        >
          <Text>Πρόγραμμα Τμήματος</Text>
        </MainButton>
      </View>
      <View style={styles.buttonContainer}>
        <MainButton
          style={styles.button}
          buttonStyle={[
            styles.buttonContainerStyle,
            { backgroundColor: Color.filter3 },
          ]}
          buttonTextStyle={styles.buttonTextStyle}
          onPress={() => {
            onPressHandler("teacher");
            // props.navigation.navigate("Filter", {
            //   filtersOrder: GET_DEFAULT_ORDER("teacher"),
            // });
          }}
        >
          <Text>Πρόγραμμα Καθηγητή</Text>
        </MainButton>
      </View>
    </View>
  );
};
export const screenOptions = (navData) => {
  return {
    headerTitle: "Πρόγραμμα ",
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainerStyle: {
    marginVertical: 30,
    marginHorizontal: 20,
    paddingVertical: 40,
  },
  buttonTextStyle: {
    fontSize: 20,
    textAlign: "center",
  },
});
export default HomeScreen;
