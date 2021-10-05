import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Rating from "react-native-easy-rating";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Review = ({ route }) => {
  const [rating, setRating] = React.useState("");
  const [session, setSession] = React.useState("");
  const [id, setId] = React.useState("");
  const [finalRating, setFinalRating] = React.useState("");
  const [reviews, setReviews] = React.useState([]);
  React.useEffect(() => {
    getReviews();
    _retrieveData();
  }, []);

  const _retrieveData = async () => {
    try {
      const session = await AsyncStorage.getItem("session");
      const id = await AsyncStorage.getItem("ID");
      setSession(session);
      setId(id);
    } catch (error) {
      alert(error);
    }
  };
  const _submitRating = async (rating) => {
    console.log(rating);

    if (rating === 1) {
      setFinalRating(2.0);
      console.log(finalRating);
    }
    if (rating === 2) {
      setFinalRating(4.0);
      console.log(finalRating);
    }
    if (rating === 3) {
      setFinalRating(6.0);
      console.log(finalRating);
    }
    if (rating === 4) {
      setFinalRating(8.0);
      console.log(finalRating);
    }
    if (rating === 5) {
      setFinalRating(10.0);
      console.log(finalRating);
    }
    var data = new FormData();
    data.append("value", finalRating);

    try {
      return fetch(
        `https://api.themoviedb.org/3/movie/${route.params.id}}/rating?api_key=fddf63480aef06d3b1e3af2efd6ab4ac&session_id=${session}`,
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
          alert(responseJson.status_message);
        })
        .catch((error) => {
          console.log(error);
          alert("Connection problem, please check your internet connection.");
        });
    } catch (e) {
      console.log(e);
    }
  };
  const _deleteRating = async () => {
    try {
      return fetch(
        `https://api.themoviedb.org/3/movie/${route.params.id}}/rating?api_key=fddf63480aef06d3b1e3af2efd6ab4ac&session_id=${session}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          alert(responseJson.status_message);
          setRating("");
        })
        .catch((error) => {
          console.log(error);
          alert("Connection problem, please check your internet connection.");
        });
    } catch (e) {
      console.log(e);
    }
  };

  const _addToWatchlist = async (session, id) => {
    var data = new FormData();
    data.append("media_type", "movie");
    data.append("media_id", route.params.id);
    data.append("watchlist", "true");

    try {
      return fetch(
        `https://api.themoviedb.org/3/account/${id}/watchlist?api_key=fddf63480aef06d3b1e3af2efd6ab4ac&session_id=${session}`,
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
          alert("Successfully added");
        })
        .catch((error) => {
          console.log(error);
          alert("Connection problem, please check your internet connection.");
        });
    } catch (e) {
      console.log(e);
    }
  };

  const itemToRender = (item) => {
    return (
      <View>
        <View style={styles.fixToTextInfo}>
          <Image
            style={{
              width: 40,
              height: 40,
              backgroundColor: "#f2f2f2",
              margin: 10,
            }}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${item.author_details.avatar_path}`,
            }}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.textTitle}>Author:{item.author}</Text>
            <Text style={styles.textInfo}>Created at:{item.created_at}</Text>
          </View>
        </View>
        <Text
          style={[styles.textInfo, { padding: 20, backgroundColor: "white" }]}
        >
          Comment:{item.content}
        </Text>
      </View>
    );
  };

  const getReviews = async () => {
    return fetch(
      `https://api.themoviedb.org/3//movie/${route.params.id}}/reviews?api_key=fddf63480aef06d3b1e3af2efd6ab4ac`
    )
      .then((response) => response.json())
      .then((json) => {
        setReviews(json.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={{
            width: "100%",
            height: 200,
            position: "absolute",
          }}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${route.params.backdrop_path}`,
          }}
          resizeMode="stretch"
        />
        <View style={[styles.fixToText, { marginTop: 150 }]}>
          <View>
            <Image
              style={{ width: 100, height: 150 }}
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${route.params.poster_path}`,
              }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.textTitle}>{route.params.title}</Text>
            <Text style={styles.textInfo}>
              Release Date:{route.params.original_title}
            </Text>
            <View style={styles.fixToTextInfo}>
              <Ionicons name="person-circle" size={24} color="black" />
              <Text style={styles.textInfo}>{route.params.popularity}</Text>
              <FontAwesome5 name="vote-yea" size={24} color="black" />
              <Text style={styles.textInfo}>
                {route.params.vote_average}/10
              </Text>
            </View>
            <View style={styles.fixToTextInfo}>
              <TouchableOpacity
                style={styles.Button}
                onPress={() => _addToWatchlist(session, id)}
              >
                <Text style={styles.textInfo}>Add to watchlist</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.fixToText}>
          <View>
            <Text style={styles.textTitle}>Overview</Text>
            <Text style={styles.textInfo}>{route.params.overview}</Text>
          </View>
        </View>
        <View style={styles.fixToText}>
          <View>
            <Text style={styles.textTitle}>Rating</Text>
            <View style={styles.fixToTextInfo}>
              <Rating
                rating={rating}
                max={5}
                iconWidth={30}
                iconHeight={30}
                onRate={setRating}
              />
              <TouchableOpacity
                style={styles.Button}
                onPress={() => {
                  _deleteRating();
                }}
              >
                <Text>Delete Rating</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.Button}
                onPress={() => {
                  _submitRating(rating);
                }}
              >
                <Text>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.textTitle}>Review</Text>
          <FlatList
            data={reviews}
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
    backgroundColor: "#f2f2f2",
    marginBottom: 200,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
  },
  textInfo: {
    fontSize: 10,
    color: "#000",
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    margin: 10,
  },
  fixToText: {
    margin: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
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
  fixToTextInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    padding: 10,
  },
});
export default Review;
