import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./uitls/context";

const Login = () => {
  const { userHomePage } = React.useContext(AuthContext);
  const [requestToken, setRequestToken] = React.useState("");
  const [expiryAt, setExpiryAt] = React.useState("");
  const [state, setState] = React.useState({
    email: "",
    password: "",
    result: [],
    selected: {},
  });

  React.useEffect(() => {
    _getRequestToken();
  }, []);

  const _storeSession = async (expiration, request_token, session) => {
    console.log(expiration, request_token);
    try {
      await AsyncStorage.setItem("expiry", expiration);
      await AsyncStorage.setItem("requestToken", request_token);
      await AsyncStorage.setItem("session", session);
    } catch (error) {
      alert("issue storing the data");
    }
  };
  const _getRequestToken = async () => {
    return fetch(
      "https://api.themoviedb.org/3/authentication/token/new?api_key=fddf63480aef06d3b1e3af2efd6ab4ac"
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.success == true) {
          setRequestToken(json.request_token);
          setExpiryAt(json.expires_at);
        } else {
          alert("invalid session");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const _getSession = async () => {
    var data = new FormData();
    data.append("request_token", requestToken);
    try {
      return fetch(
        "https://api.themoviedb.org/3/authentication/session/new?api_key=fddf63480aef06d3b1e3af2efd6ab4ac",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          body: data,
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          _storeSession(expiryAt, requestToken, responseJson.session_id);
          userHomePage();
        })
        .catch((error) => {
          console.log(error);
          alert("Connection problem, please check your internet connection.");
        });
    } catch (e) {
      console.log(e);
    }
  };

  const _logIn = async () => {
    if (!state.email === "" || !state.password === "") {
      alert("Please enter your email and password");
    } else {
      var data = new FormData();
      data.append("username", "aikho_20");
      data.append("password", "mr.aikho201996");
      data.append("request_token", requestToken);

      try {
        return fetch(
          "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=fddf63480aef06d3b1e3af2efd6ab4ac",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
            body: data,
          }
        )
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.success === true) {
              _getSession();
              console.log(responseJson);
            } else {
              alert(responseJson.status_message);
            }
          })
          .catch((error) => {
            console.log(error);
            alert("Connection problem, please check your internet connection.");
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.MyText}>Login</Text>
      <TextInput
        style={styles.TextInputStyle}
        placeholder="Email"
        onChangeText={(text) => setState({ ...state, email: text })}
        value={state.email}
      />
      <TextInput
        style={styles.TextInputStyle}
        placeholder="Password"
        onChangeText={(text) => setState({ ...state, password: text })}
        value={state.password}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.ButtonStyle}
        onPress={() => {
          _logIn();
        }}
      >
        <Text style={{ alignContent: "center" }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  MyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },

  TextInputStyle: {
    width: "90%",
    fontSize: 15,
    color: "#000",
    backgroundColor: "#f7f7f7",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    elevation: 5,
  },

  ButtonStyle: {
    fontSize: 20,
    backgroundColor: "#45ADA8",
    padding: 10,
    alignItems: "center",
    width: 250,
    borderRadius: 10,
    margin: 10,
  },
});

export default Login;
