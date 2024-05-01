import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import RestaurantList from "./RestaurantList";
import { useFonts } from "expo-font";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function Restaurants({user_mail}) {
 


  const [fontsLoaded, fontError] = useFonts({
    denme: require("../assets/fonts/Quicksand-Light.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popüler Restoranlar</Text>
      <RestaurantList user_mail={user_mail}/>
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
});
