import React from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
import {
  GROUPTMIMATA,
  TEACHERS,
  DAYS,
  HOURS_TEMPLATE,
} from "../data/dummy-data";

const ProgramDisplayScreen = (props) => {
  const filterType = props.route.params.filterType;
  const displayName = props.route.params.value;

  let choices;

  let selectedTeachers = TEACHERS;
  let selectedDays = DAYS;

  if (filterType == "day") {
    if (displayName !== "all") {
      selectedDays = selectedDays.filter((day) => day.name == displayName);
    }
  }

  if (filterType == "tmima") {
    choices = GROUPTMIMATA;
  }

  if (filterType == "teacher") {
    if (displayName !== "all") {
      selectedTeachers = selectedTeachers.filter(
        (teacher) => teacher.name == displayName
      );
    }
  }

  const prepareView = (day) => {
    const daysHeader = <Text style={styles.dayStyle}>{day.name}</Text>;
    let dayHours = [];

    dayHours = day.hours.map((hour) => {
      // dayHours.push(<Text style={styles.hourStyle}>{hour}</Text>);
      const hourName = HOURS_TEMPLATE[hour].name;
      return <Text style={styles.hourStyle}>{hourName}</Text>;
    });
    // for (const hour in day.hours) {
    //   if (Object.hasOwnProperty.call(day.hours, hour)) {
    //     dayHours.push(<Text style={styles.hourStyle}>{hour}</Text>);
    //   }
    // }
    const hoursHeader = <View style={styles.hoursHeaderStyle}>{dayHours}</View>;

    return (
      <View>
        <View style={styles.daysHeaderStyle}>{daysHeader}</View>
        <View style={styles.daysHeaderStyle}>{hoursHeader}</View>
      </View>
    );
  };

  const detailLines = (day) => {
    const teacher_lines = [];

    for (const choice in selectedTeachers) {
      if (selectedTeachers.hasOwnProperty.call(selectedTeachers, choice)) {
        let line = [];

        // for (const hour in day.hours) {
        // if (day.hours.hasOwnProperty.call(day.hours, hour)) {
        line = day.hours.map((hour) => {
          const t1 = selectedTeachers[choice];
          let tmima = "";
          if (t1.days[day.aa].hours[hour]) {
            tmima = t1.days[day.aa].hours[hour];
          }
          return <Text style={styles.hourStyle}>{tmima}</Text>;
          // console.log(tmima);
          // line.push(<Text style={styles.hourStyle}>{tmima}</Text>);
        });
        // const t1 = selectedTeachers[choice];
        //   let tmima = "";
        //   if (t1.days[day.aa].hours[hour]) {
        //     tmima = t1.days[day.aa].hours[hour];
        // }
        // line.push(<Text style={styles.hourStyle}>{tmima}</Text>);
        // }
        // }
        teacher_lines.push(
          <View>
            {displayName == "all" || filterType !== "teacher" ? (
              <Text style={styles.daysStyle}>
                {selectedTeachers[choice].name}
              </Text>
            ) : (
              <Text></Text>
            )}
            <View style={styles.hoursHeaderStyle}>{line}</View>
          </View>
        );
      }
    }
    return <View style={styles.lineStyle}>{teacher_lines}</View>;
    // });
    // return <View style={styles.daysHeaderStyle}>{hoursHeader}</View>;
  };

  return (
    <View style={styles.screen}>
      <View style={styles.choiceButton}>
        <Button title={displayName} />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {selectedDays.length > 0 ? (
          selectedDays.map((day) => {
            return (
              <View key={day.name}>
                {prepareView(day)}
                <View style={styles.daysHeaderStyle}>{detailLines(day)}</View>
              </View>
            );
          })
        ) : (
          <Text></Text>
        )}
        {}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  contentContainer: {
    // flex: 1,
    flexDirection: "row",
    backgroundColor: "#eee",
    // marginHorizontal: 10,
    width: "100%",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    // marginBottom: 30,
    // paddingBottom :80
  },
  choiceButton: {
    backgroundColor: "#fff",
    margin: 5,
    // padding: 5,
    // width: "30%",
    // borderRadius: 15,
    borderColor: "white",
    borderWidth: 3,
  },
  daysHeaderStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 1,
    marginHorizontal: 5,
    fontSize: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  dayStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 1,
    marginHorizontal: 1,
    // fontSize: 20,
    padding: 5,
    borderWidth: 1,
  },
  hoursHeaderStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    // marginVertical: 1,
    // marginHorizontal: 2,
    fontSize: 20,
    // padding: 1,
    borderLeftWidth: 1,
    borderLeftColor: "orange",
    borderRightColor: "orange",
  },
  hourStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 1,
    marginHorizontal: 1,
    width: 45,
    // fontSize: 20,
    padding: 5,
    borderWidth: 1,
  },
  button: {
    fontSize: 20,
  },
});
export default ProgramDisplayScreen;
