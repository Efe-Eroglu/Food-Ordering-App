import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import PastOrderBar from "../components/PastOrderBar";
import { db } from "../firebase";
import { useNavigation, useRoute } from "@react-navigation/native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { MaterialIcons } from '@expo/vector-icons';

export default function PastOrdersScreen() {
  const navigation = useNavigation();

  const route = useRoute();
  const { user_mail } = route.params;

  useEffect(() => {
    StatusBar.setBackgroundColor("#ad3103");
    StatusBar.setBarStyle("light-content");
  }, []);

  const [pastOrders, setPastOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPastOrders = async () => {
    setLoading(true);
    try {
      const pastOrdersRef = collection(db, "Kullanicilar");
      const q = query(pastOrdersRef, where("email", "==", user_mail));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          if (data.pastOrder) {
            setPastOrders(data.pastOrder);
          }
        }
      });
    } catch (error) {
      console.log("Error fetching past orders:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPastOrders();
  }, []);

  const returnToHomePage = () => {
    navigation.navigate("home", { user_mail: user_mail });
  };

  const renderItem = ({ item }) => {
    const orderDate = new Date(item.orderDate.seconds * 1000);
    const now = new Date();
    const minutesPassed = (now - orderDate) / 1000 / 60;

    return (
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.leftSide}>
            <Image
              source={{ uri: item.img }}
              style={styles.image}
              resizeMode="stretch"
            />
          </View>
          <View style={styles.rightSide}>
            <View style={styles.content}>
              <View style={styles.itemNameContainer}>
                <Text style={styles.itemName}>
                  {item.name + " "}
                  <Text style={styles.quantity}>{"x" + item.quantity + " "}</Text>
                </Text>
                {/* Eğer sipariş tarihinden 30 dakika geçtiyse yeşil tik göster (Teslim Edildi)*/}
                {minutesPassed > 30 ? (
                  <Entypo name="check" size={18} color="green" />
                ) : (
                  <MaterialIcons name="pending" size={16} color="orange" style={styles.icon}/>
                )}
              </View>
              <View style={styles.itemContent}>
                {item.content.map((contentItem, index) => (
                  <Text key={index} style={styles.contentText}>
                    {contentItem + ","}
                  </Text>
                ))}
              </View>

              <Text style={styles.price}>
                {"Fiyat: " + item.price * item.quantity + " ₺"}
              </Text>
              <Text style={styles.orderDate}>
                Sipariş Tarihi:{" "}
                {orderDate.toLocaleDateString()}
              </Text>
            </View>
            {/* <TouchableOpacity style={styles.button} activeOpacity={0.7}>
              <Text style={styles.buttonText}>Değerlendir</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.outcontainer}>
      <PastOrderBar title={"Geçmiş Siparişler"} user_mail={user_mail} />

      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#d9440d" />
        ) : pastOrders.length === 0 ? (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyText}>Geçmiş sipariş bulunamadı.</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.returnButton}
              onPress={returnToHomePage}
            >
              <Text style={styles.returnButtonText}>Hemen Sipariş Ver</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={pastOrders}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outcontainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  container: {
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  cardContainer: {
    marginBottom: 15,
  },
  card: {
    width: 350,
    height: 110,
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 1,
    borderWidth: 1,
    borderColor: "rgba(220,220,220,0.5)",
    flexDirection: "row",
  },
  leftSide: {
    flex: 4,
  },
  rightSide: {
    flex: 6,
    margin: 10,
    justifyContent: "space-between",
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#6e2305",
    backgroundColor: "rgba(110, 35, 5,0.1)",
  },
  buttonText: {
    textAlign: "center",
    padding: 1.2,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
  content: {
    flex: 1,
  },
  itemNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemName: {
    fontWeight: "bold",    
  },
  itemContent: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  contentText: {
    marginRight: 5,
    fontSize: 12,
    color: "gray",
  },
  orderDate: {
    fontSize: 11,
    color: "gray",
    marginTop: 2,
    fontWeight: "bold",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  emptyCartText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Roboto",
  },
  returnButton: {
    backgroundColor: "#d9440d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 20,
  },
  returnButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  price: {
    fontWeight: "bold",
    fontSize: 12,
    marginVertical: 4,
  },
  quantity: {
    fontSize: 11,
    color: "gray",
  },
  icon: {
    marginLeft: 5,
  },
});
