import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchBar from "./SearchBar";
import { Feather } from "@expo/vector-icons";
import { auth, db } from "../firebase";
import DetailsMenu from "./DetailsMenu";
import { doc, onSnapshot } from "firebase/firestore";

export default function Bar({ email }) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [income, setIncome] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Yükleniyor durumu eklendi

  const pipeline = doc(db, "Kullanicilar", email);

  useEffect(() => {
    const unsubscribe = onSnapshot(pipeline, (doc) => {
      setIncome(doc.data());
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading || !income) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ad3103" />
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }
  

  return (
    <KeyboardAvoidingView behavior="height">
      <View style={styles.container}>
        <View style={styles.addresContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setModalVisible(true)}
            >
              <Feather name="menu" size={26} color="white" />
            </TouchableOpacity>

            <View style={{ marginLeft: 18 }}>
              <Text style={styles.addresTitle}>{income.adress}</Text>
              <Text style={styles.addresContent}>
                {income.city + "/" + income.district + " " + income.postalCode}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate("cart", { user_mail: email })}
          >
            <MaterialCommunityIcons
              name="shopping-outline"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        <View>
          <SearchBar />
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <DetailsMenu email={email} />
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ad3103",
    height: 135,
    flexDirection: "column",
  },
  addresContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 23,
    marginHorizontal: 20,
  },
  addresTitle: {
    fontWeight: "bold",
    color: "#fff",
  },
  addresContent: {
    color: "#fff",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 14,
    fontWeight:"bold"
  },
});