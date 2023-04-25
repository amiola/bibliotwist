import React, { useState } from 'react'
import Context from './Context'

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