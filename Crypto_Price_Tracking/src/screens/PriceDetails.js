import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import axios from 'axios';

const PriceDetails = ({route}) => {
  const id = route.params.id;

  const [cryptoProfile, setCryptoProfile] = useState();
  const [marketData, setMarketData] = useState();
  useEffect(() => {
    axios.get(`http://localhost:8000/cryptos/market-data/${id}`)
      .then(response=>{
        setMarketData(response.data)
      });

    axios.get(`http://localhost:8000/cryptos/profile/${id}`)
    .then(response=>{
      setMarketData(response.data)
    });
    
  }, [])
  
  return (
    <View>
      <Text>{id}</Text>
      <Text>{}</Text>
    </View>
  )
}

export default PriceDetails

const styles = StyleSheet.create({})