import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function FilterBar() {
  return (

    <ScrollView style={styles.container}  horizontal showsHorizontalScrollIndicator={false}>
      <TouchableOpacity style={styles.cart} activeOpacity={0.8}>
        <Ionicons name="filter-sharp" size={12} color="gray" />
        <Text style={styles.text}>Filtrele</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cart} activeOpacity={0.8}>
        <Octicons name="sort-asc" size={13} color="gray" />
        <Text style={styles.text}>Sırala</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cart} activeOpacity={0.8}>
      <Octicons name="sort-desc" size={13} color="gray" />
        <Text style={styles.text}>Sırala</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.cart,{width:133, marginRight:10}]} activeOpacity={0.8}>
      <MaterialCommunityIcons name="truck-fast-outline" size={20} color="#4eb015" />
        <Text style={styles.text}>Hızlı Teslimat</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    backgroundColor:"#fcfbfa",
    marginBottom:10
  },
  cart: {
    width: 100,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "row",
    elevation: 2,
    justifyContent: "center",
    marginTop:10,
    marginLeft:10,
    marginBottom:10,
    borderWidth: 1, // border genişliği
    borderColor: 'silver', // border rengi
  },
  text: {
    fontSize: 13,
    marginHorizontal: 10,
  },
});
