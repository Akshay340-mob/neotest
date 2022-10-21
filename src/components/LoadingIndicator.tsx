import React from 'react';
import { ActivityIndicator , View ,StyleSheet} from 'react-native';

type LoadIndicator = {
    isLoading:boolean
}

const LoadingIndicator:React.FC<LoadIndicator>= ({isLoading}) => {
    
    if(isLoading)
    return (
            <View
              style={[
                StyleSheet.absoluteFill,
                {justifyContent: 'center' }
              ]}
            >
              <ActivityIndicator size="large" />
            </View>
    )
    else return null
}

export default LoadingIndicator;