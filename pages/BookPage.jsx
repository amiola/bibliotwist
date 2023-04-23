import React from 'react'
import { Text } from 'react-native'

const BookPage = ({route}) => {
  return (
    <Text>Title: {route.params.name} </Text>
  )
}

export default BookPage