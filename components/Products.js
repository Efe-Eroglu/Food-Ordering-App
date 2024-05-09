import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../screens/cartAction';
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import * as Animatable from 'react-native-animatable';

const Products = ({ user_mail, restauran_name }) => {
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, restauran_name));
      const fetchedProducts = [];
      querySnapshot.forEach((doc) => {
        fetchedProducts.push({ id: doc.id, ...doc.data(), quantity: 0 });
      });
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.leftSide}>
        <Image source={{ uri: item.img }} style={styles.image} resizeMode="stretch" />
      </View>
      <View style={styles.rightSide}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.content}>{item.content.join(", ")}</Text>
        <View style={styles.price}>
          <Text style={{ fontSize: 14 }}>{item.price}₺</Text>
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
  );

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
    }, 3000); // 3 saniye sonra bildirimi kaldır
  };

  const Notification = () => {
    return (
      <Animatable.View animation="slideInUp" duration={1000} style={styles.notification}>
        <Text style={styles.notificationText}>{notification}</Text>
      </Animatable.View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      {notification && <Notification />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  card: {
    width: 350,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 20,
    flexDirection: "row",
    margin: 5,
    overflow: "hidden",
    padding: 5,
    borderWidth: 1,
    borderColor: "silver",
  },
  leftSide: {
    flex: 2,
  },
  rightSide: {
    flex: 3,
    marginLeft: 10,
    marginTop: 5,
  },
  image: {
    borderRadius: 20,
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  name: {
    fontWeight: "bold",
  },
  content: {
    fontSize: 12,
    color: "gray",
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
  },
  price: {
    justifyContent: "space-between",
    alignContent: "center",
    flexDirection: "row",
    marginTop: 5,
  },
  quantity: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
  },
  notification: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 10,
    borderRadius: 5,
  },
  notificationText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default Products;
