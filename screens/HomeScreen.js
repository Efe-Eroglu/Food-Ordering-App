import { StyleSheet, View, StatusBar, Platform } from "react-native";
import React, { useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Bar from "../components/Bar";
import Campaign from "../components/Campaign";
import Restaurants from "../components/Restaurants";
import { useRoute } from "@react-navigation/native";

export default function HomeScreen() {
  
  useEffect(() => {
    StatusBar.setBackgroundColor("#ad3103");
    StatusBar.setBarStyle("light-content");
  }, []);

  const route = useRoute();
  const { user_mail } = route.params;

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        enableOnAndroid={true}
      >
        <Bar email={user_mail} />
        <Restaurants user_mail={user_mail} />
        <Campaign email={user_mail} />
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
