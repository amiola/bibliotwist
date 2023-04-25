import { View, Text,StyleSheet, Image, ImageBackground, Button, Linking, ScrollView, Pressable } from 'react-native'
import React from 'react'

const Book = (props) => {

  // const bookUrl = 'https://www.amazon.com/dp/' + props.id.slice(3) + '?tag=bookfinder0c3-20'
  const bookUrl = 'https://www.bookfinder.com/search/?keywords='  + props.id + '&currency=BRL&destination=br&mode=isbn&il=en-us&classic=off&ps=tp&lang=en&st=sh&ac=qr&submit='

  const ExternalLink = () => {
    const handlePress = async () => {
      const url = bookUrl;
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
      <ImageBackground source={{uri:props.image}} style={styles.backImg}>
      </ImageBackground>
      <Image source={{uri:props.image}} style={styles.image}/>
        <View style={styles.btn}>
      <ExternalLink/>
      </View>
      <Text style={styles.title}>{props.name}</Text>
      <View style={styles.box}>
      <Text style={styles.authors}>{props.authors.split(',').join(', ')} ({props.year})</Text>
      <Text style={styles.title2}>Suggested age: <Text style={styles.text}>{props.minAge === 'null'? 'any':props.minAge} - {props.maxAge === 'null'? 'any':props.maxAge} years old</Text></Text>
      <Text style={styles.title2}>Page count: <Text style={styles.text}>{props.pageCount}</Text></Text>
      </View>
      <View style={styles.categories}>{props.subcategories.split(',').map((cat,i)=>(
            <Pressable  key={i}><Text style={styles.category}>{cat}</Text></Pressable>
        ))}
      </View>
      <Text style={styles.synopsis}>{props.summary}</Text>

    </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  box:{
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 7,
    marginHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 5

  },
backImg: {
  flex: 1,
  resizeMode: 'cover',
  opacity: 0.4,
  height: 270,
},
image:{
  width: 150,
  height: 225,
  alignSelf: 'center',
  marginTop: -250,
  marginBottom: 20,
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
title2:{
  fontSize: 14,
  fontWeight: 400,
  marginLeft: 5,
},
authors:{
  // color: 'green',
  fontSize: 16,
  marginHorizontal: 5,
  fontWeight: 500
},
btn:{
  alignSelf: 'center',
  width: 150,
  marginTop: 20
},
synopsis:{
  fontSize: 13,
  marginHorizontal: 15,
  lineHeight: 17,
  marginBottom: 10
},
categories:{
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  width: 370,
  marginTop: 10,
  marginBottom: 5
},
category:{
  fontSize: 12,
  fontWeight: 400,
  paddingHorizontal: 10,
  paddingVertical: 5,
  marginHorizontal: 5,
  marginVertical: 4,
  borderWidth: 1,
  borderColor: 'lightgray',
  borderRadius: 10
},
text: {
  fontSize: 14,
  fontWeight: 300
}
})

export default Book