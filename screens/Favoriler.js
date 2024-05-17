import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Bar from "../components/Bar";
import FilterBar from "../components/FilterBar";
import * as Animatable from "react-native-animatable";

export default function Favoriler() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user_mail } = route.params;

  const [notification, setNotification] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fastDeliveryFilter, setFastDeliveryFilter] = useState(false);
  const [favoriRestoranlar, setFavoriRestoranlar] = useState([]);
  const [fastDeliveryRestaurants, setFastDeliveryRestaurants] = useState([]);
  const [sortByRating, setSortByRating] = useState(false);
  const [sortByRatingDesc, setSortByRatingDesc] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  const userRef = doc(db, "Kullanicilar", user_mail);

  useEffect(() => {
    StatusBar.setBackgroundColor("#ad3103");
    StatusBar.setBarStyle("light-content");

    const fetchFavorites = async () => {
      try {
        const userRef = doc(db, "Kullanicilar", user_mail);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          const favoriRestoranAdlari = userData.favourites || [];

          const favoriRestoranVerileri = await Promise.all(
            favoriRestoranAdlari.map(async (restoranAdi) => {
              const restoranRef = doc(db, "Restoranlar", restoranAdi);
              const restoranSnapshot = await getDoc(restoranRef);
              return restoranSnapshot.data();
            })
          );

          setFavoriRestoranlar(favoriRestoranVerileri);
          setLoading(false);
        }
      } catch (error) {
        console.error("Favorileri getirme hatası:", error);
      }
    };

    fetchFavorites();
  }, [user_mail]);

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

  const isFavorite = (restaurantName) => {
    return favorites.includes(restaurantName);
  };

  useEffect(() => {
    if (favoriRestoranlar.length > 0) {
      setFavorites(favoriRestoranlar.map((restoran) => restoran.name));
    }
  }, [favoriRestoranlar]);

  const Notification = () => {
    return (
      <Animatable.View
        animation="slideInUp"
        duration={1000}
        style={styles.notificationContainer}
      >
        <View style={styles.notification}>
          <Text style={styles.notificationText}>{notification}</Text>
        </View>
      </Animatable.View>
    );
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ad3103" />
        <Text style={styles.loadingText}>Favoriler Yükleniyor...</Text>
      </View>
    );
  }

  const returnToHomePage = () => {
    navigation.navigate("home", { user_mail: user_mail });
  };

  const filterRestaurants = (fastDelivery) => {
    if (fastDelivery) {
      const fastDeliveryRestaurants = favoriRestoranlar.filter(
        (restaurant) => restaurant.delivery <= 30
      );
      setFastDeliveryRestaurants(fastDeliveryRestaurants);
    } else {
      setFastDeliveryRestaurants([]);
    }
  };

  const sortRestaurantsByDeliveryTimeAscending = () => {
    const sortedRestaurants = [...favoriRestoranlar].sort(
      (a, b) => a.delivery - b.delivery
    );
    setFavoriRestoranlar(sortedRestaurants);
  };

  const sortRestaurantsByDeliveryTimeDescending = () => {
    const sortedRestaurants = [...favoriRestoranlar].sort(
      (a, b) => b.delivery - a.delivery
    );
    setFavoriRestoranlar(sortedRestaurants);
  };

  const sortRestaurantsByName = () => {
    const sortedRestaurants = [...favoriRestoranlar].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    setFavoriRestoranlar(sortedRestaurants);
  };

  const sortRestaurantsByNameDesc = () => {
    const sortedRestaurants = [...favoriRestoranlar].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;
      return 0;
    });
    setFavoriRestoranlar(sortedRestaurants);
  };

  const sortRestaurantsByRating = () => {
    const sortedRestaurants = [...favoriRestoranlar].sort((a, b) => {
      return b.rating - a.rating;
    });
    setFavoriRestoranlar(sortedRestaurants);
  };

  const sortRestaurantsByRatingDesc = () => {
    const sortedRestaurants = [...favoriRestoranlar].sort((a, b) => {
      return a.rating - b.rating;
    });
    setFavoriRestoranlar(sortedRestaurants);
  };


  return (
    <View style={styles.outContainer}>
      <Bar email={user_mail} />
      <View style={styles.container}>
        <FilterBar
          user_mail={user_mail}
          onFilter={filterRestaurants}
          onSortByName={sortRestaurantsByName}
          onSortByNameDesc={sortRestaurantsByNameDesc}
          onSortByDeliveryTimeAscending={sortRestaurantsByDeliveryTimeAscending}
          onSortByDeliveryTimeDescending={
            sortRestaurantsByDeliveryTimeDescending
          }
          onSortByRatingAscending={sortRestaurantsByRating}
          onSortByRatingDescending={sortRestaurantsByRatingDesc}
        />

        {favoriRestoranlar.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.noFavoritesText}>Favori restoranınız yok</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={returnToHomePage}
              style={styles.returnButton}
            >
              <Text style={styles.returnButtonText}>Ana Sayfaya Dön</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
          data={
            fastDeliveryRestaurants.length
              ? fastDeliveryRestaurants
              : favoriRestoranlar
          }
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
        )}
        {notification && <Notification />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
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
  name: {
    fontWeight: "bold",
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
  addFav: {
    flexDirection: "row",
    alignItems: "center",
  },
  noFavoritesText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
  emptyContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  returnButton: {
    backgroundColor: "#d9440d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
  },
  returnButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});
