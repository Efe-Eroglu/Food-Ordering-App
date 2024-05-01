import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "./cartAction";
import PastOrderBar from "../components/PastOrderBar";

export default function CartScreen() {
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const getTotalPrice = () => {
    if (cartItems.length === 0) {
      return 0;
    }

    const totalPrice = cartItems.reduce(
      (total, item) => total + parseFloat(item.price),
      0
    );
    return totalPrice;
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.img }}
        style={styles.itemImage}
        resizeMode="cover"
      />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemContent}>{item.content.join(", ")}</Text>
      </View>
      <Text style={styles.itemPrice}>{item.price}₺</Text>
      <TouchableOpacity
        onPress={() => removeItem(item.id)}
        style={styles.removeButton}
      >
        <Text style={styles.removeButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  const handleCheckout = () => {
    // Ödeme işlemi burada yapılacak
    alert("Ödeme işlemi başarılı!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sepet Ürünleri</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id + index.toString()}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Toplam: {getTotalPrice().toFixed(2)}₺
        </Text>
        <TouchableOpacity
          onPress={handleCheckout}
          style={styles.checkoutButton}
        >
          <Text style={styles.checkoutButtonText}>Ödeme Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontWeight: "bold",
  },
  itemContent: {
    color: "gray",
  },
  itemPrice: {
    fontWeight: "bold",
    fontSize: 16,
  },
  removeButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "#c2350a",
    margin: 10,
  },
  removeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  totalContainer: {
    alignItems: "flex-end",
    marginTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#d9440d",
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
    width: "100%",
  },
  checkoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
