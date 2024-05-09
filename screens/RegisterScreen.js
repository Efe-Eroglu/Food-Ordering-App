import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  StatusBar,
  ScrollView,
} from "react-native";
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
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [coupon, setCoupon] = useState("");
  const [district, setDistrict] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const handleSignUp = async () => {
    if (step === 1) {
      if (!name || !surname || !email || !password) {
        setErrors({
          name: !name,
          surname: !surname,
          email: !email,
          password: !password,
        });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!city || !district || !address || !postalCode) {
        setErrors({
          city: !city,
          district: !district,
          address: !address,
          postalCode: !postalCode,
        });
        return;
      }
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
          adress: address,
          city: city,
          district: district,
          postalCode: postalCode,
          pastOrder: [],
          cart: [],
          coupon: [],
        });
        console.log("Kullanıcı kayıt oldu", user.email);
        navigation.navigate("home", { user_mail: email });
      } catch (error) {
        alert(error.message);
      }
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

  const renderStepOne = () => {
    return (
      <>
        <TextInput
          style={[styles.input, errors.name && styles.errorBorder]}
          autoCapitalize="sentences"
          autoCorrect={false}
          placeholder="İsim"
          selectionColor={"#823d0c"}
          placeholderTextColor={"black"}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={[styles.input, errors.surname && styles.errorBorder]}
          autoCapitalize="sentences"
          autoCorrect={false}
          selectionColor={"#823d0c"}
          placeholder="Soyisim"
          placeholderTextColor={"black"}
          onChangeText={(text) => setSurname(text)}
        />
        <TextInput
          style={[styles.input, errors.email && styles.errorBorder]}
          autoCapitalize="none"
          autoCorrect={false}
          selectionColor={"#823d0c"}
          keyboardType="email-address"
          placeholder="E-Posta"
          placeholderTextColor={"black"}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={[styles.input, errors.password && styles.errorBorder]}
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
          <Text style={styles.buttonText}>Devam</Text>
        </TouchableOpacity>
      </>
    );
  };

  const renderStepTwo = () => {
    return (
      <>
        <TextInput
          style={[styles.input, errors.city && styles.errorBorder]}
          autoCapitalize="sentences"
          autoCorrect={false}
          selectionColor={"#823d0c"}
          placeholder="Şehir"
          placeholderTextColor={"black"}
          onChangeText={(text) => setCity(text)}
        />
        <TextInput
          style={[styles.input, errors.district && styles.errorBorder]}
          autoCapitalize="sentences"
          autoCorrect={false}
          selectionColor={"#823d0c"}
          placeholder="İlçe"
          placeholderTextColor={"black"}
          onChangeText={(text) => setDistrict(text)}
        />
        <TextInput
          style={[styles.input, errors.address && styles.errorBorder]}
          autoCapitalize="sentences"
          autoCorrect={false}
          selectionColor={"#823d0c"}
          placeholder="Adres"
          placeholderTextColor={"black"}
          onChangeText={(text) => setAddress(text)}
        />
        <TextInput
          style={[styles.input, errors.postalCode && styles.errorBorder]}
          autoCapitalize="sentences"
          autoCorrect={false}
          selectionColor={"#823d0c"}
          keyboardType="numeric"
          placeholder="Posta Kodu"
          placeholderTextColor={"black"}
          onChangeText={(text) => setPostalCode(text)}
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
      </>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>
      {step === 1 ? renderStepOne() : null}
      {step === 2 ? renderStepTwo() : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 53,
    textAlign: "center",
    marginBottom: "10%",
    fontFamily: "SemiBold",
    width: 200,
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
    width: "74%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  subtitleText: {
    fontSize: 12,
  },
  errorBorder: {
    borderColor: "red",
    borderWidth: 1,
  },
});
