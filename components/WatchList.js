import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const WatchList = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [watchlist, setwatchlist] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      _retrieveData();
    })();
  }, [isFocused]);

  const _retrieveData = async () => {
    try {
      const id = await AsyncStorage.getItem("ID");
      const session = await AsyncStorage.getItem("session");
      getWatchList(id, session);
    } catch (error) {
      alert(error);
    }
  };
  const getWatchList = async (id, session) => {
    return fetch(
      `https://api.themoviedb.org/3/account/${id}/watchlist/movies?api_key=fddf63480aef06d3b1e3af2efd6ab4ac&session_id=${session}`
    )
      .then((response) => response.json())
      .then((json) => {
        setwatchlist(json.results);
        console.log(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const itemToRender = (item) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Review", item)}
      >
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
          }}
          resizeMode="stretch"
        />
        <Text style={styles.MyText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.MyTextTitle}>Watch List</Text>
      <FlatList
        data={watchlist}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => itemToRender(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: "column",
    backgroundColor: "#f2f2f2",
  },
  MyText: {
    fontSize: 10,
    height: 50,
    fontWeight: "normal",
    color: "#000",
    bottom: 0,
    padding: 10,
    textAlign: "center",
  },

  MyTextTitle: {
    fontSize: 10,
    width: 80,
    borderRadius: 10,
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

  item: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    padding: 10,
    margin: 1,
  },
});

export default WatchList;
