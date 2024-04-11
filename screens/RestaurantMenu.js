import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import PastOrderBar from "../components/PastOrderBar";
import Products from "../components/Products";

export default function RestaurantMenu() {
  useEffect(() => {
    StatusBar.setBackgroundColor("#ad3103");
    StatusBar.setBarStyle("light-content");
  }, []);

  return (
    <View style={styles.container}>
      <PastOrderBar title={"Gross Burger"} />
      <View style={styles.banner}>
        <Image
          source={require("../assets/banner.jpeg")}
          style={styles.image}
          resizeMode="stretch"
        />
      </View>
      
        <Products />
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
    borderRadius: 10,
  },
});
