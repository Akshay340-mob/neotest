import React, { type PropsWithChildren } from 'react';
import {View,TextInput,StyleSheet,Text} from 'react-native'
import { Colors } from '../constants/Colors';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../helpers/ResponsiveScreen';

type inputTypes = {
    placeholder:string,
    value:string,
    onChangeText:(text:string,type:string)=>void,
    secure?:boolean,
    keyboardType?:string

}

const Input: React.FC<PropsWithChildren<inputTypes>> = (props) => {
    const {placeholder,
        value,
        onChangeText,
        secure,
        keyboardType}= props
    return(
        <View style={styles.inputContainer}>
            <TextInput
                value={value}
                secureTextEntry={secure}
                onChangeText={(text)=>onChangeText(text,placeholder)}
                placeholder={placeholder}  
                placeholderTextColor={Colors.placeholder_color}
            />
        </View>
   )
}

const styles = StyleSheet.create({
       inputContainer:{
        margin:hp(1),
        borderWidth:0.5,
        width:"80%",
        padding:wp(0.5),
        borderRadius:5,
        backgroundColor:"white"
       },
       input:{
        width:"100%",
        paddingHorizontal:wp(1),
        paddingVertical:hp('0.6'),
        fontSize:hp(4)
       } 
})
    

export default Input;