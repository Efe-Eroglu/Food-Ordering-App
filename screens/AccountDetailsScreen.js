import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useFonts } from "expo-font";

export default function AccountDetailsScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhoneNumber] = useState("");


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

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Hesap Detayları</Text>
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
          keyboardType="phone-pad"
          placeholder="Telefon Numarası"
          placeholderTextColor={"black"}
          onChangeText={(text) => setPhoneNumber(text)}
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

        <TouchableOpacity activeOpacity={0.8} style={styles.button}>
          <Text style={styles.buttonText}>Kaydet</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    marginVertical:25,
    fontFamily:"Medium"
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
