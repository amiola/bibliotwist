import { useContext } from "react"
import { View, StyleSheet, Text, Image } from "react-native"
import Context from "../context/Context"


const Result = (props) => {

    const {favsIDs}=useContext(Context)

  return (
    <>
    <View style={styles.resultContainer} >
        <Image source={{uri: props.image}} style={styles.image}/>
        <View style={styles.textContainer}>
        <Text numberOfLines={2} style={styles.title} >{props.title}</Text>
        <View style={styles.categories}><Text numberOfLines={2}>{
        props.subcategories.map((cat,i)=>(
            <Text style={styles.category} key={i}>{cat+`${i!== props.subcategories.length-1?' | ':''}`}</Text>
        ))
        }</Text></View>
        <Text style={styles.year}>{props.year}</Text>
        <View style={styles.finalLine}>
        <Text numberOfLines={2} style={styles.authors}>🖋 {props.authors}</Text>
        {favsIDs.includes(props.id) && <Text style={styles.heart}>❤</Text>}
        </View>
        </View>
    </View>
    </>
  )
}

export default Result

const styles = StyleSheet.create({
    resultContainer:{
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        flexDirection: 'row'
    },
    textContainer:{
        width: 250,
        marginLeft: 10,
        // marginRight: 50,
        justifyContent: 'space-between'
    },
    title:{
        fontSize: 15,
        fontWeight: 500,
        color: 'white'
    },
    categories:{
        flexDirection: 'row',
        width: 250
    },
    category:{
        fontSize: 10,
        fontWeight: 400,
        color: 'white'
    },
    image:{
        width: 50,
        height: 75
    },
    authors:{
        fontSize: 10,
        width: 250,
        color: 'white'
    },
    year:{
        fontSize: 10,
        color: 'white'
    },
    finalLine:{
        flexDirection: 'row'
    },
    heart: {
        fontSize: 10,
        marginLeft: -10
    }
})