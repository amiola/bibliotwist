import React from 'react'
import { Text, View, Button, StyleSheet, Image } from 'react-native'

const Home = ({navigation}) => {
  return (
    <View style={styles.container} >
      <View style={styles.logo}>
      <Image source={require('../assets/logo.png')} style={styles.image}/>
      <Text style={styles.bbt}>bibliotwist</Text>
      </View>
      <Text style={styles.welcome}>Welcome to Bibliotwist! With our user-friendly book-finding app, exploring new genres and authors has never been easier. Happy reading and happy discoveries!</Text>
      <View style={styles.btn}>
      <Button title='Start exploring!' onPress={()=>navigation.navigate('Search')}/>
      </View>
      <View style={styles.btn}>
      <Button title='Favourite books' onPress={()=>navigation.navigate('Favs')} color='orange'/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    alignItems: 'center'
  },
  logo:{
    flexDirection: 'row',
    marginVertical: 100,
    alignItems: 'center'
  },
  image: {
    width: 75,
    height: 50,
  },
  welcome:{
    marginTop: 50,
    marginBottom: 20,
    marginHorizontal: 10,
    fontSize: 17,
    color: 'white'
  },
  bbt:{
    fontSize: 40,
    marginLeft: 10,
    color: 'white'
  },
  btn:{
    width: 200,
    marginVertical: 10
  }

});

export default Home