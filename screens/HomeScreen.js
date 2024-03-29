import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native'
import React from 'react'
import Bar from '../components/Bar';

export default function HomeScreen() {
  StatusBar.setBackgroundColor("#ad3103");
  StatusBar.setBarStyle("light-content")

  return (
    <View style={styles.container}>
      <Bar />
      <Text>Ana sayfa ekranı</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#fff",
    flex: 1,
  }
})