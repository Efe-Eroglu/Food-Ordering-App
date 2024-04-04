import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

export default function GelAl() {
  useEffect(() => {
    StatusBar.setBackgroundColor("#ad3103");
    StatusBar.setBarStyle("light-content");
  }, []);

  return (
    <View>
      <Text>GelAl</Text>
    </View>
  )
}

const styles = StyleSheet.create({})