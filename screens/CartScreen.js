import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CartBar from '../components/CartBar'
import { useRoute } from '@react-navigation/native';

export default function CartScreen() {

  const route = useRoute();
  const { user_mail } = route.params;



  return (
    <View>
      <CartBar user_mail={user_mail}/>
      <Text>CartScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})