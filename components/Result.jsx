import { View, StyleSheet, Text, Image } from "react-native"


const Result = (props) => {

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
        <Text numberOfLines={2} style={styles.authors}>🖋 {props.authors}</Text>
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
    },
    categories:{
        flexDirection: 'row',
        width: 250
    },
    category:{
        fontSize: 10,
        fontWeight: 400
    },
    image:{
        width: 50,
        height: 75
    },
    authors:{
        fontSize: 10,
        width: 250
    },
    year:{
        fontSize: 10,
    }
})