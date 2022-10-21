import React from 'react';
import { Text ,StyleSheet} from 'react-native';
import {  widthPercentageToDP as wp, heightPercentageToDP as hp } from '../helpers/ResponsiveScreen';
import {Colors}  from '../constants/Colors'

type Props={
    style?:Object,
    title?:string,
    body?:string
}

export const TitleText=({style,title}:Props)=>{
        return (<Text style={[styles.boldText,style]}>{title}</Text>)
}

export const BodyText=({style,body}:Props)=>{
    return (<Text style={styles.bodyText}>{body}</Text>)
}

export const ErrorText:React.FC<Props>=({style,title}:Props)=>{
        return(<Text style={styles.errorText}>{title}</Text>)
}

export const NeoText:React.FC=()=>{
    return(<Text style={{color:Colors.Primary,fontSize:wp(8)}}>
                    <Text style={{color:"black"}}>Neo</Text>Test</Text>)
}

const styles = StyleSheet.create({
    boldText:{
        fontSize:hp(2),
        fontWeight:"bold",
        textAlign:"center",
        flexWrap:"wrap"

    },
    bodyText:{
        fontSize:hp(1.5),
        textAlign:"center",
        flexWrap:"wrap"
    },
    errorText:{
        fontSize:wp(4),
        color:Colors.errorText,
        marginVertical:wp(0.5)
    }
})