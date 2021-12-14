import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, FlatList, StyleSheet } from "react-native";
import { HOURS_ARRAY, TMIMATA, TEACHERS, DAYS } from "../data/dummy-data";
import { SORT_FILTERED_DATA, OLD_PREVIEW } from "../js/AppSettings";
import DayProgram from "../components/DayProgram";
import Card from "../components/UI/Card";
import Loader from "../components/UI/Loader";
import HorizontalLayout from "../components/programElements/HorizontalLayout";
import VerticalLayout from "../components/programElements/VerticalLayout";
import HoursHeader from "../components/programElements/HoursHeader";
import MainSwitch from "../components/Filters/SwitchElement";

const dayName = (day) => {
  const dayItem = DAYS.find((d) => d.aa == day);
  if (dayItem) return dayItem.name;
  return "--";
};

const ProgramDisplayScreen = (props) => {
  const { navigation } = props;
  const [horizontal, setHorizontal] = useState(true);

  const listFilters = props.route.params.listFilters;
  const { filtersOrder } = props.route.params.listFilters;

  const filter1 = filtersOrder.filter1;

  const [Loading, SetLoading] = useState(true);

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
  }, [navigation]);

  if (Loading) {
    return <Loader loading={Loading} />;
  }

  let oldVersion = true;
  let oldVersionPreview;
  if (oldVersion == true) {
    const filterGroup = listFilters.tmimaGroup;
    const tmimaGroup = filterGroup ? "group" : "single";
    const name = listFilters.lists[filter1].find((item) => item.choice == true);
    const displayName = name ? name.name : "";
    oldVersionPreview = OLD_PREVIEW(
      filter1,
      displayName,
      tmimaGroup,
      listFilters
    );
  }
  let filterPreview;

  if (filter1 == "day" || filter1 == "tmima" || filter1 == "teacher") {
    const t =
      listFilters.lists.teacher.length == 0
        ? TEACHERS
        : TEACHERS.filter((teacher) => {
            const result = listFilters.lists.teacher.find(
              (t_list) => t_list.name == teacher.name
            );
            if (result) {
              return teacher;
            }
          });
    let filteredData = [];
    for (const [key, teacher] of Object.entries(t)) {
      const teacher_details = teacher.getTeacherTmima(listFilters);
      if (teacher_details.length > 0) {
        filteredData = filteredData.concat(teacher_details);
      }
    }
    // const sortedData = sortFilteredData(filteredData, listFilters);
    const sortedData = SORT_FILTERED_DATA(filteredData, listFilters);

    filterPreview = sortedData.map((line) => {
      let offsetStyle = {};
      if (filtersOrder.filter2 == "day") {
        offsetStyle = { fontSize: 13, width: 40 };
      }
      if (filtersOrder.filter2 == "tmima") {
        offsetStyle = { fontSize: 12, width: 40 };
      }
      if (filtersOrder.filter2 == "teacher") {
        offsetStyle = { fontSize: 12, width: 75 };
      }

      let header1_line = <Text>{line.header1}</Text>;
      if (filtersOrder.filter1 == "day") {
        header1_line = <Text>{dayName(line.header1)}</Text>;
      }

      const header2_lines = line.header2.map((header2) => {
        let header2Text = header2.header2Name;
        if (filtersOrder.filter2 == "day") {
          header2Text = dayName(header2.header2Name);
        }
        let hours_line = {};
        for (const [key, value] of Object.entries(HOURS_ARRAY)) {
          hours_line[key] = {};
          hours_line[key].name = value.name;
          hours_line[key].value = [];
        }

        let detail_lines = [];
        header2.details.map((details) => {
          // 5{"details":[{"hour":"1","tmima":"Α3"}, {"hour":"2","tmima":"Α1",},],"teacher": "Κυριακοπούλου",}
          let header3 = details.header3;
          if (filtersOrder.detailType == "day") {
            header3 = dayName(header3);
          }
          hours_line[details.hour].value.push(header3);
        });
        if (horizontal) {
          detail_lines = (
            <View>
              <HorizontalLayout
                hours_arr={hours_line}
                header2Name={header2Text}
                offsetStyle={offsetStyle}
              />
            </View>
          );
        } else {
          detail_lines = (
            <VerticalLayout hours_arr={hours_line} header2Name={header2Text} />
          );
        }
        return <View key={header2Text}>{detail_lines}</View>;
      });

      return (
        <Card key={line.header1} style={styles.cardContainer}>
          <View style={styles.header1Style}>
            <Text style={styles.header1TextStyle}>{header1_line}</Text>
            {/* <Text style={styles.mainHeaderTextStyle}>{props.data.type}</Text> */}
          </View>
          <View style={styles.header2Style}>
            {horizontal && <HoursHeader offsetStyle={offsetStyle} />}
            {header2_lines}
          </View>
        </Card>
      );
    });
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.list}>
        {oldVersionPreview}
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

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  list: {
    width: "100%",
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  cardContainer: {
    // flexDirection: "row",
    marginVertical: 6,
    marginHorizontal: 10,
    maxWidth: 500,
    backgroundColor: "white",
    width: "95%",
  },
  header1Style: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#ba45ba",
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
  },
});
export default ProgramDisplayScreen;
