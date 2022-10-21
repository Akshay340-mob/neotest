import React from 'react';
import { View, StyleSheet, ActivityIndicator,FlatListProps } from 'react-native';
import LoadingIndicator from './LoadingIndicator';
import {Post} from '../screens/Main/Home'

type FProps =  {
  spinner:boolean,
  contentContainerStyle?:React.CSSProperties
  style?:React.CSSProperties
  keyExtractor?:any,
  data?:any
  renderItem?:any,
  children?:JSX.Element
}

function HOCSpinner(ChildComp: React.ComponentType<any | string>){
  return ({ spinner,children, ...props }:FProps) => (
    <View style={{ flex: 1 }}>
     <LoadingIndicator isLoading={spinner}/>
      <ChildComp {...props}>
        {children}
      </ChildComp>  
    </View>
  );
};

export default HOCSpinner;