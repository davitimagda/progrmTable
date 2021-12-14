import React, { useEffect, useState, useReducer } from "react";
import { View, Text, StyleSheet } from "react-native";

import { TEACHERS, DAYS, TMIMATA } from "../../data/dummy-data";
import ListSelectItem from "./ListSelectItem";
import { useFilters } from "../../contexts/FiltersContext";
import { useTheme } from "../../contexts/ThemeContext";
import GET_APP_LISTS from "../../js/AppSettings";
import MainButton from "../UI/MainButton";
import IonIcon from "react-native-vector-icons/Ionicons";

const initialList = (listName, initialValue, tmimaGroup) => {
  let list = [];
  if (listName == "teacher") {
    list = TEACHERS.map((t) => {
      return { name: t.name, choice: initialValue };
    });
  }
  if (listName == "day") {
    list = DAYS.map((d) => {
      return { aa: d.aa, name: d.name, choice: initialValue };
    });
  }
  if (listName == "tmima") {
    list = TMIMATA.reduce((list1, t) => {
      if (!tmimaGroup || (tmimaGroup && t.type == "GP")) {
        list1 = list1.concat({
          name: t.name,
          choice: initialValue,
          taxi: t.taxi,
          type: t.type,
          subTmimaOf: t.subTmimaOf,
        });
      }
      return list1;
    }, []);
  }
  return list;
};

function reducer(state, action) {
  switch (action.type) {
    case "init":
      let list;
      if (action.selectedList.length == 0) {
        // first time set all items as selected
        list = initialList(action.listName, true, action.tmimaGroup);
      } else {
        // set all items as not selected and then update the selected
        list = initialList(action.listName, false, action.tmimaGroup);
      }
      action.selectedList.map((selectedItem) => {
        if (selectedItem.choice == true) {
          list.find((listItem, i) => {
            if (selectedItem.name == listItem.name) {
              list[i].choice = true;
              return true;
            }
          });
        }
      });
      return list;
    case "selectAll":
      return state.map((s) => {
        s.choice = true;
        return s;
      });
    case "selectClass":
      return state.map((s) => {
        if (
          s.taxi == action.id ||
          action.id == "all" ||
          (action.id == "OP" && s.type == action.id)
        ) {
          s.choice = action.newValue;
        }
        return s;
      });

    case "toggle":
      const newState = state;
      newState[action.index].choice = !newState[action.index].choice;
      return [...newState];
    case "remove":
      // keep every item except the one we want to remove
      return state.filter((_, index) => index != action.index);
    default:
      return state;
  }
}

const SubSelectButton = ({ styles, id, text, onPress, subSelectTmima }) => {
  const subSelectStatus = subSelectTmima.find(
    (subSelect) => subSelect.id == id
  );
  let wrapperStyle = [styles.buttonWrapperStyle];
  const selected = subSelectStatus ? subSelectStatus.selected : 0;
  const total = subSelectStatus ? subSelectStatus.total : 0;
  let icon;
  if (subSelectStatus && selected == total) {
    wrapperStyle.push(styles.buttonWrapperOutlineStyle);
    icon = <IonIcon name="ios-close-circle" color="white" size={18} />;
  } else {
    icon = <IonIcon name="ios-checkmark-done" color="white" size={18} />;
  }
  return (
    <MainButton
      key={"select" + id}
      buttonStyle={[wrapperStyle]}
      buttonTextStyle={[styles.buttonSelect, { color: "white" }]}
      onPress={onPress.bind(this, "selectClass", id, selected !== total)}
    >
      <Text>
        {icon} {text}
      </Text>
    </MainButton>
  );
};

