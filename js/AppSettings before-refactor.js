import React from "react";
import { TMIMATA, TEACHERS } from "../data/dummy-data";

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

export const FilterAndSortData = (filters) => {
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

  const sortedData = sortFilteredData(filteredData, filters);
  return sortedData;
};

export const filterTeacherDetails = (teacher, filters) => {
  const tmimaFilter = filters.lists.tmima;
  const dayFilter = filters.lists.day;
  const tmimaGroup = filters.tmimaGroup;
  // console.log("teacher");
  // console.log(teacher);
  const teacher_lines = teacher.filter((teacher) => {
    let tmimaCheck = true;
    let dayCheck = true;
    if (tmimaFilter.length > 0) {
      const listTmima = tmimaFilter.find(
        (tmima) => tmima.name == teacher.tmima
      );
      if (!listTmima) {
        if (!tmimaGroup) {
          tmimaCheck = false;
        } else {
          const tmimaDetails = findTmimaDetails(teacher.tmima);
          if (!tmimaDetails || tmimaDetails.type !== "OP") {
            tmimaCheck = false;
          } else {
            teacher.type = tmimaDetails.type;
            teacher.op = tmimaDetails.op;
          }
        }
      } else {
        teacher.type = listTmima.type;
        teacher.op = listTmima.op;
      }
    } else {
      const tmimaDetails = findTmimaDetails(teacher.tmima);
      if (!tmimaDetails) {
        tmimaCheck = false;
      } else {
        teacher.type = tmimaDetails.type;
        teacher.op = tmimaDetails.op;
      }
    }
    if (dayFilter.length > 0) {
      const listDay = dayFilter.find((day) => day.aa == teacher.day);
      if (!listDay) {
        dayCheck = false;
      } else {
        teacher.dayName = listDay.name;
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

let maxDetailLength = 0;
const sortFilteredData = (teachers, filters) => {
  //{"day": "5", "hour": "6", "teacher": "Δαβίτη", "tmima": "Γο2", "type": "OP",  }
  let sorted = {};
  let finalSorted = [];
  maxDetailLength = 0;
  if (filters && filters.filtersOrder) {
    const filter1 = filters.filtersOrder.filter1;
    const tmimaGroup = filters.tmimaGroup;
    let opTmimata = {};

    if (filter1 == "day" || filter1 == "tmima" || filter1 == "teacher") {
      teachers.map((teacher) => {
        if (tmimaGroup == true) {
          // to get something like that
          // "Βα2": {
          //   "details": Array [{"day": "2", "hour": "3","op": Array [], "teacher": "Καραγιάννης","tmima": "Βα2","type": "OP",}, ....]
          //   "tmimata": Array ["Γ2","Γ3","Γ1",],
          // }
          if (teacher.type == "OP") {
            if (!opTmimata[teacher.tmima])
              opTmimata[teacher.tmima] = { details: [], tmimata: [] };
            opTmimata[teacher.tmima]["details"].push(teacher);
            return false;
          }
          if (teacher.op && teacher.op.length > 0) {
            for (const opTmima of teacher.op) {
              if (opTmima == teacher.tmima) {
                continue;
              }
              if (!opTmimata[opTmima])
                opTmimata[opTmima] = { details: [], tmimata: [] };

              if (opTmimata[opTmima]["tmimata"].indexOf(teacher.tmima) < 0)
                opTmimata[opTmima]["tmimata"].push(teacher.tmima);
            }
          }
        }

        [maxDetailLength, sorted] = groupTeacherDetails(
          teacher,
          sorted,
          filters,
          "",
          maxDetailLength
        );
      });
      for (const [opTmima, { details, tmimata }] of Object.entries(opTmimata)) {
        details.map((detail) => {
          if (filters.filtersOrder.detailType == "tmima") {
            [maxDetailLength, sorted] = groupTeacherDetails(
              detail,
              sorted,
              filters,
              "",
              maxDetailLength
            );
          } else {
            tmimata.map((tmima) => {
              [maxDetailLength, sorted] = groupTeacherDetails(
                detail,
                sorted,
                filters,
                tmima,
                maxDetailLength
              );
            });
          }
        });
      }
      console.log("sorted")
      console.log(sorted)
      // group by filter2
      for (const [key, header1] of Object.entries(sorted)) {
        const filter2_lines = [];
        for (const [header2_key, header2_value] of Object.entries(header1)) {
          filter2_lines.push({
            header2Name: header2_key,
            details: header2_value,
          });
        }
        finalSorted.push({ header1: key, header2: filter2_lines });
      }

      // sort by filter1
      if (filter1 == "tmima") {
        finalSorted = sortArrayOfObjectsByProperty(finalSorted, "header1");
      }

      // console.log("finalSorted")
      // console.log(finalSorted)
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
export const SortArrayOfObjectsByProperty = sortArrayOfObjectsByProperty;

const groupTeacherDetails = (
  teacher,
  sorted,
  filters,
  mainTmima,
  maxDetailLength
) => {
  const filter1 = filters.filtersOrder.filter1;
  const filter2 = filters.filtersOrder.filter2;
  const detailType = filters.filtersOrder.detailType;

  let filter1Value = teacher[filter1];
  let filter2Value = teacher[filter2];
  let detailValue = teacher[detailType];

  if (mainTmima && mainTmima !== "") {
    if (filter1 == "tmima") filter1Value = mainTmima;
    if (filter2 == "tmima") filter2Value = mainTmima;
    if (detailType == "tmima") {
      detailValue = detailValue;
    } else {
      detailValue = teacher.tmima + " " + detailValue;
    }
  }

  if (!sorted[filter1Value]) {
    sorted[filter1Value] = {};
  }
  if (!sorted[filter1Value][filter2Value]) {
    sorted[filter1Value][filter2Value] = [];
  }
  sorted[filter1Value][filter2Value].push({
    hour: teacher.hour,
    header3: detailValue,
  });

  if (detailType == "day") {
    maxDetailLength = 9;
  } else {
    if (typeof detailValue == "object") {
      for (const detail of detailValue) {
        if (detail.length > maxDetailLength) maxDetailLength = detail.length;
      }
    } else {
      if (detailValue.length > maxDetailLength)
        maxDetailLength = detailValue.length;
    }
  }
  return [maxDetailLength, sorted];
};

export const MAX_DETAIL_LENGTH = () => maxDetailLength;
// export const MAX_DETAIL_LENGTH = maxDetailLength;
// export const SORT_FILTERED_DATA = sortFilteredData;
