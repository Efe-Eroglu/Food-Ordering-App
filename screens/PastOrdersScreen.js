import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import PastOrderBar from "../components/PastOrderBar";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import past_orders from "../data/past_order_data";


export default function PastOrdersScreen() {
  const navigation = useNavigation();

  
  const route = useRoute();
  const { user_mail } = route.params;

  useEffect(() => {
    StatusBar.setBackgroundColor("#ad3103");
    StatusBar.setBarStyle("light-content");
  }, []);

  const renderItem = ({ item }) => (
    <View>
      <View style={styles.card}>
        <View style={styles.leftSide}>
          <Image
            source={item.image}
            style={styles.image}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.rightSide}>
          <View style={styles.content}>
            <Text>{item.name}</Text>
            <Text style={{ marginRight: 5, fontSize:12 }}>
              <Entypo name="star" size={18} color="#edd142" /> {item.rating}
            </Text>
          </View>
          <TouchableOpacity style={styles.button} activeOpacity={0.7}>
            <Text style={styles.buttonText}>Değerlendir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  return (
    <View style={styles.outcontainer}>
      <PastOrderBar title={"Geçmiş Siparişler"} user_mail={user_mail}/>

      <View style={styles.container}>
        <FlatList
          data={past_orders}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outcontainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  container: {
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  card: {
    width: 350,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
    overflow: "hidden",
    elevation: 1,
    borderWidth: 1,
    borderColor: "rgba(220,220,220,0.5)",
    flexDirection: "row",
  },
  leftSide: {
    flex: 4,
  },
  rightSide: {
    flex: 6,
    margin: 10,
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop:15,
    justifyContent:"center",
    flexDirection:"row",
    alignItems:"center",
    borderColor:"#6e2305",
    backgroundColor:"rgba(110, 35, 5,0.1)"
},
  buttonText: {
    textAlign:"center",
    padding:1.2
  },
});
