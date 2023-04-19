import { useEffect, useState } from "react"
import { TextInput, Text, View, Button, StyleSheet } from "react-native"

const Search = (props) => {
    const [enteredQuery,setEnteredQuery]=useState('')

    const searchInputHandler = (enteredText) =>{
        setEnteredQuery(enteredText)
    }

    const onSearchHandler =function(){
           props.onSearch(enteredQuery);
    }

  return (
    <>
    <View style={styles.searchConatiner}>
    <TextInput placeholder="Search any title, author or category..." style={styles.input} onChangeText={searchInputHandler} />
    <View  style={styles.btn}>
    <Button title='Search' 
    onPress={onSearchHandler}
    />
    </View>
    </View>
    </>
  )
}

export default Search

const styles = StyleSheet.create({
    searchConatiner: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 50,
        marginHorizontal: 10,
    },
  input:{
    flex: 3,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'lightgray',
    color: 'white',
    marginRight: 10
  },
  btn:{
    flex: 1
  }
});
