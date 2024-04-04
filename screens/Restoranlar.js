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
import { FontAwesome } from "@expo/vector-icons";
import FilterBar from "../components/FilterBar";

const renderItem = ({ item }) => (
  <View>
    <TouchableOpacity style={styles.cart} activeOpacity={0.9}>
      <View style={styles.leftSide}>
        <Image source={item.image} style={styles.image} resizeMode="stretch" />
      </View>
      <View style={styles.rightSide}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.icons}>
          <Text style={{marginRight:5}}>
            <Entypo name="star" size={18} color="#edd142" />  {item.rating}
          </Text>
          <Text style={styles.delivery}>
            <FontAwesome name="motorcycle" size={16} color="gray" />{" "}
            {item.delivery}
            <Text style={{ fontSize: 10 }}>dk</Text>
          </Text>
        </View>
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
    <View>   
      <Bar />
      <View style={styles.container}>
        <FilterBar />
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
    height: 250,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
    overflow: "hidden",
    elevation: 1,
    borderWidth: 1,
    borderColor: "rgba(230,230,230,0.2)",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  rightSide: {
    flex: 2,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  leftSide: {
    flex: 8,
  },
  title: {
    alignSelf: "flex-start",
    marginLeft: 20,
    fontSize: 24,
    marginTop: 10,
    fontWeight: "bold",
  },
  delivery: {
    fontSize: 14,
    marginLeft: 20,
  },
  name: {
    fontWeight: "bold",
  },
  icons: {
    alignItems: "flex-end",
  },
});
