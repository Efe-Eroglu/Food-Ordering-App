import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PastOrderBar from "../components/PastOrderBar";

export default function PastOrdersScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    StatusBar.setBackgroundColor("#ad3103");
    StatusBar.setBarStyle("light-content");
  }, []);

  return (
    <View style={styles.container}>
      <PastOrderBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "silver",
    alignItems: "center",
  },
});
