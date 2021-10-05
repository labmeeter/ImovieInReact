import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Review from "../Review";
import Homepage from "../Homepage";
import WatchList from "../WatchList";
const Stack = createStackNavigator();
const WatchlistNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { elevation: 1, backgroundColor: "#45ADA8" },
        title: "",
      }}
    >
      <Stack.Screen name="WatchList" component={WatchList} />
      <Stack.Screen name="Review" component={Review} />
    </Stack.Navigator>
  );
};

export default WatchlistNavigator;
