import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainNav from './src/navigations/MainNav';
import io from 'socket.io-client';

export const socket = io('http://192.168.0.105:8000');

socket.on('connect',()=>{
  console.log("Socket is connected!")
});

export default function App() {
  return (
    <MainNav />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
