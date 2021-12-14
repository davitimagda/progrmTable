import React from "react";
import { View, StyleSheet } from "react-native";
import SwitchElement from "./SwitchElement";
import { SWITCHES_GROUP } from "../../js/AppSettings";

const SwitchGroup = (props) => {
  const switches = SWITCHES_GROUP(props.filter1).map((sw) => {
    const value = props.filter2 == sw.listName ? true : false;
    return (
      <SwitchElement
        key={sw.details.label}
        label={"Ανά "+sw.details.label}
        onValueChange={() => updateSwitch(sw.listName)}
        value={value}
      />
    );
  });

  const updateSwitch = (listName) => {
    props.onValueChange(listName);
  };

  return <View style={[props.style]}>{switches}</View>;
};

const styles = StyleSheet.create({});

export default SwitchGroup;
