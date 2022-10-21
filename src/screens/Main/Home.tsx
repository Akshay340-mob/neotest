import React,{useState,useEffect, useCallback} from 'react';
import {FlatList, SafeAreaView ,View,
            ListRenderItemInfo,StyleSheet,ListRenderItem,TouchableOpacity,Text} from 'react-native';
import { useSelector } from 'react-redux';
import WebServices from '../../services/WebServices';
import HOC from '../../components/HOC';
import PostComponent from '../../components/PostComponent'
import {  widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../helpers/ResponsiveScreen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../constants/types';
import { BodyText, TitleText } from '../../components/CustomText';
import Button from '../../components/Button';
import { firebase } from '@react-native-firebase/auth';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { LOGOUT } from '../../store/actions/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HOCSpinner from '../../components/HOCSpinner';


const FlatListWithSpinner = HOCSpinner(FlatList);

export type Post={ 
    userId: number,
    id: number,
    title: string,
    body: string
}

type HomeScreenProps = NativeStackScreenProps<RootStackParamList,'Home'>

const Home:React.FC<HomeScreenProps> = (props) => {

    const [data,setData] = useState([])
    const dipatch = useAppDispatch()
    const userInfo = useAppSelector(state=>state.info.user)
    const [loading,setIsloading] = useState(true)

    useEffect(()=>{
        console.log(userInfo.displayName)
        WebServices.getAllPosts().then(response=>{
                //console.log(response.data)
                setData(response.data)
                
        }).catch(error=>{
            console.log(error.message);
        }).finally(()=>setIsloading(false))    
    },[])

    
    const onItemPress=useCallback((id:number)=>{
        props.navigation.navigate('Detail',{id:id})
    },[])

    const renderItem: ListRenderItem<Post> = ({item}) => <PostComponent data={item}  onPress={onItemPress}/>;

    const onLogout=useCallback(()=>{
        firebase.auth().signOut().then(async()=>{
            try {
                await AsyncStorage.removeItem("@user");    
                dipatch({type:LOGOUT})   
            } catch (error) {
                console.log(error)
            }
        }).catch(err=>console.log(err))
    },[])


    return (
        <HOC>
            <View style={styles.container}>
            <View style={styles.header}>
            <Text>Hey {userInfo.displayName}</Text>
            <Button title='Logout' onPress={onLogout}/>   
            </View>
            
            <FlatListWithSpinner
                spinner={loading}
                contentContainerStyle={{alignItems:"center"}} 
                style={styles.list}
                keyExtractor={(item: Post) => item.id.toString()}
                data={data}
                renderItem={renderItem}
                
                />
           </View>
        </HOC>
    );
}

const styles = StyleSheet.create({
    container:{flex:1,padding:10,backgroundColor:'#fff'},
    list:{flex:1,padding:wp(1)},
   
    boldText:{
        fontSize:hp(2),
        fontWeight:"bold",
        textAlign:"center"
    },
    bodyText:{
        fontSize:hp(1.5),
        textAlign:"center"
    },
    header:{
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:"center"
    }
})

export default Home;