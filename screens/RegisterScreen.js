import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, StatusBar, Platform } from "react-native";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function RegisterScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    StatusBar.setBackgroundColor("#fff");
    StatusBar.setBarStyle("dark-content");
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const handleSignUp = async () => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "Kullanicilar", email), {
        name: name,
        surname: surname,
        email: email,
        adress:"",
        city:"",
        district:"",
        postalCode:"",
        pastOrder:[],
        cart:[],
      });
      console.log("Kullanıcı kayıt oldu", user.email);
    } catch (error) {
      alert(error.message);
    }
  };

  const [fontsLoaded, fontError] = useFonts({
    Medium: require("../assets/fonts/Caveat-Medium.ttf"),
    SemiBold: require("../assets/fonts/Caveat-SemiBold.ttf"),
    Roboto: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="sentences"
        autoCorrect={false}
        placeholder="İsim"
        selectionColor={"#823d0c"}
        placeholderTextColor={"black"}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        autoCapitalize="sentences"
        autoCorrect={false}
        selectionColor={"#823d0c"}
        placeholder="Soyisim"
        placeholderTextColor={"black"}
        onChangeText={(text) => setSurname(text)}
      />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        selectionColor={"#823d0c"}
        keyboardType="email-address"
        placeholder="E-Posta"
        placeholderTextColor={"black"}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        selectionColor={"#823d0c"}
        placeholder="Şifre"
        placeholderTextColor={"black"}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.subtitle}>
        <Text style={styles.subtitleText}>Hesabınız var mı?</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate("login");
          }}
        >
          <Text style={styles.subtitleText}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={handleSignUp}
      >
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 53,
    width: "100%",
    textAlign: "center",
    marginBottom: "10%",
    fontFamily: "SemiBold",
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
  subtitle: {
    paddingTop: 5,
    width: "74 %",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  subtitleText: {
    fontSize: 12,
  },
});
