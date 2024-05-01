import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Campaign({email}) {
  const navigation = useNavigation();
  console.log("Campaign : ", email);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.box1}
        activeOpacity={1}
        onPress={() => navigation.navigate("favoriler",{user_mail:email})}
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
        style={styles.box2}
        activeOpacity={1}
        onPress={() => navigation.navigate("restoranlar",{user_mail:email})}
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
        style={styles.box2}
        activeOpacity={1}
        onPress={() => navigation.navigate("gelAl",{user_mail:email })}
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
  box1: {
    position: "absolute",
    right: 20,
    top: 20,
    width: "40%",
    height: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    overflow: "hidden",
  },
  box2: {
    width: "45%",
    height: "40%",
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
});
