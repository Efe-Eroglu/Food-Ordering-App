import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchBar from "./SearchBar";

export default function Bar() {
  const [fontsLoaded, fontError] = useFonts({
    Medium: require("../assets/fonts/Caveat-Medium.ttf"),
    SemiBold: require("../assets/fonts/Caveat-SemiBold.ttf"),
    Roboto: require("../assets/fonts/Roboto-Bold.ttf"),
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
    <View style={styles.container}>
      <View style={styles.addresContainer}>
        <View>
          <Text style={styles.addresTitle}>Ataşehir mahallesi</Text>
          <Text style={styles.addresContent}>Elazığ Merkez Elazığ 23100</Text>
        </View>
        <TouchableOpacity 
        activeOpacity={0.6}>
          <MaterialCommunityIcons
            name="shopping-outline"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      <View>
        <SearchBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ad3103",
    height: 135,
    flexDirection: "column",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  addresContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 23,
    marginHorizontal: 20,
  },
  title: {
    margin: 10,
    fontSize: 36,
    fontFamily: "Medium",
  },
  addresTitle: {
    fontWeight: "bold",
    color: "#fff",
  },
  addresContent: {
    color: "#fff",
  },
});
