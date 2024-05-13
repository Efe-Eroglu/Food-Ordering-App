import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { collection, getDocs, updateDoc, arrayUnion, arrayRemove, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import Bar from "../components/Bar";

export default function GelAl() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user_mail } = route.params;

  const [income, setIncome] = useState([]);
  const [notification, setNotification] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [favoriRestoranlar, setFavoriRestoranlar] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const userRef = doc(db, "Kullanicilar", user_mail);

  useEffect(() => {
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
        }
      } catch (error) {
        console.error("Favorileri getirme hatası:", error);
      }
    };

    fetchFavorites();
  }, [user_mail]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Restoranlar"));
        const data = [];
        querySnapshot.forEach((doc) => {
          const restaurantData = doc.data();
          if (restaurantData.gelal === 1) {
            data.push(restaurantData);
          }
        });
        setIncome(data);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Veri getirme hatası: ", error);
      }
    };
    fetchData();
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
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  if (loading) { // Show loading indicator
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ad3103" />
        <Text style={styles.loadingText}>Gel Al Restoranları Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ad3103" barStyle="light-content" />
      <Bar email={user_mail} />
      <View style={styles.content}>
        <Text style={styles.text}>Gel Al'a Özel Restoranlar</Text>
        <FlatList
          data={income}
          renderItem={renderItem}
          keyExtractor={(item) => {
            if (!item.id) {
              console.error("Öğe ID'si tanımsız:", item);
            }
            return item.id ? item.id.toString() : null;
          }}
          showsVerticalScrollIndicator={false}
        />
        {notification && <Notification />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
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
  text: {
    fontFamily: "SemiBold",
    alignSelf: "flex-start",
    marginLeft: 20,
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
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
