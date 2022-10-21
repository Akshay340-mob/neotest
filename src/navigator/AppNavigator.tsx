import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//************* import screens *****************
import Home from '../screens/Main/Home';
import Detail from '../screens/Main/Detail';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';

//importing types
import {RootStackParamList} from '../constants/types'
import { useAppSelector } from '../store/hooks';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator=()=>{
  return(<Stack.Navigator>
      <Stack.Screen name = "Login" component={Login}/>
      <Stack.Screen name = "Register" component={Register}/>
      
  </Stack.Navigator>)
}

const MainNavigator=()=>{
  return(<Stack.Navigator>
       <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
  </Stack.Navigator>)
}


export default function AppNavigator() {

    const isAuth = useAppSelector(state=>state.info.isAuth)
  
    return (
      <NavigationContainer>
          {isAuth?<MainNavigator/>:<AuthNavigator/>}
      </NavigationContainer>
      );

}
