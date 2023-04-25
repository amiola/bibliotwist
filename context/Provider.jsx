import React, { useEffect, useState } from 'react'
import Context from './Context'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Provider = ({children}) => {

  const [results,setResults]=useState([])
  const [favs,setFavs]=useState([])
  const [favsIDs,setFavsIDs]=useState([])

  const addFav = (index, id)=>{
    setFavsIDs(curFavsIDs=>[...curFavsIDs,id]);
    setFavs(curFavs=>[...curFavs,results[index]])
  }

  const removeFav = (id)=>{
    setFavsIDs(favsIDs.filter((fID)=>(
      fID!==id
    )));
      setFavs(favs.filter(fav=>(
        fav.canonical_isbn!==id
      )))
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('01', jsonValue)
    } catch (e) {
      console.log(`Error: ${e}`)
    }
  }

  
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('01')
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch(e) {
    console.log(e)
  }
}

useEffect(()=>{
storeData(favs)
},[favs])

const takeData = async()=>{
  data = await getData();
  console.log(data)
  return data;
}
takeData()

// (()=>{
//   setFavs(takeData())
// })()

  return (
    <Context.Provider
    value={{
      results,
      setResults,
      favs,
      setFavs,
      favsIDs,
      setFavsIDs,
      addFav,
      removeFav
    }}
    >
        {children}
    </Context.Provider>
  )
}

export default Provider