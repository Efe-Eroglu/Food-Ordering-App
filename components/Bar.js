import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchBar from "./SearchBar";
import { Feather } from "@expo/vector-icons";
import { auth } from "../firebase";
import DetailsMenu from "./DetailsMenu";

export default function Bar() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <KeyboardAvoidingView behavior="height">
      <View style={styles.container}>
        <View style={styles.addresContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setModalVisible(true)} // Modal'ı açmak için
            >
              <Feather name="menu" size={26} color="white" />
            </TouchableOpacity>

            <View style={{ marginLeft: 18 }}>
              <Text style={styles.addresTitle}>Ataşehir mahallesi</Text>
              <Text style={styles.addresContent}>
                Elazığ Merkez Elazığ 23100
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate("cart")}
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

        {/* Modal */}
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
            <DetailsMenu />
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
});
