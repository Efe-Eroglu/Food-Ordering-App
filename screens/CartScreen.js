import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
} from "./cartAction";
import { useNavigation, useRoute } from "@react-navigation/native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Ionicons } from "@expo/vector-icons";
import PastOrderBar from "../components/PastOrderBar";

export default function CartScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [userCoupons, setUserCoupons] = useState([]);
  const [selectedCouponIndex, setSelectedCouponIndex] = useState(null);
  const [couponSectionOpen, setCouponSectionOpen] = useState(false);

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

    return cartItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
  };

  const getDiscountedPrice = () => {
    let discountedPrice = getTotalPrice();
    let discountValue = 0;

    if (selectedCouponIndex !== null) {
      discountValue = parseFloat(userCoupons[selectedCouponIndex]);
      discountedPrice -= discountValue;
    }

    discountedPrice = Math.max(discountedPrice, 50);

    if (discountedPrice === 50) {
      discountValue = getTotalPrice() - 50;
    }

    return {
      discountedPrice,
      discountValue,
    };
  };

  const renderItem = ({ item, index }) => {
    const key = item.id;

    return (
      <View key={key} style={styles.itemContainer}>
        <Image
          source={{ uri: item.img }}
          style={styles.itemImage}
          resizeMode="cover"
        />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemContent}>{item.content.join(", ")}</Text>
          <Text style={styles.itemPrice}>
            Ürün Fiyatı: {parseFloat(item.price).toFixed(2)}₺
          </Text>
        </View>
        <View style={styles.itemRight}>
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
  };

  const handleCheckout = async () => {
    setLoading(true);
  
    if (selectedCouponIndex !== null) {
      const updatedCoupons = [...userCoupons];
      updatedCoupons.splice(selectedCouponIndex, 1);
      setUserCoupons(updatedCoupons);
  
      try {
        const docRef = doc(db, "Kullanicilar", user_mail);
        await updateDoc(docRef, {
          coupon: updatedCoupons,
        });
        console.log("Kupon silindi.");
      } catch (error) {
        console.log("Hata: Kupon silinemedi", error);
      }
    }
  
    try {
      const now = new Date();
      const docRef = doc(db, "Kullanicilar", user_mail);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
  
      let pastOrders = userData.pastOrder || [];
  
      cartItems.forEach((item) => {
        pastOrders.push({
          ...item,
          orderDate: now,
          quantity: item.quantity,
        });
      });
  
      await updateDoc(docRef, {
        pastOrder: pastOrders,
      });
  
      console.log("Sepet içeriği pastOrder'a eklendi.");
    } catch (error) {
      console.log("Hata: Sepet içeriği pastOrder'a eklenemedi", error);
    }
  
    setLoading(false);
    navigation.navigate("odeme", {
      user_mail: user_mail,
      paymentSuccess: true, 
    });
  };
  
  const returnToHomePage = () => {
    navigation.navigate("home", { user_mail: user_mail });
  };

  useEffect(() => {
    async function fetchUserCoupon() {
      try {
        const docRef = doc(db, "Kullanicilar", user_mail);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const coupon = data.coupon;
          setUserCoupons(coupon);
        }
      } catch (error) {
        console.log("Hata: ", error);
      }
    }
    fetchUserCoupon().then(() => setLoading(false)); // Veritabanı işlemi tamamlandığında loading false olacak
  }, [user_mail]);


  return (
    <View style={styles.container}>
      <PastOrderBar title={"Sepet"} user_mail={user_mail} />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#d9440d" />
          <Text style={styles.loadingText}>Yükleniyor...</Text>
        </View>
      ) : (
        <>
          {cartItems.length === 0 ? (
            <View style={styles.emptyCartContainer}>
              <Text style={styles.emptyCartText}>Sepetiniz şu anda boş.</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={returnToHomePage}
                style={styles.returnButton}
              >
                <Text style={styles.returnButtonText}>Ana Sayfaya Dön</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <Text style={[styles.title, { paddingLeft: 10 }]}>
                Sepet Ürünleri
              </Text>
              <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.id} 
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}

          {cartItems.length > 0 && (
            <View style={[styles.couponContainer, { paddingHorizontal: 10 }]}>
              <TouchableOpacity
                style={styles.couponHeader}
                onPress={() => setCouponSectionOpen(!couponSectionOpen)}
              >
                <Text style={styles.couponTitle}>Kuponlarınız</Text>
                <Text style={styles.couponToggle}>
                  {couponSectionOpen ? "▼" : "▲"}
                </Text>
              </TouchableOpacity>
              {couponSectionOpen && userCoupons.length > 0 && (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.couponScrollContainer}
                >
                  {userCoupons.map((coupon, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.couponItem,
                        selectedCouponIndex === index && {
                          backgroundColor: "green",
                        },
                      ]}
                      onPress={() => {
                        if (selectedCouponIndex === index) {
                          setSelectedCouponIndex(null);
                        } else {
                          setSelectedCouponIndex(index);
                        }
                      }}
                    >
                      <Text style={styles.couponText}>
                        {coupon + "₺\nİndirim"}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
              {!couponSectionOpen && userCoupons.length === 0 && (
                <Text style={styles.emptyCouponText}>Aktif Kuponunuz Bulunamadı</Text>
              )}
            </View>
          )}

          {cartItems.length > 0 && (
            <View style={[styles.totalContainer, { paddingHorizontal: 10 }]}>
              <Text style={styles.totalText}>
                Toplam: {getTotalPrice().toFixed(2)}₺
              </Text>
              {selectedCouponIndex !== null && (
                <>
                  <Text style={styles.discountText}>
                    İndirim: -{getDiscountedPrice().discountValue.toFixed(2)}₺
                  </Text>
                  <Text style={styles.totalWithDiscountText}>
                    İndirimli Toplam:{" "}
                    {getDiscountedPrice().discountedPrice.toFixed(2)}₺
                  </Text>
                </>
              )}
            </View>
          )}

          {cartItems.length > 0 && (
            <TouchableOpacity
              onPress={handleCheckout}
              style={[styles.checkoutButton, { paddingHorizontal: 10 }]}
            >
              <Text style={styles.checkoutButtonText}>Ödeme Yap</Text>
            </TouchableOpacity>
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
  returnButton: {
    backgroundColor: "#d9440d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop:15
  },
  returnButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 10,
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
    fontSize: 14,
  },
  discountedPrice: {
    fontWeight: "bold",
    fontSize: 16,
    color: "green",
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
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
    paddingHorizontal: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  discountText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  totalWithDiscountText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  checkoutButton: {
    backgroundColor: "#d9440d",
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
    width: "95%",
    alignSelf: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  couponContainer: {
    borderTopWidth: 1,
    borderTopColor: "silver",
    paddingTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: "silver",
    paddingBottom: 10,
  },
  couponHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 8,
  },
  couponTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  couponToggle: {
    fontSize: 20,
  },
  couponScrollContainer: {
    flexGrow: 1,
    flexDirection: "row",
  },
  couponItem: {
    backgroundColor: "gray",
    padding: 25,
    marginBottom: 5,
    marginHorizontal: 5,
    borderRadius: 15,
  },
  couponText: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
  },
  emptyCouponText: {
    textAlign: "center",
    color: "rgba(0,0,0,0.5)",
    fontWeight:"bold",
    marginVertical:10,
  },
});
