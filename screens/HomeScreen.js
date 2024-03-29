import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native'
import React from 'react'

export default function HomeScreen() {
  StatusBar.setBackgroundColor("#ad3103");
  StatusBar.setBarStyle("light-content")

  return (
    <View style={styles.container}>
      <Text>Ana sayfa ekranı</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  }
})