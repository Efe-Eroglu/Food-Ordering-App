import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import React from "react";

export default function RegisterScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="sentences"
        autoCorrect={false}
        placeholder="İsim"
        placeholderTextColor={"black"}
      />
      <TextInput
        style={styles.input}
        autoCapitalize="sentences"
        autoCorrect={false}
        placeholder="Soyisim"
        placeholderTextColor={"black"}
      />
      <TextInput
        style={styles.input}
        autoCapitalize="sentences"
        autoCorrect={false}
        placeholder="E-Posta"
        placeholderTextColor={"black"}
      />
      <TextInput
        style={styles.input}
        autoCapitalize="sentences"
        autoCorrect={false}
        placeholder="Şifre"
        placeholderTextColor={"black"}
      />
      <View style={styles.subtitle}>
          <Text style={styles.subtitleText}>Hesabını var mı?</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={()=> navigation.navigate("login")}>
          <Text style={styles.subtitleText}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>


      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={() => navigation.navigate("home")}
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
    fontSize: 32,
    marginBottom:"10%"
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: 300,
    marginTop: 20,
    backgroundColor: "rgba(255,0,0,0.1)",
  },
  button: {
    backgroundColor: "darkred",
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
    width: 200,
    borderRadius: 50,
    marginTop: "10%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
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
