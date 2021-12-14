import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import { GET_APP_LISTS, GET_DETAIL_TYPE } from "../js/AppSettings";
import MainButton from "../components/UI/MainButton";
import SwitchElement from "../components/Filters/SwitchElement";
import SwitchGroup from "../components/Filters/SwitchGroup";
import FilterElement from "../components/Filters/FilterElement";
import ListSelect from "../components/Filters/ListSelect";
import { useTheme } from "../contexts/ThemeContext";
import { useFilters } from "../contexts/FiltersContext";

const FilterScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { filters, onFiltersChange } = useFilters();
  const filtersOrder = filters.filtersOrder;
  const filter1 = filtersOrder.filter1;
  const [filter2, setFilter2] = useState(filtersOrder.filter2);
  const [detailType, setDetailType] = useState(filtersOrder.detailType);
  const [tmimaGroup, setTmimaGroup] = useState(filters.tmimaGroup);
  const [focused, setFocused] = useState(true);

  console.log("Filter Screen ----");
  const toggleTmimaGroup = () => {
    filters.tmimaGroup = !tmimaGroup;
    onFiltersChange(filters);
    setTmimaGroup((previousState) => !previousState);
  };
  const filter2Handler = (newValue) => {
    if (filter1 !== "tmima" && newValue !== "tmima") {
      filters.tmimaGroup = false;
      setTmimaGroup(false);
    }
    console.log(filters.tmimaGroup);
    onFiltersChange(filters);
    setFilter2(newValue);
  };

  useEffect(() => {
    setDetailType(() => GET_DETAIL_TYPE(filter1, filter2));
    filters.filtersOrder.filter2 = filter2;
    filters.filtersOrder.detailType = GET_DETAIL_TYPE(filter1, filter2);
    if (filter1 !== "tmima" && filter2 !== "tmima") {
      filters.tmimaGroup = false;
      setTmimaGroup(false);
    } else {
      filters.tmimaGroup = tmimaGroup;
    }

    onFiltersChange(filters);
    // setTmimaGroup(filters.tmimaGroup);
  }, [filter2]);

  const displayProgram = () => {
    props.navigation.navigate("ProgramDisplay");
  };
  const { colors } = useTheme();
  const styles = defaultStyles(colors);
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
  }, [displayProgram]);

  useFocusEffect(
    React.useCallback(() => {
      setFocused(true);
      return () => {
        setFocused(false);
      };
    }, [focused])
  );

  const listText = (listDetails, listData) => {
    const msg =
      listData.length > 0
        ? listData.map((listItem) => listItem.name).join(", ")
        : listDetails.allLabel;
    return msg;
  };

  if (isLoading) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator
          size="large"
          color="green"
          //visibility of Overlay Loading Spinner
          visible={isLoading}
          //Text with the Spinner
          textContent={"Loading..."}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.listContainer}>
          <ListSelect listName={filter1} />
        </View>
        {(filter1 == "tmima" || !["day", "tmima"].includes(detailType)) && (
          <View>
            <SwitchElement
              label="Ομαδοποίηση τμημάτων"
              onValueChange={() => toggleTmimaGroup()}
              value={tmimaGroup}
            />
          </View>
        )}
        <SwitchGroup
          style={styles.switchGroupStyle}
          filter1={filter1}
          filter2={filter2}
          // onValueChange={(value) => setFilter2(value)}
          onValueChange={(value) => filter2Handler(value)}
        />

        <View style={{ width1: "100%" }}>
          <View style={styles.additionalFiltersWrapper}>
            <MainButton
              style={styles.additionalFiltersButton}
              onPress={() => props.navigation.navigate("AddFilters")}
            >
              Πρόσθετα φίλτρα
            </MainButton>
          </View>
          {focused && (
            <View>
              <FilterElement listName={filter2} selectedText={listText} />
              <FilterElement listName={detailType} selectedText={listText} />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export const screenOptions = (navData) => {
  const routeParams = navData.route.params ? navData.route.params : {};
  const filter1Name = routeParams.filter1
    ? GET_APP_LISTS[routeParams.filter1].genitive
    : "";
  return {
    headerTitle: "Πρόγραμμα " + filter1Name,
    // headerLeft: () => (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       title="Menu"
    //       iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
    //       onPress={() => {
    //         navData.navigation.toggleDrawer();
    //       }}
    //     />
    //   </HeaderButtons>
    // ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Preview"
          iconName={
            Platform.OS === "android" ? "md-checkmark-circle" : "ios-checkmark"
          }
          onPress={() => {
            displayProgram();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const defaultStyles = (Colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: "space-around",
      backgroundColor: Colors.accent,
    },
    listContainer: {
      // elevation: 5,
      margin: 5,
      // backgroundColor: "white",
    },
    additionalFiltersWrapper: {
      flexDirection: "row",
      justifyContent: "center",
    },
    switchGroupStyle: {
      flexDirection: "row",
      justifyContent: "center",
    },
    spinnerContainer: {
      flex: 1,
      justifyContent: "center",
      textAlign: "center",
      paddingTop: 30,
      backgroundColor: "#ecf0f1",
      padding: 8,
    },
    spinnerTextStyle: {
      color: "#FFF",
    },
  });
export default FilterScreen;
