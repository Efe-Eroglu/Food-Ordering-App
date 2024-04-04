import { StyleSheet, Text, View, StatusBar, Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import RegisterScreen from "./screens/RegisterScreen";
import UserLoginScreen from "./screens/UserLoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import CartScreen from "./screens/CartScreen";
import SingoutPop from "./components/SingoutPop";
import GelAl from "./screens/GelAl";
import Favoriler from "./screens/Favoriler";
import SanaOzel from "./screens/SanaOzel";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="#fff"
        barStyle={Platform.OS === "ios" ? "dark-content" : "dark-content"}
        hidden={false}
        translucent={false}
      />
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={UserLoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="forgotPassword"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="cart"
          component={CartScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="carousel"
          component={SingoutPop}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="gelAl"
          component={GelAl}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="favoriler"
          component={Favoriler}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="sanaOzel"
          component={SanaOzel}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
