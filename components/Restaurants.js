import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import RestaurantList from "./RestaurantList";
import { useFonts } from "expo-font";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function Restaurants({ user_mail }) {
  const [fontsLoaded, fontError] = useFonts({
    denme: require("../assets/fonts/Quicksand-Light.ttf"),
  });

  const [isLoading, setIsLoading] = useState(true); // Yükleniyor durumu eklendi

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    const pipeline = doc(db, "Kullanicilar", user_mail);

    const unsubscribe = onSnapshot(pipeline, (doc) => {
      setIsLoading(false); // Veri alındıktan sonra yükleniyor durumunu kapat
    });

    return () => unsubscribe();
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ad3103" />
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popüler Restoranlar</Text>
      <RestaurantList user_mail={user_mail} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginTop: 10,
    fontFamily: "denme",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 14,
    fontWeight:"bold" 
  },
});
