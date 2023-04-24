import React, { useContext, useEffect, useState } from 'react'
import { Text } from 'react-native'
import Book from '../components/Book'
import Context from '../context/Context'

const BookPage = ({route}) => {

const {book}=useContext(Context)

console.log(book)

  return (
    <>
    <Book 
    name={book.name}
    id={book.book_id}
    authors={book.authors}
    cover={book.cover}
    pages={book.pages}
    date={book.published_date}
    rating={book.rating}
    url={book.url}
    synopsis={book.synopsis}
    />
    </>
  )
}

export default BookPage