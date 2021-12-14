import React from "react";
import { View, Button, StyleSheet } from "react-native";

const HomeScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="Ημέρα/Ώρα"
          onPress={() => {
            props.navigation.navigate("Filter", {
              filterType: "day",
            });
          }}
        ></Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="Τμήμα"
          onPress={() => {
            props.navigation.navigate("Filter", {
              filterType: "tmima",
            });
          }}
        ></Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="Καθηγητή"
          color="red"
          onPress={() => {
            props.navigation.navigate("Filter", {
              filterType: "teacher",
            });
          }}
        ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    fontSize: 20,
    padding: 10,
  },
  button: {
    fontSize: 20,
  },
});
export default HomeScreen;
