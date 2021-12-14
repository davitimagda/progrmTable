import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { HOURS_ARRAY, TMIMATA, TEACHERS, DAYS } from "../data/dummy-data";
import {
  FilterAndSortData,
  SortArrayOfObjectsByProperty,
} from "../js/AppSettings";
import Card from "../components/UI/Card";
import Loader from "../components/UI/Loader";
import HorizontalLayout from "../components/programElements/HorizontalLayout";
import VerticalLayout from "../components/programElements/VerticalLayout";
import HoursHeader from "../components/programElements/HoursHeader";
import Offset from "../components/programElements/Offset";
import MainSwitch from "../components/Filters/SwitchElement";
import { useTheme } from "../contexts/ThemeContext";
import { useFilters } from "../contexts/FiltersContext";

const dayName = (day) => {
  const dayItem = DAYS.find((d) => d.aa == day);
  if (dayItem) return dayItem.name;
  return day;
};

const ProgramDisplayScreen = (props) => {
  const [Loading, SetLoading] = useState(true);
  const [horizontal, setHorizontal] = useState(true);
  const { navigation } = props;

  const { filters } = useFilters();
  const { filtersOrder } = filters;
  const { filter1, filter2, detailType } = filtersOrder;

  const { colors } = useTheme();
  const styles = defaultStyles(colors);
  console.log("ProgramDisplay ----");
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // if (isFocused) {
      SetLoading(true);
      setTimeout(() => {
        SetLoading(false);
      }, 0);
      // }
    });

    // return unsubscribe;
  }, [navigation, horizontal]);

  if (Loading) {
    return <Loader loading={Loading} />;
  }

  let filterPreview;

  if (filter1 == "day" || filter1 == "tmima" || filter1 == "teacher") {
    const sortedData = FilterAndSortData(filters);

    let offsetStyle = {};
    if (filter2 == "day") {
      offsetStyle = { fontSize: 13, width: 60 };
    }
    if (filter2 == "tmima") {
      offsetStyle = { fontSize: 12, width: 40 };
    }
    if (filter2 == "teacher") {
      offsetStyle = { fontSize: 12, width: 75 };
    }
    filterPreview = sortedData.map((line) => {
      let header1_line = <Text>{line.header1}</Text>;
      if (filter1 == "day") {
        header1_line = <Text>{dayName(line.header1)}</Text>;
      }

      // sort
      if (filter2 == "tmima") {
        line.header2 = SortArrayOfObjectsByProperty(
          line.header2,
          "header2Name"
        );
      }

      let offset_lines = [];
      let maxHeight = 0;
      const header2_lines = line.header2.map((header2) => {
        let header2Text = header2.header2Name;
        if (filter2 == "day") {
          header2Text = dayName(header2.header2Name);
        }
        let hours_line = {};
        for (const [key, value] of Object.entries(HOURS_ARRAY)) {
          hours_line[key] = {};
          hours_line[key].name = value.name;
          hours_line[key].value = [];
        }

        let detail_lines = [];
        maxHeight = 0;

        header2.details.map((details) => {
          // 5{"details":[{"hour":"1","tmima":"Α3"}, {"hour":"2","tmima":"Α1",},],"teacher": "Κυριακοπούλου",}
          let header3 = details.header3;
          if (detailType == "day") {
            header3 = dayName(header3);
          }
          hours_line[details.hour].value.push(header3);
          const height = hours_line[details.hour].value.length * 18 + 10;
          if (height > maxHeight) maxHeight = height;
        });
        if (horizontal) {
          offset_lines.push(
            <View key={header2Text} style={{ ...offsetStyle }}>
              <Offset
                offsetValue={header2Text}
                offsetStyle={{ ...offsetStyle, height: maxHeight }}
              />
            </View>
          );
          detail_lines = (
            <HorizontalLayout
              style={{ height: maxHeight }}
              hours_arr={hours_line}
              header2Name={header2Text}
              offsetStyle={offsetStyle}
            />
          );
        } else {
          detail_lines = (
            // <View style={styles.verticalLayout}>
            <VerticalLayout hours_arr={hours_line} header2Name={header2Text} />
            // </View>
          );
        }
        return <View key={header2Text}>{detail_lines}</View>;
      });

      return (
        <Card key={line.header1} style={styles.cardContainer}>
          <View style={styles.header1Style}>
            <Text style={styles.header1TextStyle}>{header1_line}</Text>
          </View>
          <View style={styles.header2Style}>
            {horizontal && (
              <View style={styles.horizontalLayout}>
                <View>
                  <Offset
                    offsetValue=" "
                    offsetStyle={{ ...offsetStyle, height: 22 }}
                  />
                  {offset_lines}
                </View>
                <ScrollView horizontal>
                  <View>
                    <HoursHeader offsetStyle={offsetStyle} />
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
        <MainSwitch
          label="Οριζόντια διάταξη"
          onValueChange={() => setHorizontal((p) => !p)}
          value={horizontal}
        />
        {filterPreview}
      </ScrollView>
    </View>
  );
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
    },
    header2Style: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.filter3,
    },
    horizontalLayout: {
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
