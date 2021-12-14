import React from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  FlatList,
  TimePickerAndroid,
} from "react-native";
import {
  GROUPTMIMATA,
  TEACHERS,
  DAYS,
  HOURS_TEMPLATE,
} from "../data/dummy-data";

import Card from "./UI/Card";

const selectedTeachers = TEACHERS;

const dayHoursHeader = (day) => {
  const dayHours = day.hours.map((hour, i) => {
    const hourName = HOURS_TEMPLATE.find((h) => h.aa == hour);
    if (hourName) {
      return (
        <Text key={i} style={[styles.hourStyle, styles.hourHeaderStyle]}>
          {hourName.name}
        </Text>
      );
    } else {
      return (
        <Text key={i} style={[styles.hourStyle, styles.hourHeaderStyle]}></Text>
      );
    }
  });
  return hourLine("dayHour", "", dayHours);
};

const hourHeader = () => {
  const hoursLine = HOURS_TEMPLATE.map((hour, i) => {
    const hourName = hour.name;
    return (
      <Text key={i} style={[styles.hourStyle, styles.hourHeaderStyle]}>
        {hourName}
      </Text>
    );
  });
  return hourLine("hour", "", hoursLine);
};

const hoursSection = (day, teacher, tmimataFilter) => {
  //  Day = {"aa": "1", "hours": Array [1, 2, 3, 4, 5, 6, 7,], "name": "ΔΕΥΤΕΡΑ",}
  let hours = {};
  if (tmimataFilter.length > 0) {
    let count = 0;
    for (const [hour, tmima] of Object.entries(teacher.days[day.aa].hours)) {
      const selectedTmima = tmimataFilter.find((t) => t.name == tmima);
      if (selectedTmima) {
        count++;
        hours[hour] = selectedTmima.name;
      }
    }
    if (count == 0) {
      return null;
    }
  } else {
    hours = teacher.days[day.aa].hours;
  }
  const line = day.hours.map((hour, i) => {
    let tmima = "";
    // if (teacher.days[day.aa].hours[hour]) {
    if (hours[hour]) {
      // tmima = teacher.days[day.aa].hours[hour];
      tmima = hours[hour];
    }
    return (
      <Text key={i} style={styles.hourStyle}>
        {tmima}
      </Text>
    );
  });
  return line;
};

const hourLine = (i, firstPart, secondPart) => {
  if (secondPart != null) {
    return (
      <View key={i} style={styles.hoursLineStyle}>
        <Text style={[styles.hourStyle, { fontSize: 14, width: 70 }]}>
          {firstPart}
        </Text>
        {secondPart}
      </View>
    );
  } else {
    return false;
  }
};

const dayDetailLines = (day, listFilters) => {
  let teacher_lines;
  if (listFilters.lists.teacher.length > 0) {
    teacher_lines = listFilters.lists.teacher.map((selteacher, i) => {
      const teacher = TEACHERS.find((t) => t.name == selteacher.name);
      const line = hoursSection(day, teacher, listFilters.lists.tmima);
      return hourLine(i, teacher.name, line);
    });
  } else {
    teacher_lines = selectedTeachers.map((teacher, i) => {
      const line = hoursSection(day, teacher, listFilters.lists.tmima);
      return hourLine(i, teacher.name, line);
    });
  }

  const lines_to_send = teacher_lines.filter((t) => {
    if (t) {
      return t;
    }
  });

  if (lines_to_send.length > 0) {
    return (
      <View style={styles.cardSection}>
        {dayHoursHeader(day)}
        {lines_to_send}
      </View>
    );
  } else {
    return false;
  }
};

const teacherDetailLines = (teacher, listFilters) => {
  const teacher_details = teacher.getTeacherTmima(listFilters);

  let sorted = {};
  teacher_details.map((t) => {
    if (!sorted[t.tmima]) {
      sorted[t.tmima] = {};
    }
    if (!sorted[t.tmima][t.day]) {
      sorted[t.tmima][t.day] = [];
    }
    sorted[t.tmima][t.day].push(t.hour);
  });
  // console.log("sorted");
  // console.log(sorted);
  sorted = Object.keys(sorted)
    .sort()
    .reduce((obj, key) => {
      obj[key] = sorted[key];
      return obj;
    }, {});

  let day_lines;
  if (listFilters.lists.day.length > 0) {
    day_lines = listFilters.lists.day.map((selday, i) => {
      const day = DAYS.find((d) => d.name == selday.name);
      const line = hoursSection(day, teacher, listFilters.lists.tmima);
      return hourLine(i, day.name, line);
    });
  } else {
    day_lines = DAYS.map((day, i) => {
      const line = hoursSection(day, teacher, listFilters.lists.tmima);
      return hourLine(i, day.name, line);
    });
  }

  const lines_to_send = day_lines.filter((t) => {
    if (t) {
      return t;
    }
  });
  if (lines_to_send.length > 0) {
    return (
      <View style={styles.cardSection}>
        {hourHeader()}
        {lines_to_send}
      </View>
    );
  } else {
    return false;
  }
};
const getTeacherTmima = (t, tmimaFilter, dayFilter) => {
  const tmimata = [];
  for (const day_aa in t.days) {
    if (Object.hasOwnProperty.call(t.days, day_aa)) {
      for (const hour in t.days[day_aa]["hours"]) {
        if (Object.hasOwnProperty.call(t.days[day_aa]["hours"], hour)) {
          const tmima = t.days[day_aa]["hours"][hour];
          tmimata.push({ tmima: tmima, day: day_aa, hour: hour });
        }
      }
    }
  }
  if (tmimaFilter.length > 0 || dayFilter > 0) {
    return filterTeacher(tmimata, tmimaFilter, dayFilter);
  }
  return tmimata;
};

