import { StyleSheet, Text, View, StatusBar, Platform } from "react-native";
import React, { useEffect } from "react";
import Bar from "../components/Bar";
import Campaign from "../components/Campaign";
import Restaurants from "../components/Restaurants";

export default function HomeScreen() {
  
  useEffect(() => {
    StatusBar.setBackgroundColor("#ad3103");
    StatusBar.setBarStyle("light-content");
  }, []);

  return (
    <View style={styles.container}>
      <Bar />
      <Restaurants />
      <Campaign />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});
