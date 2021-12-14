import React from "react";
import { TMIMATA, TEACHERS, DAYS } from "../data/dummy-data";

const appLists = {
  day: {
    label: "Ημέρα ",
    labels: "Ημέρες",
    genitive: "Ημέρας",
    genitives: "Ημερών",
    allLabel: "Όλες",
  },
  teacher: {
    label: "Καθηγητή ",
    labels: "Καθηγητές",
    genitive: "Καθηγητή",
    genitives: "Καθηγητών",
    allLabel: "Όλοι",
  },
  tmima: {
    label: "Τμήμα ",
    labels: "Τμήματα",
    genitive: "Τμήματος",
    genitives: "Τμημάτων",
    allLabel: "Όλα",
  },
};

const getDefaultOrder = (filter1) => {
  let filter2 = "";
  if (filter1 == "day") filter2 = "teacher";
  if (filter1 == "tmima") filter2 = "day";
  if (filter1 == "teacher") filter2 = "day";
  return {
    filter1: filter1,
    filter2: filter2,
    detailType: getDetailType(filter1, filter2),
  };
};

const getDetailType = (filter1, filter2) => {
  let detailType = "";
  if (filter1 == "day") {
    detailType = filter2 == "teacher" ? "tmima" : "teacher";
  }

  if (filter1 == "tmima") {
    detailType = filter2 == "day" ? "teacher" : "day";
  }

  if (filter1 == "teacher") {
    detailType = filter2 == "day" ? "tmima" : "day";
  }
  return detailType;
};

const switchesGroup = (filter1) => {
  const defaultOrder = getDefaultOrder(filter1);
  return [
    {
      listName: defaultOrder.filter2,
      details: appLists[defaultOrder.filter2],
    },
    {
      listName: defaultOrder.detailType,
      details: appLists[defaultOrder.detailType],
    },
  ];
};
export const GET_APP_LISTS = appLists;
export const GET_DETAIL_TYPE = getDetailType;
export const GET_DEFAULT_ORDER = getDefaultOrder;
export const SWITCHES_GROUP = switchesGroup;

// functions for filtering and sorting data to be displayed (ProgramDisplay)
export const FilterAndSortData = (filters) => {
  // if (
  //   filters.filtersOrder.filter1 == "tmima" ||
  //   ["day", "tmima"].includes(filters.filtersOrder.detailType)
  // ) {
  //   // if (filters.filtersOrder.detailType == "day") {
  //   filters.tmimaGroup = false;
  // }
  const teacher_details =
    filters.lists.teacher.length == 0
      ? TEACHERS
      : TEACHERS.filter((teacher) => {
          const selectedTeacher = filters.lists.teacher.find(
            (filterTeacher) => filterTeacher.name == teacher.name
          );
          if (selectedTeacher) {
            return teacher;
          }
        });
  let filteredData = [];
  for (const [key, teacher] of Object.entries(teacher_details)) {
    const teacher_hours = teacher.getTeacherDetails();
    const filteredTeacher = filterTeacherDetails(teacher_hours, filters);

    if (filteredTeacher.length > 0) {
      filteredData = filteredData.concat(filteredTeacher);
    }
  }

  return sortFilteredData(filteredData, filters);
};

const filterTeacherDetails = (teacher, filters) => {
  const tmimaGroup = filters.tmimaGroup;
  const teacher_lines = teacher.filter((teacher) => {
    let tmimaCheck = true;
    let dayCheck = true;

    const selectedDay = checkDay(filters.lists.day, teacher);
    if (!selectedDay) {
      dayCheck = false;
    } else {
      teacher.dayName = selectedDay.name;
    }

    if (dayCheck) {
      const selectedTmima = checkTmima(
        filters.lists.tmima,
        tmimaGroup,
        teacher.tmima
      );
      if (!selectedTmima) {
        tmimaCheck = false;
      } else {
        teacher.type = selectedTmima.type;
        teacher.subTmimaOf = selectedTmima.subTmimaOf;
      }
    }

    if (tmimaCheck && dayCheck) {
      return teacher;
    }
  });
  return teacher_lines;
};

const findTmimaDetails = (tmimaName) => {
  const tmimaDetails = TMIMATA.find((tmima) => tmima.name == tmimaName);
  if (!tmimaDetails) {
    return false;
  }
  return tmimaDetails;
};

const checkTmima = (selectedTmimata, tmimaGroup, checkingTmima) => {
  let selectedTmima;
  if (selectedTmimata.length > 0) {
    selectedTmima = selectedTmimata.find(
      (tmima) => tmima.name == checkingTmima
    );
    if (!selectedTmima) {
      if (tmimaGroup) {
        selectedTmima = findTmimaDetails(checkingTmima);
        if (!selectedTmima || selectedTmima.type !== "OP" || selectedTmima.type !== "FL") {
          return false;
        }
      }
    }
  } else {
    selectedTmima = findTmimaDetails(checkingTmima);
  }
  if (!selectedTmima) {
    return false;
  } else {
    return selectedTmima;
  }
};

