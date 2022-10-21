import React from 'react';
import {StyleSheet} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
    style?:Object,
    children: JSX.Element,
  };

const HOC = ({children,style}:Props)=>{
    return(<SafeAreaView style={styles.container}>
            {children}
    </SafeAreaView>)
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white"
    }
})

export default HOC