import { View, Text,StyleSheet, Image, ImageBackground, Button, Linking, ScrollView, Pressable } from 'react-native'
import React, { useContext } from 'react'
import Context from '../context/Context'

const Book = (props) => {

  const {favsIDs,addFav,removeFav} =useContext(Context)

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
      <Button title="BUY" onPress={handlePress}  />
    );
  };

  const addToFavs = ()=>{
    addFav(props.value,props.id)
  }

  const removefromFavs =()=>{
    removeFav(props.id)
  }

  return (
    <>
      <ScrollView>
      <ImageBackground source={{uri:props.image}} style={styles.backImg}>
      </ImageBackground>
      <Image source={{uri:props.image}} style={styles.image}/>
      <View style={styles.btns}>
      <View style={styles.readBtn}>
      <ExternalLink/>
      </View>
      { !favsIDs.includes(props.id) && <View style={styles.favBtn}>
      <Button title='ADD TO FAVS' color='green' onPress={addToFavs}/>
      </View>}
      { favsIDs.includes(props.id) && <View style={styles.favBtn}>
      <Button title='REMOVE FROM FAVS' color='orange' onPress={removefromFavs}/>
      </View>}
      </View>
      <Text style={styles.title}>{props.name}</Text>
      <View style={styles.box}>
      <Text style={styles.authors}>{props.authors.split(',').join(', ')} ({props.year})</Text>
      <Text style={styles.title2}>Suggested age: <Text style={styles.text}>{props.minAge === 'null'? 'any':props.minAge} - {props.maxAge === 'null'? 'any':props.maxAge} years old</Text></Text>
      <Text style={styles.title2}>Page count: <Text style={styles.text}>{props.pageCount}</Text></Text>
      </View>
      <View style={styles.categories}>{props.subcategories.split(',').map((cat,i)=>(
            <Pressable key={i}><Text style={styles.category}>{cat}</Text></Pressable>
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
  marginHorizontal: 5,
  color: 'white'
},
title2:{
  fontSize: 14,
  fontWeight: 400,
  marginLeft: 5,
  color: 'white'
},
authors:{
  // color: 'green',
  fontSize: 16,
  marginHorizontal: 5,
  fontWeight: 500,
  color: 'white'
},
btns:{
  marginTop: 20,
  flexDirection: 'row',
  justifyContent: 'space-around'
},
readBtn:{
  marginTop: 10,
  width: 100
},
favBtn:{
  marginTop: 10
},
synopsis:{
  fontSize: 13,
  marginHorizontal: 15,
  lineHeight: 17,
  marginBottom: 10,
  color: 'white'
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
  borderRadius: 10,
  color: 'white'
},
text: {
  fontSize: 14,
  fontWeight: 300,
  color: 'white'
}
})

export default Book