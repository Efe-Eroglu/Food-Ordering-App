import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import PastOrderBar from "../components/PastOrderBar";
import { Fontisto } from "@expo/vector-icons";

export default function Coupons() {

  const navigation = useNavigation();

  const route = useRoute();
  const { user_mail } = route.params;
  const [userCoupons, setUserCoupons] = useState([]);

  useEffect(() => {
    StatusBar.setBackgroundColor("#ad3103");
    StatusBar.setBarStyle("light-content");
  }, []);

  useEffect(() => {
    async function fetchUserCoupon() {
      try {
        const docRef = doc(db, "Kullanicilar", user_mail);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const coupon = data.coupon;
          setUserCoupons(coupon || []);
        }
      } catch (error) {
        console.log("Hata: ", error);
      }
    }
    fetchUserCoupon();
  }, [user_mail]);

  const renderCouponItem = ({ item }) => (
    <TouchableOpacity style={styles.couponContainer} activeOpacity={0.9}>
      <Text style={styles.couponText}>
        {item + "₺ İndirim  "}
        <Fontisto name="ticket" size={20} color="gray" />
      </Text>
      <Text style={styles.minAmount}>Minimum sepet tutarı 50 TL'dir</Text>
    </TouchableOpacity>
  );

  const returnToHomePage = () => {
    navigation.navigate("home", { user_mail: user_mail });
  };

  return (
    <View style={styles.container}>
      <PastOrderBar title={"Kuponlar"} user_mail={user_mail} />
      {userCoupons.length > 0 ? (
        <View style={styles.container}>
          <Text style={styles.header}>Size Özel Kuponlar</Text>

          <FlatList
            data={userCoupons}
            renderItem={renderCouponItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Henüz kuponunuz bulunmamaktadır.</Text>
          <TouchableOpacity
            style={styles.returnButton}
            activeOpacity={0.8}
            onPress={returnToHomePage}
          >
            <Text style={styles.returnButtonText}>
              Kupon Kazanmak İçin Sipariş Ver
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginHorizontal: 20,
    marginTop: 10,
  },
  listContainer: {
    flexGrow: 1,
  },
  couponContainer: {
    padding: 15,
    backgroundColor: "#f2f2f2",
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  couponText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  minAmount: {
    fontSize: 14,
    color: "#666",
  },
  emptyText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    maxWidth: 150,
    textAlign: "center",
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
    maxWidth: 200,
    marginBottom: 50,
  },
  returnButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
});
