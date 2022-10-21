import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import React, { type PropsWithChildren } from 'react';

// ********* import helper function ************
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../helpers/ResponsiveScreen';
import { Colors } from '../constants/Colors';

type buttonTypes = {
    title: string,
    style?: Object,
    onPress?: () => void,
    disabled?: boolean
}

const Button: React.FC<
    PropsWithChildren<buttonTypes>> = (props) => {
    return (
        <TouchableOpacity
            disabled={props.disabled}
            onPress={props.onPress}
            style={styles.container}>
            <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.Primary,
        width: wp(30),
        height: hp(5),
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: hp(1),
        
    },
    buttonText:{
        color:"white"
    }
});


export default Button