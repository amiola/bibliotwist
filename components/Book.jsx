import { View, Text,StyleSheet, Image, ImageBackground, Button, Linking, ScrollView } from 'react-native'
import React from 'react'

const Book = (props) => {

  const ExternalLink = () => {
    const handlePress = async () => {
      const url = props.url;
      const isSupported = await Linking.canOpenURL(url);
      if (isSupported) {
        await Linking.openURL(url);
      } else {
        console.log(`Unable to open external link: ${url}`);
      }
    };
  
    return (
      <Button title="Read" onPress={handlePress}  />
    );
  };


  return (
    <>
      <ScrollView>
      <ImageBackground source={{uri:props.cover}} style={styles.backImg}>
      <Image source={{uri:props.cover}} style={styles.image}/>
      </ImageBackground>
        <View style={styles.btn}>
      <ExternalLink/>
      </View>
      <Text style={styles.title}>{props.name}</Text>
      <View style={styles.box}>
      <Text style={styles.authors}>{props.authors}</Text>
      <Text style={styles.authors}>{props.date}</Text>
      <Text style={styles.authors}>⭐ {props.rating}</Text>
      </View>
      <Text style={styles.synopsis}>{props.synopsis}</Text>

    </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  box:{
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 7,
    marginHorizontal: 10

  },
backImg: {
  flex: 1,
  // position: 'absolute',
  // top: 0,
  // left: 0,
  // width: 400,
  // height: 320, 
  resizeMode: 'cover',
  opacity: 0.4,
  height: 270,
},
image:{
  width: 150,
  height: 225,
  alignSelf: 'center',
  marginTop: 40,
  opacity: 1,
  zIndex: 2
},
title:{
  textAlign: 'center',
  fontSize: 17,
  fontWeight: 500,
  marginTop: 20,
  marginBottom: 10,
  marginHorizontal: 5
},
authors:{
  color: 'green',
  fontSize: 15,
  marginHorizontal: 5
},
btn:{
  alignSelf: 'center',
  width: 150,
  marginTop: 20
},
synopsis:{
  fontSize: 13,
  marginHorizontal: 15,
  marginVertical: 10
}
})

export default Book