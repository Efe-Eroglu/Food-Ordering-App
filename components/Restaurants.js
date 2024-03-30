import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RestaurantList from './RestaurantList'

export default function Restaurants() {
  return (
    <View style={styles.container}>
      <RestaurantList />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:4,
        backgroundColor:"aqua"
    }
})