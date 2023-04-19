import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Search from './components/Search';
import { useState } from 'react';
import Result from './components/Result';

export default function App() {

  const searchUrl = 'https://hapi-books.p.rapidapi.com/search/'

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '3837ec823amshddf2ad4c132822bp1306e6jsn773992c6bda8',
      'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
    }
  };

    const [results,setResults]=useState([])

    const getResults = (query)=>{
      const url = searchUrl + query.split(' ').join('+')
      const request = fetch(url, options);
      request.then((res)=>res.json()).then((data)=>{
        setResults(data)
      })
    }


  return (
    <>
    <StatusBar style='light'/>
    <Search onSearch={getResults}/>
    <View style={styles.resultsContainer} >
      <Text>Results found: {results.length}</Text>
      <View>
        {results.map((res,i)=>(
    <Result key={i} title={res.name} rating={res.rating}/>
  ))}
      </View>
      {/* <FlatList
      data={results}
      renderItem={ itemData=>{
        return <Result title={itemData.item.title} description={itemData.item.description}/>
      }}
      >
      </FlatList> */}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  resultsContainer: {
    margin: 10
  }
});
