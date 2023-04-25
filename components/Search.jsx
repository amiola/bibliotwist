import { useEffect, useState } from "react"
import { TextInput, Text, View, Button, StyleSheet } from "react-native"

const Search = (props) => {

  const [entered,setEntered]=useState('')

    const searchInputHandler = (enteredText) =>{
        setEntered(enteredText)
    }

    const onSearchHandler =function(){
          props.setEnteredQuery(entered);
          props.onSearch();
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
        marginTop: 20,
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
