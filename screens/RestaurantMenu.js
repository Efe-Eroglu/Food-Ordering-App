import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PastOrderBar from "../components/PastOrderBar";
import Products from "../components/Products";
import { useRoute } from "@react-navigation/native";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function RestaurantMenu() {
  
  
  useEffect(() => {
    StatusBar.setBackgroundColor("#ad3103");
    StatusBar.setBarStyle("light-content");
  }, []);

  const route = useRoute();
  const { restauran_name } = route.params;
  
  const [income, setIncome] = useState("");

  const pipeline = doc(db,"Restoranlar",restauran_name)


  useEffect(()=>{
    onSnapshot(pipeline, (doc) => {
      setIncome(doc.data())
    })
  },[])


  console.log(income);

  return (
    <View style={styles.container}>
      <PastOrderBar title={restauran_name} />
      <View style={styles.banner}>
        <Image
          source={{uri:income.image}}
          style={styles.image}
          resizeMode="stretch"
        />
        <View style={styles.bannerText}>
          <Text style={{fontSize:20, fontStyle:"italic"}}>{income.name}</Text>
        </View>
      </View>

      <Products />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  banner: {
    width: "100%",
    height: 250,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  bannerText:{
    backgroundColor:"rgba(252, 252, 252,0.8)",
    position:"absolute",
    bottom:10,
    padding:10,
    borderTopEndRadius:20,
    borderBottomEndRadius:20
    
  }
});
