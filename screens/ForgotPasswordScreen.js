  import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
  Platform
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");

  useEffect(() => {
    StatusBar.setBackgroundColor("#fff");
    StatusBar.setBarStyle("dark-content");
  }, []);

  const changePassword = (email) => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {  Alert.alert(
        "İstek Gönderildi",
        "Şifrenizi sıfırlamak için e-posta adresinize talimatlar gönderildi.",
        [
          { text: "Tamam", onPress: () => navigation.navigate('login') }
        ],
        { cancelable: false }
      );
      })
      .catch((error) => {
        Alert.alert(
          "İstek Başarısız",
          "Şifreniz gönderilirken bir hata oluştu daha sonra tekrar deneyin.",
          [
            { text: "Tamam"}
          ],
          { cancelable: false }
        );
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mail Adresinizi giriniz :</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={"black"}
        placeholder="E-Mail"
      />
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={() => {
          changePassword(email);
        }}
      >
        <Text style={styles.buttonText}>Kod Gönder</Text>
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
  input: {
    padding: 15,
    borderRadius: 10,
    width: 300,
    marginTop: 10,
    backgroundColor: "rgba(222, 105, 22,0.3)",
  },
  title: {
    alignSelf: "flex-start",
    marginLeft: 45,
    fontSize: 17,
  },
  button: {
    backgroundColor: "#ad3103",
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
    width: 200,
    borderRadius: 50,
    marginTop: "10%",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
});
