import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import ListSelect from "./ListSelect";
import Card from "../UI/Card";

const DaysListText = ({ listData }) => {
  const msg =
    listData.length > 0 ? listData.map((day) => day.name).join(", ") : "Όλες";
  return (
    <Card>
      <Text>Ημέρες : {msg}</Text>
    </Card>
  );
};
const TmimataListText = ({ listData }) => {
  const msg =
    listData.length > 0
      ? listData.map((tmima) => tmima.name).join(", ")
      : "Όλα";
  return <Text>Τμήματα : {msg}</Text>;
};
const TeachersListText = ({ listData }) => {
  const msg =
    listData.length > 0
      ? listData.map((teacher) => teacher.name).join(", ")
      : "Όλοι";
  return <Text>Καθηγητές : {msg}</Text>;
};

const FilterElement = (props) => {
  const [listVisible, setListVisible] = useState(false);

  const listName = props.listName;
  const listData = props.listData;
  const updateList = props.updateList;
  return (
    <View>
      <Text
        onPress={() => {
          setListVisible((prev) => !prev);
        }}
      >
        {listName == "day" && <DaysListText listData={listData} />}
        {listName == "tmima" && <TmimataListText listData={listData} />}
        {listName == "teacher" && <TeachersListText listData={listData} />}
      </Text>
      {listVisible && (
        <ListSelect
          // style={props.style}
          listName={listName}
          updateList={updateList}
          selectedList={listData}
          // modal={true}
          // modalClose={setListVisible.bind(this, (prev) => !prev)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
export default FilterElement;
