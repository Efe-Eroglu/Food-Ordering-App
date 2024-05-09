import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useFonts } from "expo-font";
import PastOrderBar from "../components/PastOrderBar";
import { useRoute } from "@react-navigation/native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function AccountDetailsScreen() {
  const [sehir, setSehir] = useState("");
  const [ilce, setIlce] = useState("");
  const [mahalle, setMahalle] = useState("");
  const [postaKodu, setPostaKodu] = useState("");
  const [telefon, setTelefon] = useState("");

  const route = useRoute();
  const { user_mail } = route.params;

  const [fontsLoaded, fontError] = useFonts({
    Medium: require("../assets/fonts/Caveat-Medium.ttf"),
    SemiBold: require("../assets/fonts/Caveat-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const update = async () => {
    try {
      await updateDoc(doc(db, "Kullanicilar", user_mail), {
        adress: mahalle,
        city: sehir,
        district: ilce,
        postalCode: postaKodu,
        phone: telefon,
      });
      Alert.alert("Başarılı", "Bilgiler başarıyla güncellendi.");
      console.log("Kullanıcı bilgi güncelledi", user_mail);
    } catch (error) {
      console.error("Hata:", error);
      Alert.alert("Hata", "Bilgiler güncellenirken bir hata oluştu.");
    }
  };


  return (
    <View style={styles.container}>
      <PastOrderBar title={"Hesap Detayları"} user_mail={user_mail} />
      <Text style={styles.title}>Hesap Detayları</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="sentences"
        autoCorrect={false}
        placeholder="Şehir"
        selectionColor={"#823d0c"}
        placeholderTextColor={"black"}
        onChangeText={(text) => setSehir(text)}
      />
      <TextInput
        style={styles.input}
        autoCapitalize="sentences"
        autoCorrect={false}
        selectionColor={"#823d0c"}
        placeholder="İlçe"
        placeholderTextColor={"black"}
        onChangeText={(text) => setIlce(text)}
      />
      <TextInput
        style={styles.input}
        autoCapitalize="sentences"
        autoCorrect={false}
        selectionColor={"#823d0c"}
        placeholder="Mahalle"
        placeholderTextColor={"black"}
        onChangeText={(text) => setMahalle(text)}
      />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        selectionColor={"#823d0c"}
        keyboardType="phone-pad"
        placeholder="Posta Kodu"
        placeholderTextColor={"black"}
        onChangeText={(text) => setPostaKodu(text)}
      />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        selectionColor={"#823d0c"}
        keyboardType="phone-pad"
        placeholder="Telefon Numarası"
        placeholderTextColor={"black"}
        onChangeText={(text) => setTelefon(text)}
      />

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={update}
      >
        <Text style={styles.buttonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    marginVertical: 50,
    fontFamily: "Medium",
  },
  input: {
    padding: 15,
    borderRadius: 10,
    width: 300,
    marginTop: 20,
    backgroundColor: "rgba(222, 105, 22,0.3)",
  },
  button: {
    backgroundColor: "#ad581c",
    padding: 13,
    borderRadius: 15,
    marginTop: 10,
    width: 200,
    borderRadius: 50,
    marginTop: "10%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
