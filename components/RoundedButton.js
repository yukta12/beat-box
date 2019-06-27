import React from 'react';
import {StyleSheet,Text,TouchableOpacity} from 'react-native';
import Colors from "../constants/Colors";
import {responsiveWidth,responsiveHeight,responsiveFontSize} from "react-native-responsive-dimensions";

import {LinearGradient} from "expo-linear-gradient";

export default class RoundedButton extends React.Component{
    render(){
        return(
            <TouchableOpacity onPress={this.props.onPress.bind(this)}>
                <LinearGradient colors={[Colors.accentGradientStart,Colors.accentGradientEnd]}
                                start={[0,0]}
                                end={[1,1]}
                                style={styles.buttonContainer}>
                    {this.renderIcons()}
                    <Text style={this.getButtonStyles()}>{this.props.title}</Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    getButtonStyles(){
        if(this.isIconPressed()){
            return[
                styles.buttonTitle,
                {marginLeft:responsiveWidth(1)}

            ]
        }
        return[
            styles.buttonTitle
        ]

    }

    renderIcons(){
        if(this.isIconPressed()){
            return this.props.icon
        }
        return null;
    }

    isIconPressed(){
        return((typeof this.props.icon) !== 'undefinied');
    }

}


const styles = StyleSheet.create({
   buttonContainer:{
       alignSelf:'flex-start',
       flexDirection:'row',
       alignItems:'center',
       paddingVertical:responsiveHeight(0.6),
       paddingHorizontal:responsiveWidth(7),
       borderRadius:responsiveWidth(4)
   },
   buttonTitle:{
     fontFamily:'fira-semibold',
     color:'#fff',
     fontSize:responsiveFontSize(2.25),
   }
});

