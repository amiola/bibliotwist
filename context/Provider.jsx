import React, { useEffect, useState } from 'react'
import Context from './Context'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Provider = ({children}) => {

  const [entered,setEntered]=useState('')
  const [results,setResults]=useState([])
  const [favs,setFavs]=useState([])
  const [favsIDs,setFavsIDs]=useState([])
  const [prevValues,setPrevValues]=useState([])

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
// console.log('FAVS: '+favs)
},[favs])

const takeData = ()=>{
  getData().then(data=>{
    setPrevValues(data)
  });
}

useEffect(()=>{
  setFavs(prevValues)
  // console.log(prevValues)
},[prevValues])

useEffect(()=>{
takeData()
},[])

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
      removeFav,
      entered,
      setEntered
    }}
    >
        {children}
    </Context.Provider>
  )
}

export default Provider