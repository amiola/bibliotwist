import React, { useContext } from 'react'
import Context from '../context/Context'
import { Text, StyleSheet, View, FlatList, Pressable, SafeAreaView } from 'react-native'
import Result from '../components/Result'

const Favs = ({navigation}) => {

  const {favs}=useContext(Context)

  const searchBook = async function(itemData){
    navigation.navigate('Book',{
    name:`${itemData.item.title}`,
    id:`${itemData.item.canonical_isbn}`,
    subcategories: `${itemData.item.subcategories}`,
    image: `${itemData.item.published_works[0].cover_art_url}`,
    authors: `${itemData.item.authors}`,
    year: `${itemData.item?.copyright}`,
    summary: `${itemData.item.summary}`,
    maxAge: `${itemData.item.max_age}`,
    minAge: `${itemData.item.min_age}`,
    pageCount: `${itemData.item.page_count}`,
    key: `${itemData.index}`
  });
}

  return (
    <>
    <SafeAreaView>
    {favs.length===0 && 
    <>
    <Text style={styles.noFavYet}>No favourite books yet...</Text>
    <Text style={styles.noFavYet}>Please, go search a book, pick one and add it here!</Text>
    <Text style={styles.noFavYet}>✨ 📚 ✨</Text>
    </>}

    <FlatList
    style={styles.list}
    data={favs}
    renderItem={itemData=>{
      return (
        <Pressable
          android_ripple={{color: '#dddddd'}}
          style={({pressed})=> pressed && styles.pressedItem}
          onPress={()=>searchBook(itemData)}
          >
          <Result key={itemData.index}
          id={itemData.item.canonical_isbn}
          title={itemData.item.title}
          subcategories={itemData.item.subcategories}
          image={itemData.item.published_works[0].cover_art_url}
          authors={itemData.item.authors}
          year={itemData.item?.copyright}
          />
          </Pressable>
      )
    }}
    >
    </FlatList>
    </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  noFavYet:{
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    marginTop: 50,
    marginHorizontal: 30
  },
  list:{
    marginBottom: 20
  }
})

export default Favs