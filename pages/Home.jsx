import React from 'react'
import { Text, View, Button, StyleSheet, Image } from 'react-native'

const Home = ({navigation}) => {
  return (
    <View>
      <Image source={require('../assets/icon.png')} style={styles.image}/>
      <Text>Welcome to Bibliotwist! With our user-friendly book-finding app, exploring new genres and authors has never been easier. Happy reading and happy discoveries!</Text>
      <Button title='Start' onPress={()=>navigation.navigate('Search')}/>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100
  }
});

export default Home