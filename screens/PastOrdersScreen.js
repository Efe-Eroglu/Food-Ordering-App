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
import { MaterialIcons } from "@expo/vector-icons";
import PastOrderBar from "../components/PastOrderBar";
import { db } from "../firebase";
import { useNavigation, useRoute } from "@react-navigation/native";
import { collection, query, where, getDocs } from "firebase/firestore";

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
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPastOrders();
  }, []);

  const fetchPastOrders = async () => {
    setLoading(true);
    try {
      const pastOrdersRef = collection(db, "Kullanicilar");
      const q = query(pastOrdersRef, where("email", "==", user_mail));
      const querySnapshot = await getDocs(q);
      const fetchedOrders = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.pastOrder) {
          fetchedOrders.push(...data.pastOrder.reverse());
        }
      });
      setPastOrders(fetchedOrders);
      if (querySnapshot.empty) {
        setError(true);
      }
    } catch (error) {
      console.log("Error fetching past orders:", error);
      setError(true);
    }
    setLoading(false);
  };

  const returnToHomePage = () => {
    navigation.navigate("home", { user_mail: user_mail });
  };

  const groupOrdersByOrderId = (orders) => {
    const groupedOrders = {};
    orders.forEach((order) => {
      if (!groupedOrders[order.orderId]) {
        groupedOrders[order.orderId] = [];
      }
      groupedOrders[order.orderId].push(order);
    });
    return groupedOrders;
  };

  const renderOrderGroup = ({ orderId, orders }) => {
    const now = new Date();
    const firstOrderDate = new Date(orders[0].orderDate.seconds * 1000);
    const minutesPassed = (now - firstOrderDate) / 1000 / 60;
    const orderStatus = minutesPassed > 30 ? "Teslim Edildi" : "Hazırlanıyor";
    const statusColor = minutesPassed > 30 ? "green" : "orange";

    return (
      <View style={styles.groupContainer} key={orderId}>
        <View style={styles.contentHeader}>
          <Text style={styles.orderId}>Sipariş id: {orderId}</Text>
          <Text style={[styles.stateText]}>
            Durum:<Text style={{color:statusColor, fontWeight:"bold", fontSize:11}}> {orderStatus} </Text> 
          </Text>
        </View>
        {orders.map((item, index) => {
          const orderDate = new Date(item.orderDate.seconds * 1000);

          return (
            <View style={styles.cardContainer} key={index}>
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
                        <Text style={styles.quantity}>
                          {"x" + item.quantity + " "}
                        </Text>
                      </Text>
                      {minutesPassed > 30 ? (
                        <Entypo name="check" size={18} color="green" />
                      ) : (
                        <MaterialIcons
                          name="pending"
                          size={16}
                          color="orange"
                          style={styles.icon}
                        />
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
                      Sipariş Tarihi: {orderDate.toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  const groupedOrders = groupOrdersByOrderId(pastOrders);

  return (
    <View style={styles.outcontainer}>
      <PastOrderBar title={"Geçmiş Siparişler"} user_mail={user_mail} />
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ad3103" />
            <Text style={styles.loadingText}>
              Geçmiş Siparişleriniz Yükleniyor...
            </Text>
          </View>
        ) : error || pastOrders.length === 0 ? (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyText}>Geçmiş sipariş bulunamadı.</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.returnButton}
              onPress={returnToHomePage}
            >
              <Text style={styles.returnButtonText}>Ana Sayfaya Dön</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={Object.keys(groupedOrders).map((orderId) => ({
              orderId,
              orders: groupedOrders[orderId],
            }))}
            renderItem={({ item }) => renderOrderGroup(item)}
            keyExtractor={(item) => item.orderId}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  image: {
    width: "100%",
    height: "100%",
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
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    marginVertical: 10,
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
  emptyText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
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
    fontSize: 14,
  },
  outcontainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  container: {
    flex: 1,
    marginTop: 20,
  },
  orderId: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 5,
    marginBottom: 2,
  },
  groupContainer: {
    marginBottom: 10,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(220,220,220,0.5)",
  },
  contentHeader:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  stateText:{
    fontSize:10,
    marginRight:10
  }
});
