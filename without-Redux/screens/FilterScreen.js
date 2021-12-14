import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import { TMIMATA, TEACHERS, DAYS } from "../data/dummy-data";
import { GET_DETAIL_TYPE } from "../js/AppSettings.js/AppSettings";
import Card from "../components/UI/Card";
import MainButton from "../components/UI/MainButton";
import SwitchElement from "../components/Filters/SwitchElement";
import SwitchGroup from "../components/Filters/SwitchGroup";
import FilterGroup from "../components/Filters/FilterGroup";
import ListSelect from "../components/Filters/ListSelect";
import Colors from "../constants/colors";

const FilterScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tmimaGroup, setTmimaGroup] = useState(true);
  const [filter2, setFilter2] = useState("");
  const [selectedData, setSelectedData] = useState({
    day: [],
    tmima: [],
    teacher: [],
  });

  console.log("Filter Screen ----");
  // console.log("props.navigation");
  // console.log(props.navigation);
  // console.log(props.route);

  const updateSelectedData = (listName, data) => {
    setSelectedData((prevState) => ({
      ...prevState,
      [listName]: data(),
    }));
  };

  const toggleTmimaGrouph = () =>
    setTmimaGroup((previousState) => !previousState);

  const filtersOrder = props.route.params.filtersOrder;
  const filter1 = filtersOrder.filter1;

  useEffect(() => {
    setFilter2(filtersOrder.filter2);
  }, []);

  // console.log("selectedData");
  // console.log(selectedData);
  const detailType = GET_DETAIL_TYPE(filter1, filter2);
  const listFilters = {
    lists: selectedData,
    filtersOrder: {
      filter1: filter1,
      filter2: filter2,
      detailType: detailType,
    },
  };
  const displayProgram = () => {
    const listFilters = {
      lists: selectedData,
      filtersOrder: {
        filter1: filter1,
        filter2: filter2,
        detailType: detailType,
      },
    };
    props.navigation.navigate("ProgramDisplay", {
      tmimaGroupFilter: tmimaGroup,
      listFilters: listFilters,
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
    <ScrollView style={styles.screen}>
      {/* <Card key="all" style={styles.goButton}>
        <Button title="Όλα" onPress={displayProgram} />
      </Card> */}

      <View style={styles.screenContainer}>
        <Card style={styles.filter1CardStyle}>
          <ListSelect
            style={styles.filter1ListStyle}
            listName={filter1}
            updateList={updateSelectedData.bind(this, filter1)}
            selectedList={selectedData[filter1]}
          />
          {filter1 == "tmima" && (
            <View style={styles.centerColumn}>
              <SwitchElement
                label="Ομαδοποίηση τμημάτων"
                onValueChange={toggleTmimaGrouph}
                value={tmimaGroup}
              />
            </View>
          )}
          <SwitchGroup
            style={styles.switchGroupStyle}
            switches={[filtersOrder.filter2, filtersOrder.detailType]}
            filter2={filter2}
            onValueChange={(value) => setFilter2(() => value)}
          />
        </Card>

        <View style={{ width: "100%" }}>
          <View style={styles.additionalFiltersWrapper}>
            <MainButton
              style={styles.additionalFiltersButton}
              onPress={() =>
                props.navigation.navigate("SetFilters", {
                  listFilters: listFilters,
                })
              }
            >
              Πρόσθετα φίλτρα
            </MainButton>
          </View>
          <Card style={styles.contentContainer}>
            <FilterGroup
              style={styles.listSelectStyle}
              filterLists={[filtersOrder.filter2, filtersOrder.detailType]}
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
  const filter1 = navData.route.params.filtersOrder.filter1;
  let filter1Name = "";
  if (filter1 == "day") filter1Name = "Ημέρας";
  if (filter1 == "tmima") filter1Name = "Τμήματος";
  if (filter1 == "teacher") filter1Name = "Καθηγητή";
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
  centerColumn: {
    justifyContent: "center",
    alignItems: "center",
  },
  screenContainer: {
    // flexDirection: "row",
    // backgroundColor: "#999",
    // width: "100%",
    alignItems: "center",
    // flexWrap: "wrap",
    justifyContent: "center",
    // margin: 10,
    // backgroundColor: Colors.accent,
  },
  filter1CardStyle: {
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    margin: 10,
    // paddingVertical: 10,
    // backgroundColor: Colors.accent,
  },
  filter1ListStyle: {
    // width: "95%",
    backgroundColor: Colors.accent,
  },
  additionalFiltersWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  additionalFiltersButton: {},
  goButton: {
    backgroundColor: "#fff",
    margin: 5,
    borderColor: "white",
    borderWidth: 3,
  },
  button: {
    fontSize: 20,
  },
  switchGroupStyle: {
    flexDirection: "row",
    justifyContent: "center",
  },
  listSelectStyle: {
    // width: "80%",
    // backgroundColor: Colors.accent,
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
