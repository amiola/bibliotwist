import React, { useState } from 'react'
import Context from './Context'

const Provider = ({children}) => {

    const [book,setBook]=useState()

  return (
    <Context.Provider
    value={{book,setBook}}
    >
        {children}
    </Context.Provider>
  )
}

export default Provider