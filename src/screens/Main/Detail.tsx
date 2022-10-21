import React, { useEffect, useState } from 'react';
import { View , Text , StyleSheet, ActivityIndicator } from 'react-native';
import HOC from '../../components/HOC';
import { TitleText,BodyText } from '../../components/CustomText';
import WebServices from '../../services/WebServices';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../constants/types';
import  { Post } from './Home'


type DetailScreenProps = NativeStackScreenProps<RootStackParamList,'Detail'>

const Detail:React.FC<DetailScreenProps> = (props) => {

      const {id} = props.route.params;
      const [data,setData] = useState<Post|null>(null)
      const [loading,setIsloading] = useState<boolean>(true)

      useEffect(()=>{
      WebServices.getSpecificPosts(id).then(response=>{     
          console.log(response.data)
          setData(response.data)                    
      }).catch(error=>{console.log(error.message)})
      .finally(()=>{setIsloading(false)})
      },[])
      
      return(
            <HOC>
                <View style={styles.container}>
                  {data && !loading?<View>
                  <TitleText title={data.title} style={{marginBottom:5}}/>
                  <BodyText body={data.body}/> 
                  </View>:loading?<ActivityIndicator size="large"/>:
                        <Text>can't able to fetch the data</Text>}
                </View>
            </HOC>
      )
}

const styles = StyleSheet.create({
      container:{
            flex:1,
            alignItems:"center",
            justifyContent:"center"
      }
})

export default Detail;