const checkDay = (selectedDays, teacher) => {
  let day;
  if (selectedDays.length > 0) {
    day = selectedDays.find((day) => day.aa == teacher.day);
  } else {
    day = DAYS.find((day) => day.aa == teacher.day);
  }
  if (!day) {
    return false;
  } else {
    return day;
  }
};

const sortFilteredData = (teachers, filters) => {
  let sorted = {};
  let finalSorted = [];
  if (filters && filters.filtersOrder) {
    const filter1 = filters.filtersOrder.filter1;
    const tmimaGroup = filters.tmimaGroup;

    if (filter1 == "day" || filter1 == "tmima" || filter1 == "teacher") {
      teachers.map((teacher) => {
        if (tmimaGroup == true) {
          if (teacher.type == "OP" || teacher.type == "FL") {
            return false;
          }
        }
        sorted = groupTeacherDetails(teacher, sorted, filters, "");
      });

      if (tmimaGroup == true) {
        teachers.map((teacher) => {
          if (teacher.type == "GP") return false;
          if (teacher.subTmimaOf.length > 0) {
            teacher.subTmimaOf.map((gpTmima) => {
              let selectedTmima = true;
              if (filters.lists.tmima.length > 0) {
                selectedTmima = filters.lists.tmima.find(
                  (tmima) =>
                    tmima.name == gpTmima || tmima.name == teacher.tmima
                );
              }

              if (selectedTmima) {
                sorted = groupTeacherDetails(teacher, sorted, filters, gpTmima);
              }
            });
          }
        });
      }

      // group by filter2
      for (const [filter1_key, header1] of Object.entries(sorted)) {
        const filter2_lines = [];
        for (const [filter2_key, filter2_value] of Object.entries(
          header1.filter2
        )) {
          filter2_lines.push({
            filter2Name: filter2_key,
            filter2Name: filter2_value.name,
            hours: filter2_value.hours,
          });
        }
        finalSorted.push({
          filter1: filter1_key,
          filter1Name: header1.name,
          filter2: filter2_lines,
          widths: header1.widths,
        });
      }

      // sort by filter1 = TMIMA
      if (filter1 == "tmima") {
        finalSorted = sortArrayOfObjectsByProperty(finalSorted, "filter1");
      }
      // sort by filter2 = TMIMA
      if (filters.filtersOrder.filter2 == "tmima") {
        finalSorted.map((filter1_block) => {
          filter1_block.filter2 = sortArrayOfObjectsByProperty(
            filter1_block.filter2,
            "filter2Name"
          );
        });
      }

      return finalSorted;
    }
  }
  return sorted;
};

const sortArrayOfObjectsByProperty = (arrObjects, property) => {
  arrObjects.sort((a, b) =>
    a[property] > b[property] ? 1 : b[property] > a[property] ? -1 : 0
  );
  return arrObjects;
};

const groupTeacherDetails = (teacher, sorted, filters, mainTmima) => {
  const filter1 = filters.filtersOrder.filter1;
  const filter2 = filters.filtersOrder.filter2;
  const detailType = filters.filtersOrder.detailType;

  let filter1Value = teacher[filter1];
  let filter2Value = teacher[filter2];
  let detailValue = detailType == "day" ? teacher.dayName : teacher[detailType];

  if (mainTmima && mainTmima !== "") {
    if (filter1 == "tmima") filter1Value = mainTmima;
    if (filter2 == "tmima") filter2Value = mainTmima;
    detailValue = teacher.tmima + " " + detailValue;
  }

  if (!sorted[filter1Value]) {
    sorted[filter1Value] = {
      name: filter1 == "day" ? teacher.dayName : filter1Value,
      filter2: {},
      widths: {},
    };
  }
  if (!sorted[filter1Value].filter2[filter2Value]) {
    sorted[filter1Value].filter2[filter2Value] = {
      name: filter2 == "day" ? teacher.dayName : filter2Value,
      hours: [],
    };
  }

  sorted[filter1Value].filter2[filter2Value].hours.push({
    hour: teacher.hour,
    // detailName: detailType == "day" ? teacher.dayName : detailValue,
    detailName: detailValue,
  });

  // find the max width of hour column
  if (!sorted[filter1Value].widths[teacher.hour]) {
    sorted[filter1Value].widths[teacher.hour] = detailValue.length;
  } else {
    const width = sorted[filter1Value].widths[teacher.hour];
    sorted[filter1Value].widths[teacher.hour] = Math.max(
      width,
      detailValue.length
    );
  }

  return sorted;
};

// finalSorted
// Array [
//   Object {
//     "filter1": "1",
//     "filter1Name": "ΔΕΥΤΕΡΑ",
//     "filter2": Array [
//       Object {
//         "filter2Name": "Δαβίτη",
//         "hours": Array [
//           Object {
//             "detailName": "Β1",
//             "hour": "2",
//           },
//           Object {
//             "detailName": "Β2",
//             "hour": "7",
//           },
//           Object {
//             "detailName": "Γο1",
//             "hour": "3",
//           },
//           Object {
//             "detailName": "Γο2",
//             "hour": "4",
//           },
//         ],
//       },
//     ],
//   },
// ]
