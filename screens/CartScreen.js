import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CartBar from '../components/CartBar'

export default function CartScreen() {
  return (
    <View>
      <CartBar />
      <Text>CartScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})