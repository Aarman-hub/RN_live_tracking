import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Crypto } from '../components/Crypto';
// import CryptoCard from '../components/CryptoCard';
import { socket } from '../../App';

// socket.on('crypto',(data)=>{
//     cryptoList = data
// });


const Home = ({navigation}) => {

    const [cryptoList, setCryptoList] = useState();

    useEffect(() => {
      socket.on('crypto', (data)=>{
        setCryptoList(data);
      });
    }, [])
    

    const onClickHandler = (id) =>{
        navigation.navigate("Detail",{id});
    }
 
  const CryptoCard = ({item}) =>{
    return(
        <Pressable style={styles.crypto} onPress={()=> onClickHandler(item.id)}>
            <Text style={styles.name}>{item.slug}</Text>
            <Text style={styles.price}>$ {Math.round(item.price * 100) / 100 }</Text>
        </Pressable>
    )
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={cryptoList}
        renderItem={CryptoCard}
        keyExtractor={item=>item.id}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#272d42",
    },
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
    }
});