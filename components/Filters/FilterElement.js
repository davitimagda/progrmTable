import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useFilters } from "../../contexts/FiltersContext";
import { useTheme } from "../../contexts/ThemeContext";
import { GET_APP_LISTS } from "../../js/AppSettings";

const FilterElement = (props) => {
  const { colors } = useTheme();
  const [listVisible, setListVisible] = useState(false);

  const listName = props.listName;
  const { filters } = useFilters();
  const listData = filters.lists[listName];
  return (
    <View style={styles.listContainer}>
      <TouchableOpacity
        style={styles.listHeader}
        onPress={() => {
          setListVisible((prev) => !prev);
        }}
      >
        <View>
          <Text style={[styles.listHeader, { color: colors.textColor }]}>
            {GET_APP_LISTS[listName].labels}
          </Text>
          <Text style={[styles.listSelections, { color: colors.textColor }]}>
            {props.selectedText &&
              props.selectedText(GET_APP_LISTS[listName], listData)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    margin: 10,
  },
  listHeader: {
    alignItems: "center",
    textAlign: "center",
    fontFamily: "open-sans-bold",
  },
  listSelections: {
    textAlign: "center",
    fontFamily: "open-sans",
  },
});

export default FilterElement;
