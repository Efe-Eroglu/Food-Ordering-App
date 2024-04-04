import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

export default function Favoriler() {
  useEffect(() => {
    StatusBar.setBackgroundColor("#ad3103");
    StatusBar.setBarStyle("light-content");
  }, []);

  
  return (
    <View>
      <Text>Favoriler</Text>
    </View>
  )
}

const styles = StyleSheet.create({})