import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Homepage = ({ navigation }) => {
  const [popular, setPopular] = React.useState([]);
  const [topRated, setTopRated] = React.useState([]);
  const [upcoming, setUpComing] = React.useState([]);
  const [accountID, setAccountID] = React.useState("");
  const [session, setSession] = React.useState("");
  React.useEffect(() => {
    getPopularMovies();
  }, []);

  const _retrieveData = async () => {
    try {
      const session = await AsyncStorage.getItem("session");
      setSession(session);
      getAccountDetails(session);
    } catch (error) {
      alert(error);
    }
  };

  const _storeID = async (ID) => {
    try {
      await AsyncStorage.setItem("ID", ID);
    } catch (error) {
      alert("issue storing the data");
    }
  };

  const getAccountDetails = async (session) => {
    return fetch(
      `https://api.themoviedb.org/3/account?api_key=fddf63480aef06d3b1e3af2efd6ab4ac&session_id=${session}`
    )
      .then((response) => response.json())
      .then((json) => {
        _storeID(JSON.stringify(json.id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getPopularMovies = async () => {
    return fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=fddf63480aef06d3b1e3af2efd6ab4ac"
    )
      .then((response) => response.json())
      .then((json) => {
        setPopular(json.results);
        getTopRatedMovies();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getTopRatedMovies = async () => {
    return fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=fddf63480aef06d3b1e3af2efd6ab4ac"
    )
      .then((response) => response.json())
      .then((json) => {
        setTopRated(json.results);
        getUpComingMovies();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getUpComingMovies = async () => {
    return fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=fddf63480aef06d3b1e3af2efd6ab4ac"
    )
      .then((response) => response.json())
      .then((json) => {
        setUpComing(json.results);
        _retrieveData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const itemToRender = (item) => {
    return (
      <View style={styles.FlatList}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Review", item, {
              SESSION: session,
              ID: accountID,
            })
          }
        >
          <Image
            style={{ width: 100, height: 150 }}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
            }}
            resizeMode="contain"
          />
          <Text style={styles.MyText}> {item.original_title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 50,
            color: "#242424",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          IMOVIE
        </Text>

        <Text style={styles.MyTextTitle}>Popular</Text>
        <View style={styles.movieContainer}>
          <FlatList
            data={popular}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => itemToRender(item)}
          />
        </View>
        <Text style={styles.MyTextTitle}>Top Rated</Text>
        <View style={styles.movieContainer}>
          <FlatList
            data={topRated}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => itemToRender(item)}
          />
        </View>
        <Text style={styles.MyTextTitle}>Up coming</Text>
        <View style={styles.movieContainer}>
          <FlatList
            data={upcoming}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => itemToRender(item)}
          />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  MyText: {
    fontSize: 10,
    height: 50,
    fontWeight: "normal",
    color: "#fff",
    backgroundColor: "#45ADA8",
    bottom: 0,
    padding: 10,
  },

  MyTextTitle: {
    fontSize: 10,
    width: 80,
    borderRadius: 100,
    fontWeight: "normal",
    color: "#fff",
    backgroundColor: "#242424",
    bottom: 0,
    padding: 5,
    margin: 5,
    textAlign: "center",
  },

  movieContainer: {
    width: "100%",
    height: 200,
  },

  FlatList: {
    height: 150,
    width: 100,
    margin: 5,
    elevation: 10,
    borderRadius: 10,
  },

  ButtonStyle: {
    fontSize: 20,
    backgroundColor: "#6495ed",
    padding: 10,
    alignItems: "center",
    width: 250,
    borderRadius: 100,
    margin: 10,
  },
});

export default Homepage;
