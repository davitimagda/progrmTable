import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { GET_DEFAULT_ORDER, GET_APP_LISTS } from "../js/AppSettings";
import MainButton from "../components/UI/MainButton";
import { useTheme } from "../contexts/ThemeContext";
import { useFilters } from "../contexts/FiltersContext";

const HomeButton = ({ filter, backgroundColor, styles, onPress }) => {
  return (
    <MainButton
      buttonStyle={[styles.buttonWrapperStyle, backgroundColor]}
      buttonTextStyle={styles.buttonTextStyle}
      onPress={onPress}
    >
      <Text>Πρόγραμμα {GET_APP_LISTS[filter].genitive}</Text>
    </MainButton>
  );
};
const HomeScreen = (props) => {
  const { filters, onFiltersChange } = useFilters();
  const { colors } = useTheme();
  const styles = defaultStyles(colors);
  const onPressHandler = (filter1) => {
    onFiltersChange(() => {
      filters.filtersOrder = GET_DEFAULT_ORDER(filter1);
      return filters;
    });
    props.navigation.navigate("Filter", { filter1: filter1 });
  };
  return (
    <View style={styles.screen}>
      <View>
        <ScrollView contentContainerStyle={styles.scrollStyle}>
          <View style={styles.buttonContainerStyle}>
            <HomeButton
              styles={styles}
              backgroundColor={{ backgroundColor: colors.filter1 }}
              filter="day"
              onPress={onPressHandler.bind(this, "day")}
            />
            <HomeButton
              styles={styles}
              backgroundColor={{ backgroundColor: colors.filter2 }}
              filter="tmima"
              onPress={onPressHandler.bind(this, "tmima")}
            />
            <HomeButton
              styles={styles}
              backgroundColor={{ backgroundColor: colors.filter3 }}
              filter="teacher"
              onPress={onPressHandler.bind(this, "teacher")}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export const screenOptions = () => {
  return {
    headerTitle: "Πρόγραμμα ",
  };
};
const defaultStyles = (Colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: Colors.accent,
      justifyContent: "center",
    },
    scrollStyle: {
      // backgroundColor: Colors.filter1,
    },
    buttonContainerStyle: {
      alignItems: "center",
      width: "100%",
    },
    buttonWrapperStyle: {
      marginVertical: 30,
      marginHorizontal: 20,
      paddingVertical: 40,
      minWidth: 250,
      maxWidth: 300,
    },
    buttonTextStyle: {
      fontSize: 20,
      textAlign: "center",
    },
  });
export default HomeScreen;
