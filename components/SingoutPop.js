import React, { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFonts } from "expo-font";

export default function SingoutPop() {
  const [fontsLoaded, fontError] = useFonts({
    Light: require("../assets/fonts/Quicksand-Light.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.signoutContainer}>
      <View style={styles.box}>
        <Text style={styles.boxTitle}>
          Çıkış yapmak istediğinize emin misiniz?
        </Text>
        <TouchableOpacity style={styles.signOutbutton}>
          <Text style={styles.signOutbuttonText}> Çıkış Yap </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signoutContainer: {
    backgroundColor: "rgba(242, 237, 237,0.5)",
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  signOutbuttonText: {
    color: "#fff",
    fontSize: 16,
  },
  signOutbutton: {
    width: 100,
    backgroundColor: "pink",
    borderRadius: 30,
    alignItems: "center",
    width: "50%",
    height: "20%",
    justifyContent: "center",
  },
  box: {
    width: 300,
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  boxTitle: {
    fontSize: 20,
    textAlign: "center",
    maxWidth: "80%",
    fontFamily: "Light",
  },
});
