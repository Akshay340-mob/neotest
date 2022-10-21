import React, { useEffect, useState } from 'react';
import { View ,Text , TouchableOpacity,StyleSheet, Alert , 
    KeyboardAvoidingView , Platform} from 'react-native';
import HOC from '../../components/HOC';
import { widthPercentageToDP as wp ,heightPercentageToDP as hp } from '../../helpers/ResponsiveScreen';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { PlaceHolder } from '../../constants/AppContants';
import auth from '@react-native-firebase/auth';
import { useAppDispatch } from '../../store/hooks';
import { SET_USER } from '../../store/actions/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NeoText } from '../../components/CustomText';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../constants/types';
import {saveUserDataToStarage} from '../../helpers/SaveToStorage'

type LoginScreenProps = NativeStackScreenProps<RootStackParamList,'Login'>

const Login:React.FC<LoginScreenProps> = (props) => {
    
    const [email,setEmail] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [loading,setIsloading] = useState(true)
    const dispatch = useAppDispatch()

    const onchange=(text:string,type:string)=>{
        if(type === PlaceHolder.EMAIL)
            setEmail(text)
        else if(type === PlaceHolder.PASSWORD)
                setPassword(text);    
    } 

    const onLogin=async()=>{

        if(email.length>0 && password.length>0 )
        {
        try {
            const {user} = await auth().signInWithEmailAndPassword(email,password);
            console.log(user)
            const userInfo = { displayName:user.displayName,
                email:user.email,
                uid:user.uid}

            saveUserDataToStarage(userInfo);
            dispatch({type:SET_USER,payload:userInfo})
        } catch (error:any) {
            console.log(error)
            Alert.alert("Error",error.message);  
        }
    }else{
          Alert.alert("Error","Please Enter your credentials");  
    } 
    }

    useEffect(()=>{
        async function getData(){
            try {
                const jsonValue = await AsyncStorage.getItem('@user')
                if(jsonValue)
                    {
                        dispatch({type:SET_USER,payload:JSON.parse(jsonValue)})
                    }
                    setIsloading(false)
              } catch(e) {
                setIsloading(false)
                // error reading value
              }
        }
        getData();
    },[])

    
    return(<HOC>
       <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                    >
            <NeoText/>
            {loading?null:
            <>
                <Input value={email} placeholder={PlaceHolder.EMAIL} onChangeText={onchange}/>
                <Input value={password} placeholder={PlaceHolder.PASSWORD} onChangeText={onchange} secure={true}/>
                <Button title="Submit" onPress={onLogin}/>
                
                <TouchableOpacity 
                        onPress={()=>props.navigation.navigate('Register')}
                        style={{flexDirection:"row",marginTop:hp(3),alignSelf:"center"}}>
                    <Text style={styles.already}>{PlaceHolder.CREATE_ACCOUNT}</Text>
                    <Text style={[styles.already,styles.next]}>{PlaceHolder.TO_REGISTER}</Text>
            </TouchableOpacity>
            </>}
                </KeyboardAvoidingView>

    </HOC>)
}

const styles = StyleSheet.create({
    container:{flex:1,alignItems:"center",justifyContent:"center"},
    already:{fontSize:hp(2),
        },
    next:{
        color:"cornflowerblue"}    
})

export default Login;