const ListSelect = (props) => {
  const listName = props.listName;
  const { filters, onFiltersChange } = useFilters();
  const [list, dispatch] = useReducer(reducer, []);
  const [subSelectTmima, setSubSelectTmima] = useState([]);
  const { colors } = useTheme();
  const styles = getStyles(colors);

  console.log("ListSelect ");

  useEffect(() => {
    if (list.length == 0) {
      dispatch({
        type: "init",
        listName: listName,
        tmimaGroup: listName == "tmima" ? filters.tmimaGroup : false,
        selectedList: filters.lists[listName],
      });
    }
  }, []);

  useEffect(() => {
    if (listName == "tmima") {
      dispatch({
        type: "init",
        listName: listName,
        tmimaGroup: listName == "tmima" ? filters.tmimaGroup : false,
        selectedList: filters.lists[listName],
      });
    }
  }, [filters.tmimaGroup]);

  useEffect(() => {
    setSubSelectTmima(() => getSubSelectTmima());

    const selected = list.filter((t) => {
      if (t.choice == true) {
        return t.name;
      }
    });

    if (selected.length == list.length) {
      filters.lists[listName] = [];
    } else {
      filters.lists[listName] = selected;
    }
    onFiltersChange(filters);
    if (props.listText) {
      props.listText(GET_APP_LISTS[listName], filters.lists[listName]);
    }
  }, [list]);

  const listHandler = (type, id, newValue) => {
    dispatch({ type: type, id: id, newValue: newValue });
    if (listName == "tmima") {
      setSubSelectTmima((prev) => (prev = getSubSelectTmima()));
    }
  };

  const getSubSelectTmima = () => {
    let tmimaTypes = [];
    let totalSelected = 0;
    let total = 0;
    list.map((item) => {
      total++;
      const id = item.type == "OP" ? item.type : item.taxi;
      let groupItem = tmimaTypes.find((group) => group.id == id);
      if (groupItem) {
        groupItem.total++;
      } else {
        groupItem = { id: id, type: item.type, total: 1, selected: 0 };
        tmimaTypes.push(groupItem);
      }
      if (item.choice == true) {
        groupItem.selected++;
        totalSelected++;
      }
    });
    tmimaTypes.push({
      id: "all",
      type: "all",
      total: total,
      selected: totalSelected,
    });
    return tmimaTypes;
  };

  const selectButtons = [
    { text: "Α", id: "Α" },
    { text: "Β", id: "Β" },
    { text: "Γ", id: "Γ" },
  ];
  if (!filters.tmimaGroup) selectButtons.push({ text: "ΟΠ", id: "OP" });

  const selectButtonWrapper = selectButtons.map((button) => {
    return (
      <SubSelectButton
        key={button.id}
        text={button.text}
        id={button.id}
        styles={styles}
        subSelectTmima={subSelectTmima}
        onPress={listHandler}
      />
    );
  });

  const listElement = (
    <View style={styles.screenContainer}>
      <View style={styles.buttonContainer}>
        <View>
          {listName == "tmima" && (
            <View style={styles.buttonsTmimataStyle}>
              {selectButtonWrapper}
            </View>
          )}
        </View>
        <SubSelectButton
          text=""
          id="all"
          styles={styles}
          subSelectTmima={subSelectTmima}
          onPress={listHandler}
        />
      </View>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1,
        }}
      />
      <View style={props.style}>
        <View style={styles.itemsContainer}>
          {list.map((item, index) => (
            <ListSelectItem
              key={index}
              item={item}
              index={index}
              listName={listName}
              dispatch={dispatch}
            />
          ))}
        </View>
      </View>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1,
        }}
      />
    </View>
  );

  return (
    <View>
      <View>{listElement}</View>
    </View>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    screenContainer: {
      justifyContent: "center",
      // alignItems: "center",
      // backgroundColor: colors.accent,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    buttonsTmimataStyle: {
      flexDirection: "row",
    },
    buttonWrapperStyle: {
      paddingVertical: 0,
      paddingHorizontal: 0,
      borderRadius: 5,
      backgroundColor: colors.primary,
      margin: 5,
      shadowColor: "black",
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      // elevation: 9,
    },
    buttonWrapperOutlineStyle: {
      borderColor: colors.primary,
      backgroundColor: colors.filter2,
    },
    buttonSelect: {
      paddingHorizontal: 10,
    },
    itemsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      flexWrap: "wrap",
      margin: 10,
      shadowColor: "black",
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 5,
    },
  });

export default ListSelect;
