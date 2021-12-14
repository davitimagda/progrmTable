import React, { useState, useEffect, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Switch,
} from "react-native";
import {
  GROUPTMIMATA,
  HOURS_ARRAY,
  TMIMATA,
  TEACHERS,
  DAYS,
} from "../data/dummy-data";
import DayProgram from "../components/DayProgram";
import Card from "../components/UI/Card";
import Loader from "../components/UI/Loader";
import HorizontalLayout from "../components/programElements/HorizontalLayout";
import VerticalLayout from "../components/programElements/VerticalLayout";
import HoursHeader from "../components/programElements/HoursHeader";

const sortFilteredData = (lines, filters) => {
  // console.log(filters.header1Sort);
  // console.log(filters.header2Sort);
  const header1Filter = filters.header1Sort;
  const header2Filter = filters.header2Sort;
  let filter2Value = "";
  let detailValue = "";
  let detailType = "";

  let sorted = {};
  const finalSorted = [];
  lines.map((t) => {
    if (filters && header1Filter == "day") {
      if (header2Filter == "teacher") {
        filter2Value = t.teacher;
        detailValue = t.tmima;
        detailType = "tmima";
      } else {
        filter2Value = t.tmima;
        detailValue = t.teacher;
        detailType = "teacher";
      }

      if (!sorted[t.day]) {
        sorted[t.day] = {};
      }
      if (!sorted[t.day][filter2Value]) sorted[t.day][filter2Value] = [];
      sorted[t.day][filter2Value].push({ hour: t.hour, header3: detailValue });
    }
    if (filters && header1Filter == "tmima") {
      filter2Value = header2Filter == "day" ? t.day : t.teacher;
      detailValue = header2Filter == "day" ? t.teacher : t.day;
      detailType = header2Filter == "day" ? "teacher" : "day";

      if (!sorted[t.tmima]) {
        sorted[t.tmima] = {};
      }
      console.log("filter2Value");
      console.log(filter2Value);

      if (!sorted[t.tmima][filter2Value]) sorted[t.tmima][filter2Value] = [];
      sorted[t.tmima][filter2Value].push({
        hour: t.hour,
        header3: detailValue,
      });
    }
    if (filters && header1Filter == "teacher") {
      if (!sorted[t.teacher]) {
        sorted[t.teacher] = {};
      }
      if (header2Filter == "day") {
        if (!sorted[t.teacher][t.day]) sorted[t.teacher][t.day] = [];
        sorted[t.teacher][t.day].push({ hour: t.hour, header3: t.tmima });
      }
      if (header2Filter == "tmima") {
        if (!sorted[t.teacher][t.tmima]) sorted[t.teacher][t.tmima] = [];
        sorted[t.teacher][t.tmima].push({ hour: t.hour, header3: t.day });
      }
    }
  });
  if (
    filters &&
    (filters.header1Sort == "day" ||
      filters.header1Sort == "tmima" ||
      filters.header1Sort == "teacher")
  ) {
    for (const [key, header1] of Object.entries(sorted)) {
      const header2_lines = [];
      for (const [header2_key, header2_value] of Object.entries(header1)) {
        header2_lines.push({
          header2Name: header2_key,
          details: header2_value,
        });

        // if (header2Filter == "day") {
        //   header2_lines.push({ header2Name: h2_key, details: header2 });
        // }
        // if (header2Filter == "tmima") {
        //   header2_lines.push({ header2Name: h2_key, details: header2 });
        // }
        // if (header2Filter == "teacher") {
        //   header2_lines.push({ header2Name: h2_key, details: header2 });
        // }
      }
      finalSorted.push({ header1: key, header2: header2_lines });
    }
    return {
      filtersOrder: {
        filter1: header1Filter,
        filter2: header2Filter,
        detailType: detailType,
      },
      sortedData: finalSorted,
    };
  }

  console.log("sorted");
  console.log(sorted);
  sorted = Object.keys(sorted)
    .sort()
    .reduce((obj, key) => {
      obj[key] = sorted[key];
      return obj;
    }, {});
  return sorted;
};

const dayName = (day) => {
  const dayItem = DAYS.find((d) => d.aa == day);
  if (dayItem) return dayItem.name;
  return "--";
};

