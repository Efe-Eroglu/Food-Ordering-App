import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import restaurants_data from "../data/restaurants_data";

export default function RestaurantList() {
  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity
        style={styles.restaurant}
        onPress={() => handlePress(item)}
        activeOpacity={0.8}
      >
        <Image source={item.image} style={styles.image} resizeMode="stretch" />
        <View style={styles.subtitleArea}>
          <Text style={[styles.subtitle, styles.star]}>
            <Entypo name="star" size={18} color="yellow" /> {item.rating}
          </Text>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const handlePress = (item) => {
    console.log("Seçilen restoran:", item);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants_data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  restaurant: {
    width: 300,
    height: 200,
    marginTop:10,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
    elevation:10
  },
  subtitleArea: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  subtitle: {
    color: "white",
    fontSize: 16,
    padding: 10,
  },
  nameContainer: {
    position:"absolute",
    width:"100%",
    alignItems: "center",
  },
  name: {
    color: "white",
    fontSize: 16,
    padding: 10,
    textAlign: "center",
  },
});
