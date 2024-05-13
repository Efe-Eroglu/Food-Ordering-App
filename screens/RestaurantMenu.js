import { Image, StatusBar, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import PastOrderBar from "../components/PastOrderBar";
import Products from "../components/Products";
import { useRoute } from "@react-navigation/native";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function RestaurantMenu() {
  useEffect(() => {
    StatusBar.setBackgroundColor("#ad3103");
    StatusBar.setBarStyle("light-content");
  }, []);

  const route = useRoute();
  const { restauran_name, user_mail } = route.params;
  const [income, setIncome] = useState("");
  const [loading, setLoading] = useState(true);

  const pipeline = doc(db, "Restoranlar", restauran_name);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docSnapshot = await getDoc(pipeline);
        setIncome(docSnapshot.data());
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();

    const unsubscribe = onSnapshot(pipeline, (doc) => {
      setIncome(doc.data());
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ad3103" />
        <Text style={styles.loadingText}>Restoran Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PastOrderBar title={restauran_name} user_mail={user_mail} />
      <View style={styles.banner}>
        <Image
          source={{ uri: income.image }}
          style={styles.image}
          resizeMode="stretch"
        />
        <View style={styles.bannerText}>
          <Text style={{ fontSize: 20, fontStyle: "italic" }}>
            {income.name}
          </Text>
        </View>
      </View>

      <Products user_mail={user_mail} restauran_name={restauran_name} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  banner: {
    width: "100%",
    height: 250,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  bannerText: {
    backgroundColor: "rgba(252, 252, 252,0.8)",
    position: "absolute",
    bottom: 10,
    padding: 10,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
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
