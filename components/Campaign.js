import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function Campaign({ email }) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true); // Yükleniyor durumu eklendi

  useEffect(() => {
    const pipeline = doc(db, "Kullanicilar", email);
    const unsubscribe = onSnapshot(pipeline, (doc) => {
      setIsLoading(false); // Veri alındıktan sonra yükleniyor durumunu kapat
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ad3103" />
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.box1, styles.box]}
        activeOpacity={1}
        onPress={() => navigation.navigate("favoriler", { user_mail: email })}
      >
        <View style={styles.textContainer}>
          <Text style={styles.campaignTitle}>Favoriler</Text>
          <Text style={styles.campaignsubTitleRightBox}>
            En çok tercih edilenler
          </Text>
        </View>
        <View style={styles.imageContainerRight}>
          <Image
            source={require("../assets/box1.webp")}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.box2, styles.box]}
        activeOpacity={1}
        onPress={() => navigation.navigate("restoranlar", { user_mail: email })}
      >
        <View style={styles.textContainer}>
          <Text style={styles.campaignTitle}>Restoranlar</Text>
          <Text style={styles.campaignsubTitleLeftBox}>Özel Lezzetler</Text>
        </View>
        <View style={styles.imageContainerLeft}>
          <Image
            source={require("../assets/box3.png")}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.box2, styles.box]}
        activeOpacity={1}
        onPress={() => navigation.navigate("gelAl", { user_mail: email })}
      >
        <View style={styles.textContainer}>
          <Text style={styles.campaignTitle}>Gel Al</Text>
          <Text style={styles.campaignsubTitleLeftBox}>
            {" "}
            Özel indirimleri kaçırma
          </Text>
        </View>
        <View style={styles.imageContainerLeft}>
          <Image
            source={require("../assets/box2.png")}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: "#fff",
  },

  box: {
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    overflow: "hidden",
    width: "45%",
    aspectRatio: 1,
  },
  box1: {
    position: "absolute",
    right: 20,
    top: 20,
    width: "38%",
    height: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 10,
    overflow: "hidden",
    aspectRatio: 1,
  },
  box2: {
    width: "45%",
    height: "37%",
    backgroundColor: "#fff",
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    justifyContent: "center",
    elevation: 10,
    alignItems: "center",
    overflow: "hidden",
  },
  
  imageContainerRight: {
    marginTop: 100,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    position: "absolute",
    alignSelf: "flex-start",
    zIndex: 1,
    top: 20,
    left: 10,
  },
  campaignTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  imageContainerLeft: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 100,
    marginTop: 61,
  },
  campaignsubTitleRightBox: {
    maxWidth: "99%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: "bold",
  },
});
