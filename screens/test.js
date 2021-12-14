// https://ibjects.medium.com/the-simplest-implementation-of-context-api-in-react-native-94f749187873
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Screen1 from "./src/Screens/Screen1";
import Screen2 from "./src/Screens/Screen2";
import Screen3 from "./src/Screens/Screen3";
import Screen4 from "./src/Screens/Screen4";
import Screen5 from "./src/Screens/Screen5";
import Screen6 from "./src/Screens/Screen6";
import Screen7 from "./src/Screens/Screen7";
import Screen8 from "./src/Screens/Screen8";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function StackNavA() {
  //Context 1
  const context1InitialState = {
    fullName: null,
    destinationCountry: null,
    departureCountry: null,
  };
  const [passengerInfo, setPassengerInfo] = useState(context1InitialState);
  function setFullName(fullName) {
    const newState = { ...passengerInfo, fullName };
    setPassengerInfo(newState);
  }
  function setDestinationCountry(destinationCountry) {
    const newState = { ...passengerInfo, destinationCountry };
    setPassengerInfo(newState);
  }
  function setDepartureCountry(departureCountry) {
    const newState = { ...passengerInfo, departureCountry };
    setPassengerInfo(newState);
  }
  const context1Setters = {
    setFullName,
    setDestinationCountry,
    setDepartureCountry,
  };
  return (
    <Context1.Provider value={{ ...passengerInfo, ...context1Setters }}>
      <Stack.Navigator>
        <Stack.Screen name="Screen 1" component={Screen1} />
        <Stack.Screen name="Screen 2" component={Screen2} />
        <Stack.Screen name="Screen 3" component={Screen3} />
        <Stack.Screen name="Screen 4" component={Screen4} />
      </Stack.Navigator>
    </Context1.Provider>
  );
}

function StackNavB() {
  //Context 2
  const context2InitialState = {
    pnrNumber: null,
    totalBagsChecked: null,
    comments: null,
  };
  const [passengerCheckInInfo, setPassengerCheckInInfo] =
    useState(context2InitialState);
  function setPNRNumber(pnrNumber) {
    const newState = { ...passengerCheckInInfo, pnrNumber };
    setPassengerCheckInInfo(newState);
  }
  function setTotalBagsChecked(totalBagsChecked) {
    const newState = { ...passengerCheckInInfo, totalBagsChecked };
    setPassengerCheckInInfo(newState);
  }
  function setComments(comments) {
    const newState = { ...passengerCheckInInfo, comments };
    setPassengerCheckInInfo(newState);
  }
  const context2Setters = {
    setPNRNumber,
    setTotalBagsChecked,
    setComments,
  };
  return (
    <Context2.Provider value={{ ...passengerCheckInInfo, ...context2Setters }}>
      <Stack.Navigator>
        <Stack.Screen name="Screen 5" component={Screen5} />
        <Stack.Screen name="Screen 6" component={Screen6} />
        <Stack.Screen name="Screen 7" component={Screen7} />
        <Stack.Screen name="Screen 8" component={Screen8} />
      </Stack.Navigator>
    </Context2.Provider>
  );
}
function App(props) {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="StackNav A" component={StackNavA} />
        <Tab.Screen name="StackNav B" component={StackNavB} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;

// Screen1

import React, { useContext } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { Context1 } from "../../App";
function Screen2({ navigation }) {
  const context = useContext(Context1);
  return (
    <View>
      <Text>Enter your destination country</Text>
      <TextInput
        placeholder={"Destination Country"}
        value={context.destinationCountry}
        onChangeText={(dest) => {
          context.setDestinationCountry(dest);
        }}
      />
      <Button
        title={"NEXT"}
        onPress={() => {
          navigation.navigate("Screen 3");
        }}
      />
    </View>
  );
}
export default Screen2;

// Screen 3
import React, { useContext } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { Context1 } from "../../App";
function Screen3({ navigation }) {
  const context = useContext(Context1);
  return (
    <View>
      <Text>Enter your departure country</Text>
      <TextInput
        placeholder={"Departure Country"}
        value={context.departureCountry}
        onChangeText={(depart) => {
          context.setDepartureCountry(depart);
        }}
      />
      <Button
        title={"NEXT"}
        onPress={() => {
          navigation.navigate("Screen 4");
        }}
      />
    </View>
  );
}
export default Screen3;

// Screen 4
import React, { useContext } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { Context1 } from "../../App";
function Screen4({ navigation }) {
  const context = useContext(Context1);
  const { fullName, destinationCountry, departureCountry } = context;
  return (
    <View>
      <Text>Departure country</Text>
      <Text>{departureCountry}</Text>
      <Text>Destination country</Text>
      <Text>{destinationCountry}</Text>
      <Text>Passenger Name</Text>
      <Text>{fullName}</Text>
      <Text>Is the above info correct?</Text>
      <Button
        title={"YES"}
        onPress={() => {
          alert("Yay everything worked well!");
          navigation.popToTop();
        }}
      />
      <Button
        title={"NO"}
        onPress={() => {
          alert("It's okay you can enter the information again");
          navigation.popToTop();
        }}
      />
    </View>
  );
}
export default Screen4;
