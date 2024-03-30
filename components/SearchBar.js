import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { MaterialIcons } from '@expo/vector-icons';

export default function SearchBar() {
  return (
    <View style={styles.backgroundStyle}>
     <MaterialIcons name="search" size={24} color="gray" style={styles.iconStyle}/>
      <TextInput
        style={styles.inputStyle}
        placeholder="Restoran veya ürün arayın"
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor={"gray"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconStyle: {
    marginHorizontal: 15,
  },
  inputStyle: {
    flex: 1,
    fontSize: 14,
  },
  backgroundStyle:{
    backgroundColor:"white",
    flexDirection:"row",
    margin:10,
    height:45,
    alignItems:"center",
    borderRadius:30
  },
});
