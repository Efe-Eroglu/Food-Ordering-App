import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import Bar from "../components/Bar";
import { Entypo } from "@expo/vector-icons";
import restaurants_data from "../data/restaurants_data";
import { FontAwesome } from '@expo/vector-icons';

const renderItem = ({ item }) => (
  <View>
    <TouchableOpacity style={styles.cart} activeOpacity={0.8}>
      <View style={styles.leftSide}>
        <Image source={item.image} style={styles.image} resizeMode="stretch" />
      </View>
      <View style={styles.rightSide}>
        <Text>{item.name}</Text>
        <Text>
          <Entypo name="star" size={18} color="yellow" /> {item.rating}
        </Text>
        <Text style={styles.delivery}>
        <FontAwesome name="motorcycle" size={16} color="black" /> {item.delivery}<Text style={{fontSize:10}}>dk</Text>
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);
export default function Restoranlar() {
  useEffect(() => {
    StatusBar.setBackgroundColor("#ad3103");
    StatusBar.setBarStyle("light-content");
  }, []);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Bar />
      <View style={styles.container}>
        <Text style={styles.title}>Tüm Restoranlar</Text>
        <FlatList
          data={restaurants_data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  cart: {
    width: 350,
    height: 120,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginVertical: 10,
    flexDirection: "row",
    overflow: "hidden",
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  rightSide: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  leftSide: {
    flex: 3,
  },
  title: {
    alignSelf: "flex-start",
    marginLeft: 20,
    fontSize: 24,
    marginTop: 10,
    fontWeight: "bold",
  },
  delivery:{
    fontSize:14
  }
});
