import React, { useContext, useEffect, useState } from 'react'
import { Text } from 'react-native'
import Book from '../components/Book'


const BookPage = ({route}) => {

  return (
    <>
    <Book 
    name={route.params.name}
    id={route.params.id}
    authors={route.params.authors}
    image={route.params.image}
    year={route.params.year}
    summary={route.params.summary}
    subcategories={route.params.subcategories}
    maxAge={route.params.maxAge}
    minAge={route.params.minAge}
    pageCount={route.params.pageCount}
    value={route.params.key}
    />
    </>
  )
}

export default BookPage