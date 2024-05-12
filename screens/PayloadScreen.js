import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  StatusBar,
} from "react-native";
import { useDispatch } from "react-redux";
import { clearCart } from "./cartAction";
import { useNavigation, useRoute } from "@react-navigation/native";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Icon from "react-native-vector-icons/FontAwesome";

export default function PayloadScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    StatusBar.setBackgroundColor("#fff");
    StatusBar.setBarStyle("dark-content");
  }, []);

  const route = useRoute();
  const { user_mail } = route.params;

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [cardNameError, setCardNameError] = useState(false);
  const [cardNumberError, setCardNumberError] = useState(false);
  const [expiryDateError, setExpiryDateError] = useState(false);
  const [cvvError, setCvvError] = useState(false);
  const [cardNumberLengthError, setCardNumberLengthError] = useState(false);

  const handlePayment = () => {
    if (!cardName || !cardNumber || !expiryDate || !cvv) {
      setCardNameError(!cardName);
      setCardNumberError(!cardNumber);
      setExpiryDateError(!expiryDate);
      setCvvError(!cvv);
      return;
    }

    const isValidExpiryDate = expiryDate.match(/^\d{2}\/\d{2}$/);
    const isValidCvv = cvv.match(/^\d{3}$/);
    const isValidCardNumber = validateCardNumber(cardNumber.replace(/\D/g, ""));

    if (!isValidExpiryDate) {
      setExpiryDateError(true);
      return;
    }

    if (!isValidCvv) {
      setCvvError(true);
      return;
    }

    if (!isValidCardNumber) {
      setCardNumberLengthError(true);
      return;
    }

    setTimeout(() => {
      setPaymentSuccess(true);
    }, 1000);
  };

  const validateCardNumber = (input) => {
    return input.length === 16;
  };

  const handleChangeExpiryDate = (input) => {
    setExpiryDate(formatExpiryDate(input));
  };

  const formatExpiryDate = (input) => {
    const formatted = input.replace(/\D/g, "").slice(0, 4);
    if (formatted.length <= 2) {
      return formatted;
    }
    return `${formatted.slice(0, 2)}/${formatted.slice(2)}`;
  };

  const handleInputFocus = (input) => {
    switch (input) {
      case "cardName":
        setCardNameError(false);
        break;
      case "cardNumber":
        setCardNumberError(false);
        setCardNumberLengthError(false);
        break;
      case "expiryDate":
        setExpiryDateError(false);
        break;
      case "cvv":
        setCvvError(false);
        break;
      default:
        break;
    }
  };

  const maskCardNumber = (input) => {
    let formatted = input.replace(/\D/g, "").slice(0, 19);
    if (formatted.length > 4) {
      formatted = formatted.match(/.{1,4}/g).join("-");
    }
    setCardNumber(formatted);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Kart Bilgileri</Text>

      <View style={styles.card}>
        <Text style={styles.icons}>
          <Icon name="cc-visa" size={30} color="#000" />{"    "}
          <Icon name="cc-mastercard" size={30} color="#000" />{"    "}
          <Icon name="cc-amex" size={30} color="#000" />{"   "}
          <Icon name="cc-paypal" size={30} color="#000" /> {"   "}
          <Icon name="cc-discover" size={30} color="#000" />{"   "}
          <Icon name="cc-jcb" size={30} color="#000" />
        </Text>

        <TextInput
          style={[styles.input, cardNameError && styles.inputError]}
          placeholder="Kart Üzerindeki İsim"
          value={cardName}
          onChangeText={setCardName}
          onFocus={() => handleInputFocus("cardName")}
          selectionColor={"#823d0c"}
        />
        <TextInput
          style={[
            styles.input,
            cardNumberError && styles.inputError,
            cardNumberLengthError && styles.inputError,
          ]}
          placeholder="Kart Numarası"
          value={cardNumber}
          onChangeText={maskCardNumber}
          onFocus={() => handleInputFocus("cardNumber")}
          selectionColor={"#823d0c"}
          keyboardType="numeric"
          maxLength={19}
        />
        <View style={styles.row}>
          <TextInput
            style={[
              styles.input,
              styles.halfInput,
              expiryDateError && styles.inputError,
            ]}
            placeholder="MM/YY"
            value={expiryDate}
            onChangeText={handleChangeExpiryDate}
            maxLength={5}
            onFocus={() => handleInputFocus("expiryDate")}
            selectionColor={"#823d0c"}
            keyboardType="numeric"
          />
          <TextInput
            style={[
              styles.input,
              styles.halfInput,
              cvvError && styles.inputError]}
            placeholder="CVV"
            value={cvv}
            onChangeText={setCvv}
            onFocus={() => handleInputFocus("cvv")}
            selectionColor={"#823d0c"}
            keyboardType="numeric"
            maxLength={3}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePayment}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Ödeme Yap</Text>
        </TouchableOpacity>
        <Modal
          visible={paymentSuccess}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setPaymentSuccess(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Ödeme işleminiz başarılı!</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.closeButton}
                onPress={() => {
                  setPaymentSuccess(false);
                  dispatch(clearCart());
                  navigation.navigate("home", { user_mail: user_mail });
                }}
              >
                <Text style={styles.closeButtonText}>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 20,
    width: "100%",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  inputError: {
    borderColor: "red",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    flex: 1,
    marginRight:5,
  },
  button: {
    backgroundColor: "#d9440d",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#d9440d",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 50,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  icons:{
    marginBottom:10
  }
});