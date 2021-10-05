import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./components/Login";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./components/uitls/context";
import Homepage from "./components/Homepage";
import TabNavigator from "./components/TabNavigator";
const App = () => {
  const [userState, setUserState] = React.useState(null);

  const authContext = React.useMemo(() => ({
    userHomePage: () => {
      setUserState("Homepage");
    },
  }));
  /*React.useEffect(() => {
    setTimeout(() => {}, 1000);
  }, []);
*/
  if (userState === "Homepage") {
    return (
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
