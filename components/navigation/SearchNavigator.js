import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Review from "../Review";
import Search from "../Search";
const Stack = createStackNavigator();
const SearchNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { elevation: 1, backgroundColor: "#45ADA8" },
        title: "",
      }}
    >
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Review" component={Review} />
    </Stack.Navigator>
  );
};

export default SearchNavigator;
