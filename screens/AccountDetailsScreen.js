import React, { useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  StatusBar,
} from "react-native";
import { useFonts } from "expo-font";
import PastOrderBar from "../components/PastOrderBar";
import { useRoute } from "@react-navigation/native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { TextInputMask } from "react-native-masked-text";

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

  useEffect(() => {
    StatusBar.setBackgroundColor("#ad3103");
    StatusBar.setBarStyle("light-content");
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const docRef = doc(db, "Kullanicilar", user_mail);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSehir(data.city || "");
          setIlce(data.district || "");
          setMahalle(data.adress || "");
          setPostaKodu(data.postalCode || "");
          setTelefon(data.phone || "");
        }
      } catch (error) {
        console.error("Hata:", error);
      }
    }
    fetchUserData();
  }, [user_mail]);

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

  if (!fontsLoaded && !fontError) {
    return null;
  }

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
        value={sehir}
        onChangeText={(text) => setSehir(text)}
      />
      <TextInput
        style={styles.input}
        autoCapitalize="sentences"
        autoCorrect={false}
        selectionColor={"#823d0c"}
        placeholder="İlçe"
        placeholderTextColor={"black"}
        value={ilce}
        onChangeText={(text) => setIlce(text)}
      />
      <TextInput
        style={styles.input}
        autoCapitalize="sentences"
        autoCorrect={false}
        selectionColor={"#823d0c"}
        placeholder="Mahalle"
        placeholderTextColor={"black"}
        value={mahalle}
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
        value={postaKodu}
        onChangeText={(text) => setPostaKodu(text)}
      />
      <TextInputMask
        style={styles.input}
        placeholder="Telefon Numarası"
        placeholderTextColor={"black"}
        selectionColor={"#823d0c"}
        keyboardType="phone-pad"
        type={"custom"}
        options={{
          mask: "0 (999) 999-9999",
        }}
        value={telefon}
        onChangeText={(text) => {
        setTelefon(text)
        }}
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
    backgroundColor: "#ad3103",
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
