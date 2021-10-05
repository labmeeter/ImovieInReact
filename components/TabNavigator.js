import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import HomePageNavigator from "./navigation/HomePageNavigator";
import SearchNavigator from "./navigation/SearchNavigator";
import WatchlistNavigator from "./navigation/WatchlistNavigator";

//npm install @react-navigation/native
//expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
//npm install @react-navigation/bottom-tabs
//npm install @react-navigation/stack

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomePageNavigator"
        component={HomePageNavigator}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#242424" : "#242424",
                marginBottom: 5,
                fontSize: 10,
              }}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="home"
              size={24}
              color={focused ? "#45ADA8" : "#242424"}
            />
          ),
        }}
      />

      <Tab.Screen
        name="SearchNavigator"
        component={SearchNavigator}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#242424" : "#242424",
                marginBottom: 5,
                fontSize: 10,
              }}
            >
              Search
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="search"
              size={24}
              color={focused ? "#45ADA8" : "#242424"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="WatchlistNavigator"
        component={WatchlistNavigator}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#242424" : "#242424",
                marginBottom: 5,
                fontSize: 10,
              }}
            >
              Watchlist
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="list"
              size={24}
              color={focused ? "#45ADA8" : "#242424"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
