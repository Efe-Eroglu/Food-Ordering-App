import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

export default function DetailsMenu() {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("login");
      })
      .catch((error) => alert(error.message));
    console.log("Kullanıcı çıkış yaptı");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("hesapDetay")}
      >
        <Text style={styles.text}>Hesap Bilgilerim</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} activeOpacity={0.7}>
        <Text style={styles.text}>Geçmiş Siparişlerim</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} activeOpacity={0.7}>
        <Text style={styles.text}>Kuponlarım</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={handleSignOut}
      >
        <Text style={styles.text}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "silver",
    padding: 15,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
