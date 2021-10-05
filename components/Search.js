import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const Search = ({ navigation }) => {
  const [searchResult, setSearchResult] = React.useState([]);
  const [state, setState] = React.useState({
    searchText: "",
  });

  const _search = async (query) => {
    return fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=fddf63480aef06d3b1e3af2efd6ab4ac&query=${query}`
    )
      .then((response) => response.json())
      .then((json) => {
        setSearchResult(json.results);
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
      <View style={styles.fixToText}>
        <TextInput
          style={styles.TextInputStyle}
          placeholder="Search movie.."
          onChangeText={(text) => setState({ ...state, searchText: text })}
          value={state.searchText}
        />
        <TouchableOpacity
          style={{ margin: 20 }}
          onPress={() => _search(state.searchText)}
        >
          <FontAwesome name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={searchResult}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => itemToRender(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  TextInputStyle: {
    width: "80%",
    fontSize: 15,
    color: "#000",
    backgroundColor: "#f7f7f7",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    elevation: 5,
  },
  item: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    padding: 10,
    margin: 1,
  },

  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
    elevation: 10,
  },
  Button: {
    margin: 5,
    padding: 10,
    backgroundColor: "#45ADA8",
    borderRadius: 10,
  },
});

export default Search;
