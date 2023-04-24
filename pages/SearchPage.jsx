import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import Search from '../components/Search';
import { useContext, useState } from 'react';
import Result from '../components/Result';
import Context from '../context/Context';

export default function SearchPage({navigation}) {

  const searchUrl = 'https://hapi-books.p.rapidapi.com/search/'

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '3837ec823amshddf2ad4c132822bp1306e6jsn773992c6bda8',
      'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
    }
  };

  const searchBookUrl = 'https://hapi-books.p.rapidapi.com/book/';

    const options2 = {
    method: 'GET',
    headers: {
      'content-type': 'application/octet-stream',
      'X-RapidAPI-Key': '3837ec823amshddf2ad4c132822bp1306e6jsn773992c6bda8',
      'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
    }
  };

    const [results,setResults]=useState([])
    const {book,setBook}=useContext(Context)

    const getResults = (query)=>{
      const url = searchUrl + query.split(' ').join('+')
      const request = fetch(url, options);
      request.then((res)=>res.json()).then((data)=>{
        setResults(data)
      })
    }
  
  const getBook = async (bookId)=>{
    const url = searchBookUrl + bookId;
    const res = await fetch(url, options2);
    const data = await res.json()
      setBook(data)
    }

  const searchBook = async function(itemData){
      await getBook(itemData.item.book_id);
      navigation.navigate('Book',{
      name:`${itemData.item.name}`
      // bookId: `${itemData.item.book_id}`
    });
  }


  return (
    <>
    <StatusBar style='light'/>
    <Search onSearch={getResults}/>
    <View style={styles.resultsContainer} >
      <Text>Results found: {results.length}</Text>

      {/* <ScrollView>
        {results.map((res,i)=>(
    <Result key={i} title={res.name} rating={res.rating} image={res.cover} authors={res.authors} year={res.year}/>
  ))}
      </ScrollView> */}

      <FlatList
      data={results}
      renderItem={ itemData=>{
        return (
          <Pressable
          android_ripple={{color: '#dddddd'}}
          style={({pressed})=> pressed && styles.pressedItem}
          onPress={()=>searchBook(itemData)}
          >
          <Result key={itemData.index}
          title={itemData.item.name}
          rating={itemData.item.rating}
          image={itemData.item.cover}
          authors={itemData.item.authors}
          year={itemData.item.year}/>
          </Pressable>
        )
      }}
      >
      </FlatList>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  resultsContainer: {
    margin: 10
  },
  pressedItem: {
    opacity: 0.5
  }
});
