import React, { useEffect, useReducer } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { TEACHERS, DAYS, TMIMATA } from "../../data/dummy-data";
import ListSelectItem from "./ListSelectItem";

const initialList = (listName, initialValue) => {
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
      if (t.type == "single") {
        list1 = list1.concat({ name: t.name, choice: initialValue });
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
      let list;
      if (selectedList.length == 0) {
        list = initialList(listName, true);
      } else {
        list = initialList(listName, false);

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
      }
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
  {
    /* <Text style={styles.mainHeaderTextStyle}>
Selected : {selectedNamesText()}
</Text> */
  }

  // const listElement = () => {
  // const x = [
  //   <View style={props.style}>
  //     <View style={styles.buttonContainer}>
  //       <Text
  //         key="select"
  //         style={styles.buttonSelect}
  //         onPress={() => dispatch({ type: "selectAll", action: {} })}
  //       >
  //         Όλα
  //       </Text>
  //       <Text
  //         key="deselect"
  //         style={styles.buttonSelect}
  //         onPress={() => dispatch({ type: "deselectAll", action: {} })}
  //       >
  //         Κανένα
  //       </Text>
  //     </View>
  //     <View style={styles.checkboxContainer}>
  //       {list.map((item, index) => (
  //         <ListSelectItem
  //           key={index}
  //           item={item}
  //           index={index}
  //           dispatch={dispatch}
  //         />
  //       ))}
  //     </View>
  //   </View>,
  // ];
  // }
  const listElement = (
    <View style={props.style}>
      <View style={styles.buttonContainer}>
        <Text
          key="select"
          style={styles.buttonSelect}
          onPress={() => dispatch({ type: "selectAll", action: {} })}
        >
          Όλα
        </Text>
        <Text
          key="deselect"
          style={styles.buttonSelect}
          onPress={() => dispatch({ type: "deselectAll", action: {} })}
        >
          Κανένα
        </Text>
      </View>
      <View style={styles.checkboxContainer}>
        {list.map((item, index) => (
          <ListSelectItem
            key={index}
            item={item}
            index={index}
            dispatch={dispatch}
          />
        ))}
      </View>
    </View>
  );
  return (
    <View>
      {props.modal == true ? (
        <View
          transparent={true}
          animationType={"none"}
          // visible={loading}
          onRequestClose={() => {
            console.log("close modal");
            props.modalClose();
          }}
        >
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>{listElement}</View>
          </View>
        </View>
      ) : (
        <View>{listElement}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#99999999",
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    // height: 100,
    // width: 100,
    borderRadius: 10,
    // display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
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
    justifyContent: "space-around",
    flexWrap: "wrap",
    // width: "100%",
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
});

export default ListSelect;
