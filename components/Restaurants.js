import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Restaurants() {
  return (
    <View style={styles.container}>
      <Text>Restaurants</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:4,
        backgroundColor:"aqua"
    }
})