import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native';

const CryptoCard = ({item, navigation}) => {
    const onClickHandler = (id) =>{
        navigation.navigate("Detail",{id});
    }

  return (
        <Pressable style={styles.crypto} onPress={()=> onClickHandler(item.id)}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
        </Pressable>
    );
}

export default CryptoCard

const styles = StyleSheet.create({
    crypto:{
        padding:20,
        borderRadius: 5,
        borderWidth:1,
        backgroundColor: "#000",
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        margin:8,
    },
    name:{
        color:"#fff",
        fontSize: 24
    },
    price:{
        color:"#ffab00",
        fontSize: 28
    },
})