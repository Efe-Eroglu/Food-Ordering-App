import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function Campaign() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box1} activeOpacity={0.7}>
        <View style={styles.textContainer}>
          <Text style={styles.campaignTitle}>Gel Al</Text>
          <Text style={styles.campaignsubTitleRightBox}>Özel indirimleri kaçırma</Text>
        </View>
        <View style={styles.imageContainerRight}>
          <Image
            source={require("../assets/box1.webp")}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box2} activeOpacity={0.7}>
        <View style={styles.imageContainerLeft}>
          <View style={styles.textContainerLeftBoxes}>
            <Text style={styles.campaignTitle}>Gel Al</Text>
            <Text style={styles.campaignsubTitleLeftBox}>Sana Özel</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box2} activeOpacity={0.7}>
        <View style={styles.imageContainerLeft}>
          <View style={styles.textContainerLeftBoxes}>
            <Text style={styles.campaignTitle}>Sana Özel</Text>
            <Text style={styles.campaignsubTitleLeftBox}>Sana Özel</Text>
          </View>
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
    marginTop:100,
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
    position:"absolute",
    alignSelf: "flex-start",
    zIndex:1,
    top:20,
    left:10,
  },
  campaignTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textContainerLeftBoxes:{
    position:"absolute",
    top:0,
    left:0
  },
  imageContainerLeft:{

  },
  campaignsubTitleRightBox:{
    maxWidth:"99%",
  }
});
