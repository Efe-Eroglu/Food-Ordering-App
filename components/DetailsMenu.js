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
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

export default function DetailsMenu({ email }) {
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
        onPress={() => navigation.navigate("hesapDetay", { user_mail: email })}
      >
        <View style={styles.item}>
          <AntDesign name="user" size={16} color="black" />
          <Text style={styles.text}>Hesap Bilgilerim</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate("gecmisSiparis", { user_mail: email })
        }
      >
        <View style={styles.item}>
          <AntDesign name="calendar" size={16} color="black" />
          <Text style={styles.text}>Geçmiş Siparişlerim</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("kupon", { user_mail: email })}
      >
        <View style={styles.item}>
          <Ionicons name="ticket-outline" size={16} color="black" />
          <Text style={styles.text}>Kuponlar</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("yardim", { user_mail: email })}
      >
        <View style={styles.item}>
          <Feather name="phone-call" size={16} color="black" />
          <Text style={styles.text}>Yardım Merkezi</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={handleSignOut}
      >
        <View style={styles.item}>
          <SimpleLineIcons name="logout" size={16} color="black" />
          <Text style={styles.text}>Çıkış Yap</Text>
        </View>
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
    borderBottomWidth: 1,
    borderColor: "silver",
    padding: 15,
    justifyContent:"center",
    alignItems:"center"
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
    textAlign: "center",
  },
});
