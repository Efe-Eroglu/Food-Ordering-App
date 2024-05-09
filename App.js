import { StyleSheet, Text, View, StatusBar, Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux"; // Redux'u ekleyin
import store from "./screens/store";

import RegisterScreen from "./screens/RegisterScreen";
import UserLoginScreen from "./screens/UserLoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import CartScreen from "./screens/CartScreen";
import SingoutPop from "./components/SingoutPop";
import GelAl from "./screens/GelAl";
import Favoriler from "./screens/Favoriler";
import Restoranlar from "./screens/Restoranlar";
import AccountDetailsScreen from "./screens/AccountDetailsScreen";
import PastOrdersScreen from "./screens/PastOrdersScreen";
import HelpScreen from "./screens/HelpScreen";
import RestaurantMenu from "./screens/RestaurantMenu";
import PayloadScreen from "./screens/PayloadScreen";
import Coupons from "./screens/Coupons";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
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
            name="restoranlar"
            component={Restoranlar}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="hesapDetay"
            component={AccountDetailsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="gecmisSiparis"
            component={PastOrdersScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="yardim"
            component={HelpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="restoranMenu"
            component={RestaurantMenu}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="odeme"
            component={PayloadScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="kupon"
            component={Coupons}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
