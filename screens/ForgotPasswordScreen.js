import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";

export default function ForgotPasswordScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mail Adresinizi giriniz :</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="sentences"
        autoCorrect={false}
        placeholder="E-Mail"
        placeholderTextColor={"black"}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={() => navigation.navigate("home")}
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
    marginTop:10,
    backgroundColor: "rgba(255,0,0,0.1)",
  },
  title: {
    alignSelf:"flex-start",
    marginLeft:45,
    fontSize:17
  },
  button: {
    backgroundColor: "darkred",
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
