import { Button, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import PastOrderBar from "../components/PastOrderBar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import email from 'react-native-email';
import { useRoute } from "@react-navigation/native";

export default function HelpScreen() {
  useEffect(() => {
    StatusBar.setBackgroundColor("#ad3103");
    StatusBar.setBarStyle("light-content");
  }, []);

  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [message, setMessage] = useState("");

  
  const route = useRoute();
  const { user_mail } = route.params;


  const sendEmail = () => {
    if (name.length !== 0 && message.length !== 0) {
      const to = ["foodorderingapp1@example.com"];
      const options = {
        subject: name,
        body: message,
      };

      email(to, options)
        .then(() => console.log('Mail gönderildi'))
        .catch((error) => console.error("Mail gönderme hatası:", error));
    }
  };

  return (
    <View style={styles.container}>
      <PastOrderBar title={"İletişim Merkezi"} user_mail={user_mail}/>

      <Text
        style={{
          fontWeight: "bold",
          fontSize: 18,
          alignSelf: "flex-start",
          marginLeft: 45,
          marginTop: "25%",
        }}
      >
        İletişim
      </Text>

      <Text style={styles.aciklama}>
        Bizimle iletişime geçmek için bu formu kullanabilirsiniz. Size en kısa
        sürede yanıt vermeye çalışacağız.
      </Text>

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
        autoCapitalize="none"
        autoCorrect={false}
        selectionColor={"#823d0c"}
        keyboardType="email-address"
        placeholder="E-Posta"
        placeholderTextColor={"black"}
        onChangeText={(text) => setEmailAddress(text)}
      />

      <TextInput
        style={[styles.input, { height: 150 }]}
        autoCorrect={false}
        selectionColor={"#823d0c"}
        placeholder="Mesajınız"
        placeholderTextColor={"black"}
        onChangeText={(text) => setMessage(text)}
      />

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={sendEmail}
      >
        <Text style={styles.buttonText}>Gönder</Text>
        <MaterialCommunityIcons
          name="email-fast-outline"
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  aciklama: {
    maxWidth: 300,
    fontSize: 13,
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
    flexDirection: "row",
    borderRadius: 50,
    marginTop: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginRight: 10,
  },
});
