import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

export default function DetailsMenu({email}) {
  const navigation = useNavigation();

  useEffect(() => {
    StatusBar.setBackgroundColor("#ad3103");
    StatusBar.setBarStyle("light-content");
  }, []);

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
        onPress={() => navigation.navigate("hesapDetay",{user_mail:email})}
      >
        <Text style={styles.text}>Hesap Bilgilerim</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("gecmisSiparis",{user_mail:email})}
      >
        <Text style={styles.text}>Geçmiş Siparişlerim</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={()=> navigation.navigate("yardim",{user_mail:email})}>
        <Text style={styles.text}>Yardım Merkezi</Text>
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
