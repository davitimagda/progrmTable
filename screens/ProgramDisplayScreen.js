import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { HOURS_ARRAY } from "../data/dummy-data";
import { FilterAndSortData } from "../js/AppSettings";
import Card from "../components/UI/Card";
import Loader from "../components/UI/Loader";
import HorizontalLayout from "../components/programElements/HorizontalLayout";
import VerticalLayout from "../components/programElements/VerticalLayout";
import HoursHeader from "../components/programElements/HoursHeader";
import Offset from "../components/programElements/Offset";
import Days from "../components/programElements/Days";
import SwitchElement from "../components/Filters/SwitchElement";
import { useTheme } from "../contexts/ThemeContext";
import { useFilters } from "../contexts/FiltersContext";
import { GET_APP_LISTS } from "../js/AppSettings";

const ProgramDisplayScreen = (props) => {
  const [Loading, SetLoading] = useState(true);
  const [horizontal, setHorizontal] = useState(true);
  const { navigation } = props;

  const { filters } = useFilters();
  const { filter1, filter2, detailType } = filters.filtersOrder;

  const { colors } = useTheme();
  const styles = defaultStyles(colors);

  let sortedData = [];
  console.log("ProgramDisplay ----");
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // if (isFocused) {
      SetLoading(true);
      setTimeout(() => {
        sortedData = FilterAndSortData(filters);
        SetLoading(false);
      }, 10);
      // }
    });

    // return unsubscribe;
  }, [navigation]);

  if (Loading) {
    return <Loader loading={Loading} />;
  }

  let filterPreview;

  if (filter1 == "day" || filter1 == "tmima" || filter1 == "teacher") {
    const sortedData = FilterAndSortData(filters);

    let line_aa = 0;
    filterPreview = sortedData.map((filter1_block) => {
      let offset_lines = [];
      let days_line = [];
      let maxHeight = 0;
      let maxWidth = Math.max(...Object.values(filter1_block.widths));
      if (!isNaN(maxWidth)) {
        maxWidth = maxWidth * 9;
      } else {
        maxWidth = 38;
      }
      if (maxWidth < 38) maxWidth = 38;

      const header2_lines = filter1_block.filter2.map((filter2_block) => {
        line_aa++;
        let oddEvenStyle = {};
        if (line_aa % 2 == 0) oddEvenStyle = { backgroundColor: "#99999930" };

        let filter2Name = filter2_block.filter2Name;

        days_line = { filter2: filter2Name, days: [] };
        let hours_line = {};
        for (const [key, value] of Object.entries(HOURS_ARRAY)) {
          hours_line[key] = { name: value.name, value: [] };
        }

        let detail_lines = [];
        maxHeight = 0;

        filter2_block.hours.map((details) => {
          // 5{"details":[{"hour":"1","tmima":"Α3"}, {"hour":"2","tmima":"Α1",},],}
          let height = 0;
          if (detailType == "day") {
            days_line.days.push(
              details.detailName + " " + hours_line[details.hour].name
            );
            height = days_line.days.length * 18 + 10;
          } else {
            hours_line[details.hour].value.push(details.detailName);
            height = hours_line[details.hour].value.length * 18 + 10;
          }
          if (height > maxHeight) maxHeight = height;
        });
        if (horizontal) {
          offset_lines.push(
            <Offset
              key={filter2Name}
              offsetValue={filter2Name}
              filter2={filter2}
              style={{ height: maxHeight, ...oddEvenStyle }}
            />
          );
          if (detailType == "day") {
            detail_lines = (
              <Days
                style={{ height: maxHeight, ...oddEvenStyle }}
                days_arr={days_line}
              />
            );
          } else {
            detail_lines = (
              <HorizontalLayout
                style={{
                  height: maxHeight,
                  width: maxWidth,
                  ...oddEvenStyle,
                }}
                hours_arr={hours_line}
              />
            );
          }
        } else {
          detail_lines = (
            <VerticalLayout hours_arr={hours_line} header2Name={filter2Name} />
          );
        }

        return <View key={filter2Name}>{detail_lines}</View>;
      });

      return (
        <Card key={filter1_block.filter1Name} style={styles.cardContainer}>
          <View style={styles.header1Style}>
            <Text style={styles.header1TextStyle}>
              {filter1_block.filter1Name}
            </Text>
          </View>
          <View style={styles.header2Style}>
            {horizontal && (
              <View style={styles.horizontalLayoutStyle}>
                <View>
                  {detailType !== "day" && (
                    <Offset
                      offsetValue=" "
                      filter2={filter2}
                      style={{ height: 22 }}
                    />
                  )}
                  {offset_lines}
                </View>
                <ScrollView horizontal>
                  <View>
                    {detailType !== "day" && (
                      <HoursHeader style={{ width: maxWidth }} />
                    )}
                    {header2_lines}
                  </View>
                </ScrollView>
              </View>
            )}
            {!horizontal && (
              <View style={styles.verticalLayout}>
                <ScrollView horizontal>{header2_lines}</ScrollView>
              </View>
            )}
          </View>
        </Card>
      );
    });
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.list}>
        {detailType !== "day" && (
          <SwitchElement
            label="Οριζόντια διάταξη"
            onValueChange={() => setHorizontal((p) => !p)}
            value={horizontal}
          />
        )}
        {filterPreview}
      </ScrollView>
    </View>
  );
};

export const screenOptions = (navData) => {
  const routeParams = navData.route.params ? navData.route.params : {};
  const filter1Name = routeParams.filter1
    ? GET_APP_LISTS[routeParams.filter1].label
    : "";
  return {
    headerTitle: "Ανά " + filter1Name,
  };
};
const defaultStyles = (Colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: "space-around",
      backgroundColor: Colors.accent,
    },
    list: {
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
    },
    cardContainer: {
      marginVertical: 6,
      marginHorizontal: 10,
      backgroundColor: "white",
    },
    header1Style: {
      justifyContent: "center",
      alignItems: "center",
      padding: 5,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      backgroundColor: Colors.filter1,
      // backgroundColor: "#ff0075",
    },
    header1TextStyle: {
      fontSize: 16,
      color: "white",
      fontFamily: "open-sans-bold",
    },
    header2Style: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.filter3,
      backgroundColor: Colors.gridBackground,
    },
    horizontalLayoutStyle: {
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    verticalLayout: {
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
    },
  });
export default ProgramDisplayScreen;
