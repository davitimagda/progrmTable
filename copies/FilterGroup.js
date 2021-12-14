import React from "react";
import { View, StyleSheet } from "react-native";
import FilterElement from "./FilterElement";
import { GET_DEFAULT_ORDER } from "../../js/AppSettings";

const FilterGroup = (props) => {
  const defaultOrder = GET_DEFAULT_ORDER(props.filter1);
  return (
    <View style={[props.style]}>
      <View key={defaultOrder.filter2} style={styles.filter2Style}>
        <FilterElement listName={defaultOrder.filter2} />
        {/* </View>
      <View key={defaultOrder.detailType} > */}
        <FilterElement listName={defaultOrder.detailType} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default FilterGroup;
