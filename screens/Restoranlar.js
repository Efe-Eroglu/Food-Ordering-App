import React, { useEffect, useState } from "react";
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { collection, getDocs, updateDoc, arrayUnion, arrayRemove, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Bar from "../components/Bar";
import FilterBar from "../components/FilterBar";
import * as Animatable from "react-native-animatable";

export default function Restoranlar() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user_mail } = route.params;

  const userRef = doc(db, "Kullanicilar", user_mail);

  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          if (userData.favourites) {
            setFavorites(userData.favourites);
          }
        }
      } catch (error) {
        console.error("Error fetching favorites: ", error);
      }
    };
    fetchFavorites();
  }, []);

  const isFavorite = (restaurantName) => {
    return favorites.includes(restaurantName);
  };

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity
        style={styles.cart}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate("restoranMenu", {
            restauran_name: item.name,
            user_mail: user_mail,
          })
        }
      >
        <View style={styles.leftSide}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.rightSide}>
          <View style={styles.addFav}>
            <Text style={styles.name}>{item.name}</Text>
            <TouchableOpacity
              onPress={() => addToFavorites(item.name)}
              style={styles.favoriteButton}
            >
              <Entypo
                style={{ marginLeft: 5, marginTop: 2 }}
                name={isFavorite(item.name) ? "heart" : "heart-outlined"}
                size={20}
                color="red"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.icons}>
            <Text style={{ marginRight: 5 }}>
              <Entypo name="star" size={18} color="#edd142" /> {item.rating}
            </Text>
            <Text style={styles.delivery}>
              <FontAwesome name="motorcycle" size={16} color="gray" />{" "}
              {item.delivery}
              <Text style={{ fontSize: 10 }}>dk</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    StatusBar.setBackgroundColor("#ad3103");
    StatusBar.setBarStyle("light-content");
  }, []);

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Restoranlar"));
        const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchRestaurants();
  }, []);

  const addToFavorites = async (restaurantName) => {
    try {
      const userSnapshot = await getDoc(userRef);
      if (!userSnapshot.exists()) {
        await setDoc(userRef, { favourites: [restaurantName] });
        setFavorites([restaurantName]);

        setNotification(`${restaurantName} favorilere eklendi.`);
        setTimeout(() => {
          setNotification(null);
        }, 3000); 
        console.log(`${restaurantName} favorilere eklendi.`);
      } else {
        const userData = userSnapshot.data();
        if (
          userData.favourites &&
          userData.favourites.includes(restaurantName)
        ) {
          await updateDoc(userRef, {
            favourites: arrayRemove(restaurantName),
          });
          setFavorites(
            favorites.filter((favorite) => favorite !== restaurantName)
          );
          setNotification(`${restaurantName} favorilerden çıkarıldı.`);
          setTimeout(() => {
            setNotification(null);
          }, 3000); 
          console.log(`${restaurantName} favorilerden çıkarıldı.`);
        } else {
          await updateDoc(userRef, {
            favourites: arrayUnion(restaurantName),
          });
          setFavorites([...favorites, restaurantName]);
          setNotification(`${restaurantName} favorilere eklendi.`);
          setTimeout(() => {
            setNotification(null);
          }, 3000); 
          console.log(`${restaurantName} favorilere eklendi.`);
        }
      }
    } catch (error) {
      console.error("Favorilere ekleme hatası:", error);
    }
  };

  const Notification = () => {
    return (
      <Animatable.View animation="slideInUp" duration={1000} style={styles.notificationContainer}>
        <View style={styles.notification}>
          <Text style={styles.notificationText}>{notification}</Text>
        </View>
      </Animatable.View>
    );
  };

  return (
    <View style={styles.screen}>
      <Bar email={user_mail} />
      <View style={styles.container}>
        <FilterBar user_mail={user_mail} />
        <FlatList
          data={restaurants}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
        {notification && <Notification />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  cart: {
    width: 350,
    height: 250,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
    overflow: "hidden",
    elevation: 1,
    borderWidth: 1,
    borderColor: "rgba(230,230,230,0.2)",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  rightSide: {
    flex: 2,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  leftSide: {
    flex: 8,
  },
  delivery: {
    fontSize: 14,
    marginLeft: 20,
  },
  name: {
    fontWeight: "bold",
    marginLeft: 5,
  },
  addFav: {
    flexDirection: "row",
    alignItems: "center",
  },
  favoriteButton: {
    marginRight: 5,
  },
  icons: {
    alignItems: "flex-end",
  },
  notificationContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
    zIndex: 999,
  },
  notification: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 10,
    borderRadius: 5,
  },
  notificationText: {
    color: "#fff",
    textAlign: "center",
  },
});
