import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../contexts/ThemeContext";
import { useFilters } from "../contexts/FiltersContext";
import { GET_APP_LISTS } from "../js/AppSettings";

import HomeScreen, {
  screenOptions as homeScreenOptions,
} from "../screens/HomeScreen";
import FilterScreen, {
  screenOptions as filterScreenOptions,
} from "../screens/FilterScreen";
import AddFiltersScreen, {
  screenOptions as addFiltersScreenOptions,
} from "../screens/AddFiltersScreen";
import ProgramDisplayScreen, {
  screenOptions as programDisplayScreenOptions,
} from "../screens/ProgramDisplayScreen";
import SettingsScreen, {
  screenOptions as settingScreenOptions,
} from "../screens/SettingsScreen";

let Colors;

const defaultNavOptions = () => {
  const theme = useTheme();
  Colors = theme.colors;
  return {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      // marginTop : 10,
      // paddingTop: 100,
    },
    headerTitleStyle: {
      fontFamily: "open-sans-bold",
    },
    headerBackTitleStyle: {
      fontFamily: "open-sans",
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  };
};

const HomeStack = createNativeStackNavigator();
const HomeStackScreen = (props) => {
  return (
    <HomeStack.Navigator screenOptions={defaultNavOptions()}>
      <HomeStack.Screen
        name="StackHome"
        component={HomeScreen}
        options={homeScreenOptions}
      />
      <HomeStack.Screen
        name="Filter"
        component={FilterScreen}
        options={filterScreenOptions}
      />
      <HomeStack.Screen
        name="AddFilters"
        component={TopTabNavigator}
        options={addFiltersScreenOptions}
      />
      <HomeStack.Screen
        name="ProgramDisplay"
        component={ProgramDisplayScreen}
        options={programDisplayScreenOptions}
      />
    </HomeStack.Navigator>
  );
};

const SettingsStack = createNativeStackNavigator();

const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: true }}>
      <SettingsStack.Screen
        name="TabSettings2"
        component={SettingsScreen}
        options={settingScreenOptions}
      />
    </SettingsStack.Navigator>
  );
};

function MyTabBar({ state, descriptors, navigation, position }) {
  const theme = useTheme();
  Colors = theme.colors;
  return (
    <View style={{ flexDirection: "row", paddingTop: 20 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };
        // modify inputRange for custom behavior
        const inputRange = state.routes.map((_, i) => i);
        {
          /* const opacity = Animated.interpolate(position, {
           inputRange,
           outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
         }); */
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              backgroundColor: Colors.filter2,
              height: 40,
              paddingVertical: 15,
            }}
          >
            <Animated.Text key={label} style={{ color: Colors.filter3 }}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const TopTab = createMaterialTopTabNavigator();
const TopTabNavigator = (props) => {
  const theme = useTheme();
  Colors = theme.colors;
  const { filters } = useFilters();
  const filter1 = filters.filtersOrder.filter1;
  const filter2 = filters.filtersOrder.filter2;
  const detailType = filters.filtersOrder.detailType;
  return (
    <TopTab.Navigator
      tabBarPosition="top"
      style={{ backgroundColor: Colors.accent, color: "white" }}
      tabBarActiveTintColor={Colors.filter2}
      tabBarInactiveTintColor={Colors.filter1}
      // tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        // tabBarLabelStyle: { color: "white" },
        tabBarStyle: { backgroundColor: Colors.filter1 },
        tabBarActiveTintColor: Colors.filter2,
        tabBarInactiveTintColor: Colors.filter3,
        tabBarPressColor: "#dddddd",
        tabBarItemStyle: {
          // borderBottomWidth: 2,
          height: 40,
          // backgroundColor: Colors.filter1,
        },
      }}
    >
      <TopTab.Screen
        name={filter2}
        component={AddFiltersScreen}
        initialParams={{ filter1: filter1, type: filter2 }}
        options={{
          title: "filter2",
          tabBarLabel: GET_APP_LISTS[filter2].labels,
          params: { type: "filter2" },
          // tabBarItemStyle: { borderBottomWidth: 2 },
        }}
      />
      <TopTab.Screen
        name={detailType}
        component={AddFiltersScreen}
        initialParams={{ filter1: filter1, type: detailType }}
        options={
          ({ route }) => {
            return { title: GET_APP_LISTS[detailType].labels };
          }
          // )
        }
      />
    </TopTab.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();
const MainTabNavigator = () => {
  const theme = useTheme();
  Colors = theme.colors;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarItemStyle: {
          width: 100,
          // backgroundColor: Colors.accent,
          borderLeftWidth: 1,
          borderLeftWidth: 3,
        },
        tabIndicatorStyle: { backgroundColor: "blue", width: 100 },
        // tabBarActiveTintColor: Colors.filter3,
      }}
      activeColor={Colors.filter2}
      inActiveColor={Colors.filter3}
      barStyle={{ backgroundColor: Colors.primary }}
      // activeColor="#f0edf6"
      // inactiveColor="#3e2465"
      // barStyle={{ backgroundColor: "#694fad" }}
      shifting={true}
      navigationOptions={
        {
          // tabBarStyle: { backgroundColor: Colors.filter1 },
        }
      }
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarActiveTintColor: Colors.filter3,
          // tabBarIcon: (tab) => {
          //   return <Ionicons name="ios-home" size={25} color={tab.color} />;
          // },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={25} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsStackScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// export default HomeStackScreen;
export default MainTabNavigator;
// export default TopTabNavigator;
