import React from "react";
import { View, StyleSheet } from "react-native";
import SwitchElement from "./SwitchElement";
import { SWITCHES } from "../../js/AppSettings.js/AppSettings";

const SwitchGroup = (props) => {
  const switches = props.switches.map((switchItem) => {
    const switch_settings = SWITCHES[switchItem];
    const value = props.filter2 == switch_settings.returnIfTrue ? true : false;
    return (
      <SwitchElement
        key={switch_settings.label}
        label={switch_settings.label}
        onValueChange={() => updateSwitch(switch_settings.returnIfTrue)}
        value={value}
      />
    );
  });

  const updateSwitch = (returnIfTrue) => {
    props.onValueChange(returnIfTrue);
  };

  return <View style={[styles.card, props.style]}>{switches}</View>;
};

const styles = StyleSheet.create({});

export default SwitchGroup;
