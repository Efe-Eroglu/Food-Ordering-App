import { StyleSheet, Text, View, StatusBar, Platform } from "react-native";
import React, { useEffect } from "react";
import Bar from "../components/Bar";
import Campaign from "../components/Campaign";
import Restaurants from "../components/Restaurants";
import { useRoute } from "@react-navigation/native";

export default function HomeScreen() {
  
  useEffect(() => {
    StatusBar.setBackgroundColor("#ad3103");
    StatusBar.setBarStyle("light-content");
  }, []);

  const route = useRoute();
  const { user_mail } = route.params;

  
  return (
    <View style={styles.container}>
      <Bar  email = {user_mail}/>
      <Restaurants user_mail={user_mail}/>
      <Campaign email={user_mail}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});
