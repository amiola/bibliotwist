import { View, StyleSheet, Text } from "react-native"


const Result = (props) => {
  return (
    <>
    <View style={styles.resultContainer} >
        <Text style={styles.title} >{props.title}</Text>
        <Text style={styles.rating}>{props.rating}</Text>
    </View>
    </>
  )
}

export default Result

const styles = StyleSheet.create({
    resultContainer:{
        margin: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10
    },
    title:{
        fontSize: 10,
        fontWeight: 500,
        marginBottom: 10
    },
    rating:{
        fontSize: 5,
        fontWeight: 400
    }
})