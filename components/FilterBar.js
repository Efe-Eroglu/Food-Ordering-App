import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import {
  Ionicons,
  Octicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

export default function FilterBar({
  user_mail,
  onFilter,
  onSortByName,
  onSortByNameDesc,
  onSortByDeliveryTimeAscending,
  onSortByDeliveryTimeDescending,
  onSortByRatingAscending,
  onSortByRatingDescending,
}) {
  const [deliveryPressed, setDeliveryPressed] = useState(false);
  const [sortPressed, setSortPressed] = useState(false);
  const [sortDescPressed, setSortDescPressed] = useState(false);
  const [filterPanelVisible, setFilterPanelVisible] = useState(false);
  const [radioButton, setRadioButton] = useState(null);
  const [ratingPressed, setRatingPressed] = useState(false);
  const [artan, setArtan] = useState(false);
  const [azalan, setAzalan] = useState(false);

  const toggleFilterPanel = () => {
    setFilterPanelVisible(!filterPanelVisible);
  };

  const closeFilterPanel = () => {
    setFilterPanelVisible(false);
  };

  const handleSortByName = () => {
    setRadioButton("A-Z");
    onSortByName();
    setAzalan(false);
    setArtan(false);
  };

  const handleSortByNameDesc = () => {
    setRadioButton("Z-A");
    onSortByNameDesc();
    setAzalan(false);
    setArtan(false);
  };

  const handleSortByDeliveryTimeAscending = () => {
    setRadioButton("Teslimat Süresi(Artan)");
    onSortByDeliveryTimeAscending();
    setAzalan(false);
    setArtan(false);
  };

  const handleSortByDeliveryTimeDescending = () => {
    setRadioButton("Teslimat Süresi(Azalan)");
    onSortByDeliveryTimeDescending();
    setAzalan(false);
    setArtan(false);
  };

  const handleDelivery = () => {
    setDeliveryPressed(!deliveryPressed);
    onFilter(!deliveryPressed);
    setRadioButton("");
  };

  const handleRatingDesc = () => {
    setRatingPressed(!ratingPressed);
    setSortPressed(false);
    setSortDescPressed(false);
    onSortByRatingAscending();
    setAzalan(!azalan);
    setRadioButton("");
    if (artan) {
      setArtan(false);
    }
  };

  const handleRating = () => {
    setRatingPressed(!ratingPressed);
    setSortPressed(false);
    setSortDescPressed(false);
    onSortByRatingDescending();
    setArtan(!artan);
    setRadioButton("");
    if (azalan) {
      setAzalan(false);
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        style={styles.cart}
        activeOpacity={0.8}
        onPress={toggleFilterPanel}
      >
        <Ionicons name="swap-vertical" size={13} color="gray" />
        <Text style={styles.text}>Sırala</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={filterPanelVisible}
        onRequestClose={closeFilterPanel}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={closeFilterPanel}
        >
          <View />
        </TouchableOpacity>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.headerText}>Sıralama</Text>
          </View>
          <View style={styles.modalMenu}>
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.8}
              onPress={handleSortByName}
            >
              <Text style={styles.menuText}>Alfabetik(A-Z)</Text>
              <MaterialIcons
                name={
                  radioButton === "A-Z"
                    ? "radio-button-checked"
                    : "radio-button-unchecked"
                }
                size={24}
                color={radioButton === "A-Z" ? "#f57e0f" : "gray"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.8}
              onPress={handleSortByNameDesc}
            >
              <Text style={styles.menuText}>Alfabetik(Z-A)</Text>
              <MaterialIcons
                name={
                  radioButton === "Z-A"
                    ? "radio-button-checked"
                    : "radio-button-unchecked"
                }
                size={24}
                color={radioButton === "Z-A" ? "#f57e0f" : "gray"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.8}
              onPress={handleSortByDeliveryTimeAscending}
            >
              <Text style={styles.menuText}>Teslimat Süresi(Artan)</Text>
              <MaterialIcons
                name={
                  radioButton === "Teslimat Süresi(Artan)"
                    ? "radio-button-checked"
                    : "radio-button-unchecked"
                }
                size={24}
                color={
                  radioButton === "Teslimat Süresi(Artan)" ? "#f57e0f" : "gray"
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.8}
              onPress={handleSortByDeliveryTimeDescending}
            >
              <Text style={styles.menuText}>Teslimat Süresi(Azalan)</Text>
              <MaterialIcons
                name={
                  radioButton === "Teslimat Süresi(Azalan)"
                    ? "radio-button-checked"
                    : "radio-button-unchecked"
                }
                size={24}
                color={
                  radioButton === "Teslimat Süresi(Azalan)" ? "#f57e0f" : "gray"
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={[styles.cart, { backgroundColor: artan ? "green" : "white" }]}
        activeOpacity={0.8}
        onPress={handleRating}
      >
        <Octicons name="sort-asc" size={13} color={artan ? "white" : "gray"} />
        <Text style={[styles.text, { color: artan ? "white" : "black" }]}>
          Artan
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.cart, { backgroundColor: azalan ? "green" : "white" }]}
        activeOpacity={0.8}
        onPress={handleRatingDesc}
      >
        <Octicons
          name="sort-desc"
          size={13}
          color={azalan ? "white" : "gray"}
        />
        <Text style={[styles.text, { color: azalan ? "white" : "black" }]}>
          Azalan
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.cart,
          {
            width: 133,
            marginRight: 10,
            backgroundColor: deliveryPressed ? "green" : "white",
          },
        ]}
        activeOpacity={0.8}
        onPress={handleDelivery}
      >
        <MaterialCommunityIcons
          name="truck-fast-outline"
          size={20}
          color={deliveryPressed ? "white" : "#4eb015"}
        />
        <Text
          style={[styles.text, { color: deliveryPressed ? "white" : "black" }]}
        >
          Hızlı Teslimat
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fcfbfa",
    marginBottom: 10,
  },
  cart: {
    width: 100,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "row",
    elevation: 2,
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "silver",
  },
  text: {
    fontSize: 13,
    marginHorizontal: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  modalContent: {
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
  },
  menuText: {
    fontSize: 14,
    color: "rgba(0,0,0,0.8)",
  },
  modalHeader: {
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  modalMenu: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
