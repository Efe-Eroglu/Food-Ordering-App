import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PastOrderBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity
          style={{ marginHorizontal: 13, marginTop: 5 }}
          activeOpacity={0.9}
          onPress={() => navigation.navigate("home")}
        >
          <Ionicons name="arrow-back-outline" size={32} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.right}>
        <View style={styles.content}>
          <Text style={styles.title}>Geçmiş Siparişler</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#ad3103",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  addresTitle: {
    fontWeight: "bold",
    color: "#fff",
  },
  left: {
    flexDirection: "row",
    zIndex:999
  },
  title: {
    color: "#fff",
    fontSize: 18,
    marginTop:3
  },
  right:{
    position:"absolute",
    width:"100%",
    alignItems:"center",
    justifyContent:"center"
}
});
