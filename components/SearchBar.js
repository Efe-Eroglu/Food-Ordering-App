import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Keyboard,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../screens/cartAction";
import * as Animatable from "react-native-animatable";

export default function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [notification, setNotification] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const [restoranlar, setRestoranlar] = useState([]);
  const [tumUrunler, setTumUrunler] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Restoranlar"));
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        const names = data.map((item) => item.name);
        setRestoranlar(names);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const allProducts = [];
        for (const restoran of restoranlar) {
          const q = query(collection(db, restoran));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            allProducts.push({ id: doc.id, ...doc.data(), restoran: restoran });
          });
        }
        setTumUrunler(allProducts);
      } catch (error) {
        console.error("Error fetching all products: ", error);
      }
    };
    fetchAllProducts();
  }, [restoranlar]);

  useEffect(() => {
    const filteredData = tumUrunler.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResult(filteredData);
    if (searchText !== "") {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [searchText, tumUrunler]);

  const closeModal = () => {
    setSearchText(""); // Clear searchText when modal closes
    setModalVisible(false);
  };

  const handleBackgroundPress = () => {
    setModalVisible(false);
    Keyboard.dismiss();
  };

  const addToCartHandler = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      item.quantity = 1;
      dispatch(addToCart(item));
    }
    setNotification(`${item.name} başarıyla sepete eklendi.`);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const Notification = () => {
    return (
      <Animatable.View
        animation="slideInUp"
        duration={1000}
        style={styles.notification}
      >
        <Text style={styles.notificationText}>{notification}</Text>
      </Animatable.View>
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={handleBackgroundPress}
    >
      <View style={styles.backgroundStyle}>
        <MaterialIcons
          name="search"
          size={24}
          color="gray"
          style={styles.iconStyle}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Restoran veya ürün arayın"
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor={"gray"}
          onChangeText={setSearchText}
          value={searchText}
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              {searchText !== "" && (
                <>
                  {searchResult.length > 0 ? (
                    searchResult.map((item, index) => (
                      <View style={styles.cardContainer} key={index}>
                        <View style={styles.card}>
                          <View style={styles.leftSide}>
                            <Image
                              source={{ uri: item.img }}
                              style={styles.image}
                              resizeMode="stretch"
                            />
                          </View>
                          <View style={styles.rightSide}>
                            <View style={styles.content}>
                              <View style={styles.itemNameContainer}>
                                <Text style={styles.itemName}>{item.name}</Text>
                              </View>
                              <View style={styles.itemContent}>
                                {item.content.map((contentItem, index) => (
                                  <Text key={index} style={styles.contentText}>
                                    {contentItem + ","}
                                  </Text>
                                ))}
                              </View>
                              <View style={styles.price}>
                                <Text style={styles.priceText}>
                                  {"Fiyat: " + item.price + " ₺"}
                                </Text>
                                <TouchableOpacity
                                  style={styles.button}
                                  activeOpacity={0.8}
                                  onPress={() => addToCartHandler(item)}
                                >
                                  <AntDesign name="plus" size={18} color="white" />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.noResultText}>Aradığınız ürün bulunamadı.</Text>
                  )}
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
      {notification && <Notification />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconStyle: {
    marginHorizontal: 15,
  },
  inputStyle: {
    flex: 1,
    fontSize: 14,
  },
  backgroundStyle: {
    backgroundColor: "white",
    flexDirection: "row",
    margin: 10,
    height: 45,
    alignItems: "center",
    borderRadius: 30,
  },
  centeredView: {
    alignItems: "center",
    top: 135,
  },
  modalView: {
    backgroundColor: "#fcfafa",
    alignItems: "center",
    paddingVertical: 8,
    width: 350,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    width: "95%",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    maxHeight: 225,
    zIndex: 10,
    borderWidth: 0.2,
    borderColor: "#c92504",
    borderBottomWidth: 0.5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  cardContainer: {
    marginBottom: 5,
  },
  card: {
    width: 350,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 1,
    borderWidth: 1,
    borderColor: "rgba(220,220,220,0.5)",
    flexDirection: "row",
  },
  leftSide: {
    flex: 4,
  },
  rightSide: {
    flex: 6,
    margin: 10,
    justifyContent: "space-between",
  },
  itemNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemName: {
    fontWeight: "bold",
  },
  itemContent: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  contentText: {
    marginRight: 5,
    fontSize: 12,
    color: "gray",
  },
  priceText: {
    fontWeight: "bold",
    fontSize: 12,
    marginVertical: 4,
    maxWidth: 100,
  },
  button: {
    backgroundColor: "#d9440d",
    width: 27,
    height: 27,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    alignSelf: "flex-end",
    marginRight: 10,
    marginTop: 5,
  },
  price: {
    marginBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  notification: {
    position: "absolute",
    bottom: 0,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    padding: 10,
    borderRadius: 5,
    zIndex: 99999,
  },
  notificationText: {
    color: "#fff",
    textAlign: "center",
  },
  noResultText: {
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 10
  }
});
