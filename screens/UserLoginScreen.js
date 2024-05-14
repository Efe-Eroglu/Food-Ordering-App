import React, { useEffect, useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";

export default function UserLoginScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    StatusBar.setBackgroundColor("#fff");
    StatusBar.setBarStyle("dark-content");
  }, []);

  const [user_email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    Medium: require("../assets/fonts/Caveat-Medium.ttf"),
    SemiBold: require("../assets/fonts/Caveat-SemiBold.ttf"),
    Roboto: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const userCredentials = await auth.signInWithEmailAndPassword(
        user_email,
        password
      );
      const user = userCredentials.user;
      console.log("Kullanıcı giriş yaptı", user.email);
      navigation.navigate("home", { user_mail: user.email });
    } catch (error) {
      console.error("Giriş hatası: ", error);
      Alert.alert("Hata", "Giriş yapılırken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!fontsLoaded || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ad3103" />
        <Text style={styles.loadingText}>Giriş Yapılıyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hoşgeldiniz</Text>
      <TextInput
        style={styles.input}
        autoCorrect={false}
        placeholder="Kullanıcı Adı"
        placeholderTextColor={"black"}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
        selectionColor={"#823d0c"}
      />
      <TextInput
        style={styles.input}
        autoCorrect={false}
        placeholder="Şifre"
        placeholderTextColor={"black"}
        secureTextEntry
        selectionColor={"#823d0c"}
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
      />

      <View style={styles.subtitle}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("register")}
        >
          <Text style={styles.subtitleText}>Kayıt Ol</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("forgotPassword")}
        >
          <Text style={styles.subtitleText}>Şifremi unuttum</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: "#ad3103",
  },
  title: {
    fontSize: 53,
    marginBottom: 50,
    fontFamily: "SemiBold",
    width: "100%",
    textAlign: "center",
  },
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
    marginTop: 20,
    backgroundColor: "rgba(222, 105, 22,0.3)",
  },
  button: {
    backgroundColor: "#ad3103",
    padding: 13,
    borderRadius: 15,
    width: 210,
    borderRadius: 50,
    marginTop: "10%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Roboto",
  },
  subtitle: {
    paddingTop: 5,
    marginBottom: 20,
    width: "74%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  subtitleText: {
    fontSize: 12,
    fontFamily: "Roboto",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});
