import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hoşgeldiniz</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="sentences"
        autoCorrect={false}
        placeholder="Kullanıcı Adı"
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
      
      <TouchableOpacity >
        <Text style={styles.subtitleText}>Kayıt Ol</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.subtitleText}>Şifremi unuttum</Text>
      </TouchableOpacity>

      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    marginBottom: 50,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    paddingTop:5,
    width:"74%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  subtitleText:{
    fontSize:12
  }
});
