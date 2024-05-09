import { useNavigation, useRoute } from "@react-navigation/native";
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

export default function PayloadScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const route = useRoute();
  const { user_mail } = route.params;

  useEffect(() => {
    StatusBar.setBackgroundColor("#fff");
    StatusBar.setBarStyle("dark-content");
  }, []);

  const handlePayment = () => {
    setTimeout(() => {
      setPaymentSuccess(true);
    }, 1000);
  };

  const formatExpiryDate = (input) => {
    const formatted = input.replace(/\D/g, "").slice(0, 4);
    if (formatted.length <= 2) {
      return formatted;
    }
    return `${formatted.slice(0, 2)}/${formatted.slice(2)}`;
  };

  const handleChangeExpiryDate = (input) => {
    setExpiryDate(formatExpiryDate(input));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Kart Bilgileri</Text>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Kart Üzerindeki İsim"
          value={cardName}
          onChangeText={setCardName}
          selectionColor={"#823d0c"}
        />
        <TextInput
          style={styles.input}
          placeholder="Kart Numarası"
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={setCardNumber}
          selectionColor={"#823d0c"}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="MM/YY"
            value={expiryDate}
            onChangeText={handleChangeExpiryDate}
            maxLength={5}
            keyboardType="numeric"
            selectionColor={"#823d0c"}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="CVV"
            keyboardType="numeric"
            value={cvv}
            onChangeText={setCvv}
            selectionColor={"#823d0c"}
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
                  navigation.navigate("home",{user_mail:user_mail})
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    flex: 1,
    marginRight: 10,
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
});
