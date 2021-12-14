import React from "react";
import { Text } from "react-native";
import { DAYS, TEACHERS, TMIMATA } from "../../data/dummy-data";
const getDefaultOrder = (filter1) => {
  let filter2 = "";
  let detailType = "";
  if (filter1 == "day") {
    filter2 = "teacher";
    detailType = "tmima";
  }

  if (filter1 == "tmima") {
    filter2 = "day";
    detailType = "teacher";
  }

  if (filter1 == "teacher") {
    filter2 = "day";
    detailType = "tmima";
  }
  return {
    filter1: filter1,
    filter2: filter2,
    detailType: detailType,
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

const switches = {
  day: { label: "Ημέρα ", returnIfTrue: "day" },
  teacher: { label: "Καθηγητή ", returnIfTrue: "teacher" },
  tmima: { label: "Τμήμα ", returnIfTrue: "tmima" },
};

const sortFilteredData = (teachers, filters) => {
  let sorted = {};
  const finalSorted = [];
  if (filters && filters.filtersOrder) {
    const filter1 = filters.filtersOrder.filter1;
    const filter2 = filters.filtersOrder.filter2;
    let filter2Value = "";
    let detailValue = "";

    if (filter1 == "day" || filter1 == "tmima" || filter1 == "teacher") {
      teachers.map((t) => {
        if (filter1 == "day") {
          if (filter2 == "teacher") {
            filter2Value = t.teacher;
            detailValue = t.tmima;
          } else {
            filter2Value = t.tmima;
            detailValue = t.teacher;
          }

          if (!sorted[t.day]) {
            sorted[t.day] = {};
          }
          if (!sorted[t.day][filter2Value]) sorted[t.day][filter2Value] = [];
          sorted[t.day][filter2Value].push({
            hour: t.hour,
            header3: detailValue,
          });
        }
        if (filter1 == "tmima") {
          filter2Value = filter2 == "day" ? t.day : t.teacher;
          detailValue = filter2 == "day" ? t.teacher : t.day;

          if (!sorted[t.tmima]) {
            sorted[t.tmima] = {};
          }
          if (!sorted[t.tmima][filter2Value]) {
            sorted[t.tmima][filter2Value] = [];
          }
          sorted[t.tmima][filter2Value].push({
            hour: t.hour,
            header3: detailValue,
          });
        }
        if (filter1 == "teacher") {
          if (!sorted[t.teacher]) {
            sorted[t.teacher] = {};
          }
          if (filter2 == "day") {
            if (!sorted[t.teacher][t.day]) sorted[t.teacher][t.day] = [];
            sorted[t.teacher][t.day].push({ hour: t.hour, header3: t.tmima });
          }
          if (filter2 == "tmima") {
            if (!sorted[t.teacher][t.tmima]) sorted[t.teacher][t.tmima] = [];
            sorted[t.teacher][t.tmima].push({ hour: t.hour, header3: t.day });
          }
        }
      });

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
      return finalSorted;
    }
  }

  // sorted = Object.keys(sorted)
  //   .sort()
  //   .reduce((obj, key) => {
  //     obj[key] = sorted[key];
  //     return obj;
  //   }, {});
  return sorted;
};

export const GET_DETAIL_TYPE = getDetailType;
export const GET_DEFAULT_ORDER = getDefaultOrder;
export const SWITCHES = switches;
export const SORT_FILTERED_DATA = sortFilteredData;

import DayProgram from "../../components/DayProgram";
let oldPreview = (filter1, displayName, tmimaGroup, listFilters) => {
  let selectedData;

  if (filter1 == "day") {
    selectedData =
      displayName === "all"
        ? DAYS
        : DAYS.filter((day) => day.name == displayName);
  }

  if (filter1 == "tmima") {
    // const filterGroup = props.route.params.tmimaGroupFilter;
    // const tmimaGroup = filterGroup ? "group" : "single";
    selectedData =
      displayName === "all"
        ? TMIMATA.filter((tmima) => tmima.type == tmimaGroup)
        : TMIMATA.filter(
            (tmima) => tmima.name == displayName && tmima.type == tmimaGroup
          );
  }
  if (filter1 == "teacher") {
    selectedData =
      displayName === "all"
        ? TEACHERS
        : TEACHERS.filter((teacher) => teacher.name == displayName);
    // selectedData.sort((a, b) =>
    //   a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    // );
  }
  oldPreview =
    selectedData.length > 0 ? (
      selectedData.map((data) => {
        const value = (
          <DayProgram
            key={data.name + (data.type ? data.type : "")}
            data={data}
            programType={filter1}
            selectedOption={displayName}
            listFilters={listFilters}
          />
        );
        return value;
      })
    ) : (
      <Text>Nothing selected</Text>
    );
};

export const OLD_PREVIEW = oldPreview;
