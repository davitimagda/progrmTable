import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  View,
  Text,
  CheckBox,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { TEACHERS, DAYS, TMIMATA } from "../data/dummy-data";
import TmimataListItem from "./epilogiTmimaton/TmimataListItem";

import Card from "./UI/Card";

const initialList = (listName) => {
  let list = [];
  if (listName == "teachers") {
    list = TEACHERS.map((t) => {
      return { name: t.name, choice: false };
    });
  }
  if (listName == "days") {
    list = DAYS.map((d) => {
      return { aa: d.aa, name: d.name, choice: false };
    });
  }
  if (listName == "tmimata") {
    list = TMIMATA.reduce((list1, t) => {
      if (t.type == "single") {
        list1 = list1.concat({ name: t.name, choice: false });
      }
      return list1;
    }, []);
  }
  return list;
};

function reducer(state, action) {
  switch (action.type) {
    case "init":
      return action.list;
    case "selectAll":
      return state.map((s) => {
        s.choice = true;
        return s;
      });
    case "deselectAll":
      return state.map((s) => {
        s.choice = false;
        return s;
      });
    case "add":
      return [...state, { id: state.length, name: action.name }];
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

const ListSelect = (props) => {
  const listName = props.listName;
  const selectedList = props.selectedList;
  const [list, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    if (list.length == 0) {
      const list = initialList(listName);
      selectedList.map((s) => {
        if (s.choice == true) {
          list.find((l, i) => {
            if (s.name == l.name) {
              list[i].choice = true;
              return true;
            }
          });
        }
      });
      dispatch({ type: "init", list: list });
    }
  }, []);

  const selectedNamesText = () => {
    return list
      .filter((t) => {
        if (t.choice == true) {
          return t.name;
        }
      })
      .map((t) => t.name)
      .join(", ");
  };

  useEffect(() => {
    props.updateList(() => {
      const selected = list.filter((t) => {
        if (t.choice == true) {
          return t.name;
        }
      });
      if (selected.length == list.length) {
        return [];
      } else {
        return selected;
      }
    });
  }, [list]);

  return (
    <Card style={styles.cardContainer}>
      <View>
        {/* <Text style={styles.mainHeaderTextStyle}>
          Selected : {selectedNamesText()}
        </Text> */}
        <View style={styles.buttonContainer}>
          <Text
            style={styles.buttonSelect}
            onPress={() => dispatch({ type: "selectAll", action: {} })}
          >
            Όλα
          </Text>
          <Text
            style={styles.buttonSelect}
            onPress={() => dispatch({ type: "deselectAll", action: {} })}
          >
            Κανένα
          </Text>
        </View>
        <View style={styles.checkboxContainer}>
          {list.map((item, index) => (
            <TmimataListItem item={item} index={index} dispatch={dispatch} />
          ))}
          {/* {list.map((item, index) => {
            return (
              <View key={index} style={styles.checkboxItem}>
                <CheckBox
                  value={item.choice}
                  onValueChange={() =>
                    dispatch({ type: "toggle", index: index })
                  }
                  style={styles.checkbox}
                ></CheckBox>
                <Text style={styles.label}>{item.name}</Text>
              </View>
            );
          })} */}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    // flex:1,
    marginVertical: 6,
    marginHorizontal: 10,
    width: "95%",
    maxWidth: 500,
    backgroundColor: "white",
    padding: 8,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonSelect: {
    color: "blue",
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
    marginBottom: 3,
  },
  checkboxItem: {
    flexDirection: "row",
    width: "48%",
    marginBottom: 3,
    marginHorizontal: 3,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 4,
  },
  card: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
});

export default ListSelect;
