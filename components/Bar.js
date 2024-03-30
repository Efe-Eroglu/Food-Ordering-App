import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { useFonts } from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchBar from "./SearchBar";
import { useNavigation } from "@react-navigation/native";
import { Octicons } from "@expo/vector-icons";
import { auth } from "../firebase";

export default function Bar() {
  const navigation = useNavigation();

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


  const handleSingOut = () =>{
    auth.signOut().then(()=>{
      navigation.navigate("login")
    }).catch(error=>alert(error.message))
  }

  // const [visibleQuit, setVisibleQuit] = useState(false);
  // Pop up haline getirilecek

  return (
    <View style={styles.container}>
      <View style={styles.addresContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={handleSingOut}
          >
            <Octicons name="sign-out" size={24} color="white" />
          </TouchableOpacity>

          <View style={{ marginLeft: 18 }}>
            <Text style={styles.addresTitle}>Ataşehir mahallesi</Text>
            <Text style={styles.addresContent}>Elazığ Merkez Elazığ 23100</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate("cart")}
        >
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
