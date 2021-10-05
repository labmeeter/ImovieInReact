import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Review from "../Review";
import Homepage from "../Homepage";
const Stack = createStackNavigator();
const HomePageNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { elevation: 1, backgroundColor: "#45ADA8" },
        title: "",
      }}
    >
      <Stack.Screen name="Homepage" component={Homepage} />
      <Stack.Screen name="Review" component={Review} />
    </Stack.Navigator>
  );
};

export default HomePageNavigator;
