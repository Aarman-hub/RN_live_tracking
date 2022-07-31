import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import PriceDetails from '../screens/PriceDetails';

const Main = createNativeStackNavigator();

const MainNav = () => {
  return (
    <NavigationContainer>
        <Main.Navigator initialRouteName='Home'>
            <Main.Screen name="Home" component={Home} />
            <Main.Screen name="Detail" component={PriceDetails} />
        </Main.Navigator>
    </NavigationContainer>
  )
}

export default MainNav