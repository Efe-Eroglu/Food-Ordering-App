import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import products from "../data/product_data";
import { AntDesign } from "@expo/vector-icons";

export default function Products() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.leftSide}>
        <Image source={item.image} style={styles.image} resizeMode="stretch" />
      </View>
      <View style={styles.rightSide}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.content}>{item.contents}</Text>
        <View style={styles.price}>
          <Text style={{fontSize:14}}>{item.price}₺</Text>
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <AntDesign name="plus" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 10,
    alignItems: "center",
  },
  card: {
    width: 350,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 20,
    flexDirection: "row",
    margin: 5,
    overflow: "hidden",
    padding: 5,
    borderWidth: 1,
    borderColor: "silver",
  },
  leftSide: {
    flex: 2,
  },
  rightSide: {
    flex: 3,
    marginLeft: 10,
    marginTop: 5,
  },
  image: {
    borderRadius: 20,
    width: "100%",
    height: "100%",
  },
  name: {
    fontWeight: "bold",
  },
  content: {
    fontSize: 12,
    color: "gray",
  },
  button: {
    backgroundColor: "#d9440d",
    width: 27,
    height: 27,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    alignSelf: "flex-end",
    marginRight:10,
  },
  price: {
    justifyContent: "space-between",
    alignContent: "center",
    flexDirection:"row",
    marginTop:5
  },
});
