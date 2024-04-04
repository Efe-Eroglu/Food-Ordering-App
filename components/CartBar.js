import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function CartBar() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.left}>

        <TouchableOpacity style={{marginHorizontal:13 ,marginTop:5}} activeOpacity={0.9} onPress={()=>navigation.navigate("home")}>
          <Ionicons name="arrow-back-outline" size={32} color="white" />
        </TouchableOpacity>

        <View>
          <Text style={styles.addresTitle}>Ataşehir mahallesi</Text>
          <Text style={styles.addresContent}>Elazığ Merkez Elazığ 23100</Text>
        </View>
      </View>

      <View style={styles.right}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#ad3103",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical:15
  },
  addresTitle: {
    fontWeight: "bold",
    color: "#fff",
  },
  left: {
    flexDirection:"row"
  },
  addresContent:{
    color:"#fff"
  }
});