const ProgramDisplayScreen = (props) => {
  const [horizontal, setHorizontal] = useState(true);
  const { navigation } = props;
  const filterType = props.route.params.filterType;
  const displayName = props.route.params.displayName;
  const listFilters = props.route.params.listFilters;

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

  // const isFocused = useIsFocused();

  if (Loading) {
    return <Loader loading={Loading} />;
  }

  let selectedData;

  if (filterType == "day") {
    selectedData =
      displayName === "all"
        ? DAYS
        : DAYS.filter((day) => day.name == displayName);
  }

  if (filterType == "tmima") {
    const filterGroup = props.route.params.tmimaGroupFilter;
    const tmimaGroup = filterGroup ? "group" : "single";
    selectedData =
      displayName === "all"
        ? TMIMATA.filter((tmima) => tmima.type == tmimaGroup)
        : TMIMATA.filter(
            (tmima) => tmima.name == displayName && tmima.type == tmimaGroup
          );
  }
  let filterPreview;
  if (filterType == "teacher") {
    selectedData =
      displayName === "all"
        ? TEACHERS
        : TEACHERS.filter((teacher) => teacher.name == displayName);
    // selectedData.sort((a, b) =>
    //   a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    // );
  }
  let preview =
    selectedData.length > 0 ? (
      selectedData.map((data) => {
        const value = (
          <DayProgram
            key={data.name + (data.type ? data.type : "")}
            data={data}
            programType={filterType}
            selectedOption={displayName}
            listFilters={listFilters}
          />
        );
        return value;
      })
    ) : (
      <Text>Nothing selected</Text>
    );

  if (filterType == "day" || filterType == "tmima" || filterType == "teacher") {
    if (displayName !== "all") {
      if (filterType == "day") {
        const dayItem = DAYS.find((d) => d.name == displayName);
        listFilters.days = [
          { aa: dayItem.aa, name: dayItem.name, choice: true },
        ];
      }
      if (filterType == "tmima") {
        const filterGroup = props.route.params.tmimaGroupFilter;
        const tmimaGroup = filterGroup ? "group" : "single";
        const tmimata = TMIMATA.find(
          (t) => t.name == displayName && t.type == tmimaGroup
        );
        listFilters.tmimata = [{ name: tmimata.name, choice: true }];
      }
      if (filterType == "teacher") {
        const teacher = TEACHERS.find((d) => d.name == displayName);
        listFilters.teachers = [{ name: teacher.name, choice: true }];
      }
    }
    const t =
      listFilters.teachers.length == 0
        ? TEACHERS
        : TEACHERS.filter((teacher) => {
            const result = listFilters.teachers.find(
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
    const { filtersOrder, sortedData } = sortFilteredData(
      filteredData,
      listFilters
    );

    filterPreview = sortedData.map((line) => {
      let offsetStyle = {};
      if (listFilters.header2Sort == "day") {
        offsetStyle = { fontSize: 13, width: 40 };
      }
      if (listFilters.header2Sort == "tmima") {
        offsetStyle = { fontSize: 12, width: 40 };
      }
      if (listFilters.header2Sort == "teacher") {
        offsetStyle = { fontSize: 12, width: 75 };
      }

      let header1_line = <Text>{line.header1}</Text>;
      if (listFilters.header1Sort == "day") {
        header1_line = <Text>{dayName(line.header1)}</Text>;
      }

      const header2_lines = line.header2.map((header2) => {
        let header2Text = header2.header2Name;
        if (listFilters.header2Sort == "day") {
          header2Text = dayName(header2.header2Name);
        }
        let hours_line = {};
        for (const [key, value] of Object.entries(HOURS_ARRAY)) {
          hours_line[key] = {};
          hours_line[key].name = value.name;
          hours_line[key].value = [];
        }

        let detail_lines;
        // 5{"details":[{"hour":"1","tmima":"Α3"}, {"hour":"2","tmima":"Α1",},],"teacher": "Κυριακοπούλου",}
        header2.details.map((details) => {
          let header3 = details.header3;
          if (
            (listFilters.header1Sort == "tmima" &&
              listFilters.header2Sort == "teacher") ||
            (listFilters.header1Sort == "teacher" &&
              listFilters.header2Sort == "tmima")
          ) {
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
        <Card style={styles.cardContainer}>
          <View key={line.header1} style={styles.header1Style}>
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
      {/* <FlatList
        keyExtractor={(item, index) => {
          return item.name + (item.type ? item.type : "") + index;
        }}
        data={selectedData}
        contentContainerStyle={styles.list}
        renderItem={(itemData) => (
          <DayProgram
            key={itemData.item.name + (itemData.item.type ? itemData.item.type : "")}
            data={itemData.item}
            programType={filterType}
            selectedOption={displayName}
            listFilters={listFilters}
          />
        )}
      /> */}
      <ScrollView contentContainerStyle={styles.list}>
        {preview}
        <View style={styles.header2FilterStyle}>
          <Text>Οριζόντια διάταξη</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={horizontal ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setHorizontal((p) => !p)}
            value={horizontal}
          />
        </View>
        {filterPreview}
        {/* {selectedData.length > 0 ? (
          selectedData.map((data) => {
            return (
              <DayProgram
                key={data.name + (data.type ? data.type : "")}
                data={data}
                programType={filterType}
                selectedOption={displayName}
                listFilters={listFilters}
              />
            );
          })
        ) : (
          <Text>Nothing selected</Text>
        )} */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  header2FilterStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardContainer: {
    marginVertical: 6,
    marginHorizontal: 10,
    maxWidth: 500,
    backgroundColor: "white",
    width: "95%",
  },
  cardSection: {
    paddingBottom: 4,
  },
  header1Style: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
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
