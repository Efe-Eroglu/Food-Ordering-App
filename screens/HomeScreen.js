import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function HomeScreen() {
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