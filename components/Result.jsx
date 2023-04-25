import { View, StyleSheet, Text, Image } from "react-native"


const Result = (props) => {

  return (
    <>
    <View style={styles.resultContainer} >
        <Image source={{uri: props.image}} style={styles.image}/>
        <View style={styles.textContainer}>
        <Text style={styles.title} >{props.title}</Text>
        <View style={styles.categories}>{
        props.subcategories.map((cat,i)=>(
            <Text style={styles.category} key={i}>{cat+`${i!== props.subcategories.length-1?' | ':''}`}</Text>
        ))
        }</View>
        <Text style={styles.year}>{props.year}</Text>
        <Text style={styles.authors}>🖋 {props.authors}</Text>
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
        marginLeft: 10,
        justifyContent: 'space-between'
    },
    title:{
        fontSize: 15,
        fontWeight: 500,
    },
    categories:{
        flexDirection: 'row'
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
    },
    year:{
        fontSize: 10,
    }
})