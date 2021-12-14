import React, { useState, useContext, createContext } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";

import { themes } from "../constants/themes";
// const themeContextInitialState = {
//   theme: themes.theme3,
//   themeName: "theme3",
// };

// const ThemeContext = createContext(themeContextInitialState);

const ThemeTogglerButton = () => {
  // The Theme Toggler Button receives not only the theme
  // but also a toggleTheme function from the context
  console.log("ThemeTogglerButton");
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <Button
          onPress={props.toggleTheme}
          color={theme.filter3}
          title="Toggle Theme"
        />
      )}
    </ThemeContext.Consumer>
  );
};
const ThemedButton = (props) => {
  console.log("ThemedButton");
  console.log(props);

  const theme = useContext(ThemeContext);
  return (
    <Button
      title={"ThemedButton"}
      onPress={() => props.onPress()}
      color={theme.theme.filter3}
    />
  );
};

const SettingsScreen = (props) => {
  // const [theme, setTheme] = useState(themeContextInitialState);

  // console.log(ThemeContext);

  // const toggleTheme = () => {
  //   console.log("toggle");
  //   setTheme((state) => {
  //     return {
  //       ...state,
  //       theme: state.themeName == "theme2" ? themes.theme3 : themes.theme2,
  //       themeName: state.themeName == "theme2" ? "theme3" : "theme2",
  //     };
  //   });
  // };

  const Toolbar = (props) => {
    console.log("Toolbar");
    return (
      <Text style={{ paddingVertical: 30 }} onPress={() => props.changeTheme()}>
        <Text style={{ paddingVertical: 30 }}>ToolBar</Text>
        <ThemedButton onPress={props.changeTheme}>Change Theme</ThemedButton>
      </Text>
    );
  };

  return (
    <ScrollView style={styles.screenContainer}>
      {/* <ThemeContext.Provider value={theme}> */}
        <Toolbar changeTheme={props.toggleTheme} />
        <Text onPress={props.toggleTheme}>{theme.themeName}</Text>
        <Button onPress={props.toggleTheme} title={theme.themeName} />
        <Text>space</Text>
        <ThemedButton onPress={props.toggleTheme} />
          <Text>space2</Text>
          <ThemeTogglerButton />
      {/* </ThemeContext.Provider> */}
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Settings ",
    // headerLeft: () => (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       title="Menu"
    //       iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
    //       onPress={() => {
    //         navData.navigation.toggleDrawer();
    //       }}
    //     />
    //   </HeaderButtons>
    // ),
    //   headerRight: () => (
    //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //       <Item
    //         title="Preview"
    //         iconName={
    //           Platform.OS === "android" ? "md-checkmark-circle" : "ios-checkmark"
    //         }
    //         onPress={() => {
    //           displayProgram();
    //         }}
    //       />
    //     </HeaderButtons>
    //   ),
  };
};

const styles = StyleSheet.create({
  screenContainer: {
    padding: 50,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
export default SettingsScreen;
