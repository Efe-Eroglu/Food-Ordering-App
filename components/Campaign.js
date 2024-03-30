import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Campaign() {
  return (
    <View style={styles.container}>
      <Text>Campaign</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:6,
        backgroundColor:"#efef61"
    }
})
