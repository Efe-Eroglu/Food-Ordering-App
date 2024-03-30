import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function Campaign() {
  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.box1} activeOpacity={0.7}>
        <View>
          <Text>Sana Özel</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box2} activeOpacity={0.7}>
        <View>
          <Text>Gel Al</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box2} activeOpacity={0.7}>
        <View>
          <Text>İndirimli mağazalar</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: "#efef61",
  },
  box1:{
    position:"absolute",
    right:20,
    top:20,
    width:"40%",
    height:"90%",
    backgroundColor:"red",
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center"
  },
  box2:{
    width:"45%",
    height:"40%",
    backgroundColor:"lime",
    marginVertical:20,
    marginHorizontal:20,
    borderRadius:20,
    justifyContent:"center",
    alignItems:"center",
  }
});