const filterTeacher = (teacher, tmimaFilter, dayFilter) => {
  const teacher_lines = teacher.filter((t) => {
    let tmimaCheck = true;
    let dayCheck = true;
    if (tmimaFilter.length > 0) {
      const listTmima = tmimaFilter.find((t_list) => t_list.name == t.tmima);
      if (!listTmima) {
        tmimaCheck = false;
      }
    }
    if (dayFilter.length > 0) {
      const listDay = dayFilter.find((t_list) => t_list.aa == t.day);
      if (!listDay) {
        dayCheck = false;
      }
    }

    if (tmimaCheck && dayCheck) {
      return t;
    }
  });
  return teacher_lines;
};

const tmimaDetailLines = (tmima, listFilters) => {
  const lines = [];
  let dayLine = [];
  if (tmima.type !== "group1") {
    tmima.daylines.forEach((hour, index) => {
      if (hour[0] == "headerDay") {
        if (index !== 0) {
          lines.push(
            <View key={index} style={styles.tmimaDayCard}>
              {dayLine}
            </View>
          );
          dayLine = [];
        }
        dayLine.push(
          <Card key={hour[0]} style={styles.secondaryTmimaStyle}>
            <Text style={styles.secondaryTmimaTextStyle}>{hour[1]}</Text>
          </Card>
        );
      } else {
        dayLine.push(
          <Card key={hour[0].h_name} style={styles.teacherDetailStyle}>
            <Text>{hour[0].h_name}</Text>
            <Text style={styles.teacherDetailNameStyle}>
              {hour[0].t_name.join("\n")}
            </Text>
          </Card>
        );
      }
    });
    lines.push(
      <View key={tmima.name + tmima.type} style={styles.tmimaDayCard}>
        {dayLine}
      </View>
    );

    return <View style={styles.tmimaCard}>{lines}</View>;
  }
};

const DayProgram = (props) => {
  if (props.programType == "day") {
    const day_lines_returned = dayDetailLines(props.data, props.listFilters);
    if (day_lines_returned) {
      return (
        <Card style={styles.cardContainer}>
          <View style={styles.mainHeaderStyle}>
            <Text style={styles.mainHeaderTextStyle}>{props.data.name}</Text>
          </View>
          <View>{dayDetailLines(props.data, props.listFilters)}</View>
        </Card>
      );
    } else {
      return null;
    }
  }
  if (props.programType == "teacher") {
    const lines_returned = teacherDetailLines(props.data, props.listFilters);

    if (lines_returned) {
      return (
        <Card style={styles.cardContainer}>
          <View style={styles.mainHeaderStyle}>
            <Text style={styles.mainHeaderTextStyle}>{props.data.name}</Text>
          </View>
          <View>{teacherDetailLines(props.data, props.listFilters)}</View>
        </Card>
      );
    } else {
      return lines_returned;
    }
  }
  if (props.programType == "tmima") {
    return (
      <Card style={styles.cardContainer}>
        <View style={styles.mainHeaderStyle}>
          <Text style={styles.mainHeaderTextStyle}>{props.data.name}</Text>
          <Text style={styles.mainHeaderTextStyle}>{props.data.type}</Text>
        </View>
        <View>{tmimaDetailLines(props.data, props.listFilters)}</View>
      </Card>
    );
  }
};

const styles = StyleSheet.create({
  cardContainer: {
    // flex:1,
    marginVertical: 6,
    marginHorizontal: 10,
    maxWidth: 500,
    backgroundColor: "white",
    // padding: 8,
  },
  cardSection: {
    paddingBottom: 4,
  },
  mainHeaderStyle: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // marginVertical: 1,
    // marginHorizontal: 1,
    fontSize: 20,
    padding: 5,
    // borderWidth: 1,
    // borderColor: "#ccc",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#ba45ba",
    // backgroundColor: "#ff0075",
  },
  mainHeaderTextStyle: {
    fontSize: 16,
    color: "white",
  },
  hoursLineStyle: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  hourHeaderStyle: {
    fontSize: 10,
    borderWidth: 0,
    color: "#ccc",
    paddingVertical: 0,
    borderWidth: 0,
    borderStartWidth: 0,
    borderLeftWidth: 0,
    // backgroundColor: "#eee",
    // backgroundColor: "#a660a2",
    // backgroundColor: "#fffbbb",
  },
  hourStyle: {
    flexDirection: "row",
    textAlignVertical: "center",
    textAlign: "center",
    marginVertical: 0.4,
    width: 39,
    paddingHorizontal: 1,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "#ccc",
    // borderTopColor: "#999999",
    // borderBottomColor: "#999999",
  },
  tmimaCard: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  tmimaDayCard: {
    marginVertical: 10,
    // borderWidth: 1,
  },
  secondaryTmimaStyle: {
    flexDirection: "row",
    justifyContent: "center",
    textAlignVertical: "center",
    textAlign: "center",
    backgroundColor: "rgb(9, 190, 208)" /*"#5f8589",*/,
    marginVertical: 0.4,
    paddingHorizontal: 1,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    borderRadius: 4,
    borderColor: "#ccc",
  },
  secondaryTmimaTextStyle: {
    color: "white",
  },
  teacherDetailStyle: {
    flexDirection: "row",
    paddingHorizontal: 1,
    borderRadius: 4,
    marginVertical: 0.5,
    width: 150,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  teacherDetailNameStyle: {
    // flexDirection: "row",
    paddingLeft: 5,
  },
});

export default DayProgram;
