import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, ScrollView, Pressable, Button, SafeAreaView } from 'react-native';
import Search from '../components/Search';
import { useState, useEffect, useContext } from 'react';
import Result from '../components/Result';
import Context from '../context/Context';

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

    const {results,setResults,setEntered}=useContext(Context)

    const [totalResults,setTotalResults]=useState(0)
    const [curPage,setCurPage]=useState(1)
    const [totalPages,setTotalPages]=useState(0)
    const [enteredQuery,setEnteredQuery]=useState()
    const [loading, setLoading]=useState(true)
    const [notFound, setNotFound]=useState(false)

    const getResults = async ()=>{
      if(!enteredQuery) return;
      const url = titleUrl + enteredQuery.split(' ').join('%20') + pagesUrl + curPage
      const res = await fetch(url, options);
      const data = await res.json();
      setResults(data.results);
      setTotalResults(data.total_results);
      setTotalPages(data.total_pages);
      if(data.total_results===0 && data.total_pages===0){
        setNotFound(true)
      }
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
      value: `${itemData.index}`
    });
  }

  useEffect(() => {
    setLoading(true);
    setNotFound(false)
    getResults().then(()=>{
      setLoading(false)
    })
  }, [enteredQuery, curPage]);

  useEffect(()=>{
    setResults([]);
    setEntered('');
  },[navigation])

  const nextPage = ()=>{
    setResults([]);
    setCurPage(curPage+1);
  }

  const prevPage =()=>{
    setResults([]);
    setCurPage(curPage-1);
  }

  const init =()=>{
    setResults([])
    setCurPage(1);
    setTotalPages(0);
    setTotalResults(0);
  }

  return (
    <>
    <StatusBar style='light'/>
    <SafeAreaView>
    <Search onSearch={init} setEnteredQuery={setEnteredQuery}/>
    <View style={styles.resultsContainer} >
      { totalResults!==0 && (<View style={styles.head}>
      <Text style={styles.res}>Results found: {totalResults}</Text>
      <View style={styles.pages}>
      <View style={curPage===1?styles.hidden:''}>
      <Button title='<' onPress={prevPage}/>
      </View>
      <Text style={styles.pagesText}>Page {curPage} - {totalPages}</Text>
      <View style={curPage===totalPages?styles.hidden:''}>
      <Button title='>' onPress={nextPage}/>
      </View>
      </View>
      </View>)}
      {loading && enteredQuery && <View style={styles.loading}><Text style={styles.loadText}>📚 Loading...</Text></View>}
      {notFound && <View style={styles.loading}>
        <Text style={styles.notFoundText}>No results found. Please, try with another title.</Text>
        <Pressable
        android_ripple={{color: '#dddddd'}}
        style={({pressed})=> pressed && styles.pressedItem}
        onPress={()=>setEntered('')}
        ><Text style={styles.notFoundIcon}>🔄</Text></Pressable>
        </View>}
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
    </View>
    </SafeAreaView>
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
    marginBottom: 210
  },
  head:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10
  },
  pages:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150
  },
  hidden:{
    display: 'none'
  },
  pagesText:{
    color: 'white',
    paddingHorizontal: 5
  },
  res:{
    color: 'white'
  },
  loading:{
    alignItems: 'center',
    marginTop: 50,
  },
  loadText:{
    fontSize: 30,
    color: 'white'
  },
  notFoundText:{
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: 'white'
  },
  notFoundIcon:{
    fontSize: 40,
    verticalAlign: 'middle',
    padding: 5
  }
});
