import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, ScrollView, Pressable, Button } from 'react-native';
import Search from '../components/Search';
import { useState } from 'react';
import Result from '../components/Result';

export default function SearchPage({navigation}) {

  const titleUrl = 'https://book-finder1.p.rapidapi.com/api/search?title=';
  const pagesUrl = '&results_per_page=25&page='
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/octet-stream',
      'X-RapidAPI-Key': '3837ec823amshddf2ad4c132822bp1306e6jsn773992c6bda8',
      'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com'
    }
  };

    const [results,setResults]=useState([])
    const [totalResults,setTotalResults]=useState(0)
    const [curPage,setCurPage]=useState(1)
    const [totalPages,setTotalPages]=useState(0)

    const getResults = async (query)=>{
      const url = titleUrl + query.split(' ').join('%20') + pagesUrl + curPage
      const res = await fetch(url, options);
      const data = await res.json();
      setResults(data.results);
      setTotalResults(data.total_results);
      setTotalPages(data.total_pages)
    }

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
    });
  }

  

  return (
    <>
    <StatusBar style='light'/>
    <Search onSearch={getResults}/>
    <View style={styles.resultsContainer} >
      {totalResults!==0 && (<View style={styles.head}>
      <Text>Results found: {totalResults}</Text>
      <View style={curPage===1?styles.hidden:''}>
      <Button title='<'/>
      </View>
      <Text>Page {curPage} - {totalPages}</Text>
      <View style={curPage===totalPages?styles.hidden:''}>
      <Button title='>'/>
      </View>
      </View>)}
      <FlatList
      style={styles.list}
      data={results}
      renderItem={ itemData=>{
        return (
          <Pressable
          android_ripple={{color: '#dddddd'}}
          style={({pressed})=> pressed && styles.pressedItem}
          onPress={()=>searchBook(itemData)}
          >
          <Result key={itemData.index}
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
  },
  list:{
    marginBottom: 100
  },
  head:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'

  },
  hidden:{
    display: 'none'
  }
});
