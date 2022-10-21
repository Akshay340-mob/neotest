import React,  {type PropsWithChildren} from 'react';
import { TouchableOpacity,StyleSheet, Text } from 'react-native';
import {  widthPercentageToDP as wp, heightPercentageToDP as hp } from '../helpers/ResponsiveScreen';
import { Post } from '../screens/Main/Home';
import { BodyText, TitleText } from './CustomText';

type Postcomponent={
    data:Post,
    onPress:(id:number)=>void
}

const PostComponent:React.FC<
PropsWithChildren<Postcomponent>
> = ({data,onPress}) => (
    <TouchableOpacity style={styles.card} 
                      onPress={()=>onPress(data.id)}>
        <TitleText title={data.title}/>
        <BodyText body={data.body}/>
     </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    card:{
        backgroundColor: '#fff',
        width: wp(90),
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        padding:wp(1),
        margin: hp(1),
        },
  })

export default React.memo(PostComponent);