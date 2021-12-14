import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import { GET_DETAIL_TYPE } from "../js/AppSettings.js/AppSettings";
import Card from "../components/UI/Card";
import FilterGroup from "../components/Filters/FilterGroup";
import Colors from "../constants/colors";

const SetFiltersScreen = (props) => {
  const [tmimaGroup, setTmimaGroup] = useState(true);
  const [selectedData, setSelectedData] = useState({
    day: [],
    tmima: [],
    teacher: [],
  });

  const updateSelectedData = (listName, data) => {
    setSelectedData((prevState) => ({
      ...prevState,
      [listName]: data(),
    }));
  };

  console.log("SET Filter Screen ----");
  // console.log(props);

  const listFilters = props.route.params.listFilters;
  const filtersOrder = listFilters.filtersOrder;
  const filter2 = filtersOrder.filter2;
  const detailType = filtersOrder.detailType;

  useEffect(() => {
    setSelectedData(props.route.params.listFilters.lists);
  }, []);

  const saveFilters = useCallback(() => {
    const listFilters = {
      lists: selectedData,
      filtersOrder: filtersOrder,
    };
    return listFilters;
    // dispatch(setFilters(appliedFilters));
  }, [selectedData]);

  useEffect(() => {
    console.log("useEffect");
    props.navigation.setParams({ listFilters: saveFilters() });
  }, [saveFilters]);

  const displayProgram = () => {
    props.navigation.navigate("Filter", {
      selectedData: selectedData,
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
  }, [displayProgram]);
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.screenContainer}>
        <View style={styles.additionalFiltersWrapper}>
          <Card style={styles.contentContainer}>
            <FilterGroup
              style={styles.listSelectStyle}
              filterLists={[filter2, detailType]}
              listsData={selectedData}
              updateList={updateSelectedData}
            />
          </Card>
        </View>
      </View>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  // console.log("navData.route.params");
  // console.log(navData);
  // const filter1 = navData.route.params.listFilters.filtersOrder.filter1;
  let filter1Name = "";
  // if (filter1 == "day") filter1Name = "Ημέρας";
  // if (filter1 == "tmima") filter1Name = "Τμήματος";
  // if (filter1 == "teacher") filter1Name = "Καθηγητή";
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

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  additionalFiltersWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  additionalFiltersButton: {},
  listSelectStyle: {},
});
export default SetFiltersScreen;
