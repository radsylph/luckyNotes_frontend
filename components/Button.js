import { View, Text, StyleSheet} from 'react-native';
import React from "react";
import COLORS from '../constants/colors';
import { TouchableOpacity } from "react-native";

const Button = (props) => {

        const filledBgColor = props.color || COLORS.secundary;
        const outlinedColor = COLORS.primary;
        const bgColor = props.filled ? filledBgColor : outlinedColor;
        const textColor = props.filled ? COLORS.terceary : COLORS.secundary;

    return(
        <TouchableOpacity style={{...styles.button, ...{backgroundColor: bgColor}, ...props.style}} onPress={props.onPress}>

                <Text style= {{fontSize: 18, ... {color:textColor}}}>{props.title}</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    button:{
        paddingBotton: 16,
        paddingVertical: 10,
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',

    }
}) 

export default Button