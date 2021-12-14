import React from "react";
import { View, StyleSheet } from "react-native";
import FilterElement from "./FilterElement";

const FilterGroup = (props) => {
  
  const group = [];
  for (let index = 0; index < props.filterLists.length; index++) {
    const listName = props.filterLists[index];
    // const listData = props.listsData[index];
    const listData = props.listsData[listName];

    group.push(
      <View key={listName} style={props.style}>
        <FilterElement
          listName={listName}
          listData={listData}
          updateList={props.updateList.bind(this, listName)}
        />
      </View>
    );
  }

  return <View style={[props.style]}>{group}</View>;
};

const styles = StyleSheet.create({});

export default FilterGroup;
