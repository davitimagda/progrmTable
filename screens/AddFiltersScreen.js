import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import { useFilters } from "../contexts/FiltersContext";
import { useTheme } from "../contexts/ThemeContext";
import ListSelect from "../components/Filters/ListSelect";

const AddFiltersScreen = (props) => {
  const { colors } = useTheme();

  const { filters } = useFilters();
  const filtersOrder = filters.filtersOrder;
  const filter1 = filtersOrder.filter1;
  const filter2 = filtersOrder.filter2;
  const detailType = filtersOrder.detailType;
  const [type, setType] = useState(null);
  console.log("SET Filter Screen ----");

  const styles = defaultStyles(colors);
  useEffect(() => {
    if (typeof props.route.params === "undefined") {
      setType((prev) => filter2);
    } else {
      if (props.route.params.type !== type) {
        setType((prev) => props.route.params.type);
      }
    }
  });

  useEffect(() => {
    props.navigation.setParams({ filter1: filter1 });
  }, []);

  const displayProgram = () => {
    props.navigation.navigate("Filter", {
      filtersOrder: filtersOrder,
    });
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={displayProgram}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  if (type !== null) {
    return (
      <ScrollView contentContainerStyle={styles.screenContainer}>
        <View style={styles.additionalFiltersWrapper} key={type}>
          <ListSelect listName={type} listText={props.listText} />
        </View>
      </ScrollView>
    );
  } else {
    return <Text> </Text>;
  }
};

export const screenOptions = (navData) => {
  const routeParams = navData.route.params ? navData.route.params : {};

  return {
    headerTitle: routeParams.filter1 ? "Πρόσθετα Φίλτρα" : "Πρόσθετα Φίλτρα",
    // headerRight: () => (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       title="Save"
    //       iconName={
    //         Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
    //       }
    //       // onPress={displayProgram}
    //     />
    //   </HeaderButtons>
    // ),
  };
};

const defaultStyles = (Colors) =>
  StyleSheet.create({
    screenContainer: {
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: Colors.accent,
      minHeight:"100%",

    },
    additionalFiltersWrapper: {
      backgroundColor: Colors.accent,
    },
  });
export default AddFiltersScreen;
