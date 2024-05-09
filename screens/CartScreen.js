import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, decreaseQuantity, increaseQuantity } from "./cartAction";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function CartScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    StatusBar.setBackgroundColor("#ad3103");
    StatusBar.setBarStyle("light-content");
  }, []);

  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const route = useRoute();
  const { user_mail } = route.params;

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };
 
  const decreaseItemQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const increaseItemQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const getTotalPrice = () => {
    if (cartItems.length === 0) {
      return 0;
    }

    const totalPrice = cartItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
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
      <View style={styles.itemRight}>
        <Text style={styles.itemPrice}>{item.price}₺</Text>
        <View style={styles.itemQuantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => decreaseItemQuantity(item.id)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => increaseItemQuantity(item.id)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('odeme', { user_mail: user_mail });
    }, 2000); 
  };

  const returnToHomePage = () => {
    navigation.navigate('home', { user_mail: user_mail });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sepet Ürünleri</Text>
      {loading ? ( 
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#d9440d" />
          <Text style={styles.loadingText}>Ödeme Ekranına Yönlendiriliyorsunuz...</Text>
        </View>
      ) : (
        <>
          {cartItems.length === 0 ? (
            <View style={styles.emptyCartContainer}>
              <Text style={styles.emptyCartText}>Sepetiniz şu anda boş.</Text>
              <TouchableOpacity
                onPress={returnToHomePage}
                style={styles.returnButton}
              >
                <Text style={styles.returnButtonText}>Ana Sayfaya Dön</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={cartItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          )}

          {cartItems.length > 0 && (
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
          )}
        </>
      )}
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
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Roboto",
  },
  returnButton: {
    backgroundColor: "#d9440d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  returnButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
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
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemPrice: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 10,
  },
  itemQuantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#d9440d",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    color: "white",
    fontSize: 18,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
