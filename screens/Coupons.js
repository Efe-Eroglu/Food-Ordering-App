import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import PastOrderBar from "../components/PastOrderBar";
import { Fontisto } from "@expo/vector-icons";

export default function Coupons() {
  const navigation = useNavigation();

  const route = useRoute();
  const { user_mail } = route.params;
  const [userCoupons, setUserCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    StatusBar.setBackgroundColor("#ad3103");
    StatusBar.setBarStyle("light-content");
  }, []);

  useEffect(() => {
    const fetchUserCoupon = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "Kullanicilar", user_mail);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const coupon = data.coupon;
          setUserCoupons(coupon || []);
        }
      } catch (error) {
        console.log("Hata: ", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchUserCoupon();
  }, [user_mail]);

  const addCoupon = async () => {
    if (!couponCode) {
      Alert.alert("Uyarı", "Lütfen bir kupon kodu girin.");
      return;
    }

    setLoading(true);
    try {
      const couponRef = doc(db, "Kuponlar", couponCode);
      const couponSnap = await getDoc(couponRef);

      if (couponSnap.exists()) {
        const couponData = couponSnap.data();
        if (couponData.used && couponData.used.includes(user_mail)) {
          Alert.alert("Uyarı", "Bu kupon kodu daha önce kullanılmış.");
        } else {
          const couponExpiryDate = couponData.valid.toDate();
          if (couponExpiryDate < new Date()) {
            Alert.alert("Uyarı", "Bu kuponun geçerlilik tarihi sona erdi.");
          } else if (couponData.discount) {
            const userDocRef = doc(db, "Kullanicilar", user_mail);
            await updateDoc(userDocRef, {
              coupon: arrayUnion(couponData.discount),
            });
            setUserCoupons([...userCoupons, couponData.discount]);
            await updateDoc(couponRef, {
              used: arrayUnion(user_mail),
            });
            Alert.alert(
              "Kupon Eklendi",
              `"${couponCode}" kupon kodlu indiriminiz başarıyla eklenmiştir. Afiyet Olsun`
            );
          } else {
            Alert.alert("Uyarı", "Bu kuponun indirim değeri bulunmamaktadır.");
          }
        }
      } else {
        Alert.alert("Uyarı", "Geçersiz kupon kodu.");
      }
    } catch (error) {
      console.error("Hata:", error);
      Alert.alert("Hata", "Kupon eklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
      setCouponCode("");
    }
  };

  const returnToHomePage = () => {
    navigation.navigate("home", { user_mail: user_mail });
  };

  const renderCouponItem = ({ item }) => (
    <TouchableOpacity style={styles.couponContainer} activeOpacity={0.9}>
      <Text style={styles.couponText}>
        {item + "₺ İndirim  "}
        <Fontisto name="ticket" size={20} color="gray" />
      </Text>
      <Text style={styles.minAmount}>Minimum sepet tutarı 50 TL'dir</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <PastOrderBar title={"Kuponlar"} user_mail={user_mail} />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ad3103" />
          <Text style={styles.loadingText}>Kuponlar Yükleniyor...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Kuponlar yüklenirken bir hata oluştu.
          </Text>
          <TouchableOpacity
            style={styles.returnButton}
            activeOpacity={0.8}
            onPress={returnToHomePage}
          >
            <Text style={styles.returnButtonText}>Ana Sayfaya Dön</Text>
          </TouchableOpacity>
        </View>
      ) : userCoupons.length > 0 ? (
        <View style={styles.container}>
          <Text style={styles.header}>Size Özel Kuponlar</Text>

          <FlatList
            data={userCoupons}
            renderItem={renderCouponItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Aktif kuponunuz bulunamadı.</Text>
          <TouchableOpacity
            style={styles.returnButton}
            activeOpacity={0.8}
            onPress={returnToHomePage}
          >
            <Text style={styles.returnButtonText}>Sipariş Ver</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Kupon Ekleme Bölümü */}
      <View style={styles.addCouponContainer}>
        <TextInput
          style={styles.input}
          placeholder="Kupon Kodu"
          value={couponCode}
          onChangeText={setCouponCode}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={addCoupon}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>Ekle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginHorizontal: 20,
    marginTop: 10,
  },
  listContainer: {
    flexGrow: 1,
  },
  couponContainer: {
    padding: 15,
    backgroundColor: "#f2f2f2",
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  couponText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  minAmount: {
    fontSize: 14,
    color: "#666",
  },
  emptyText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "gray",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    maxWidth: 150,
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  returnButton: {
    backgroundColor: "#d9440d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
    maxWidth: 200,
    marginBottom: 50,
  },
  returnButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    marginBottom: 5,
  },
  addCouponContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#d9440d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
