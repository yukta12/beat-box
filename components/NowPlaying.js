import React from 'react';
import {View,StyleSheet,Text,Image} from 'react-native';
import {responsiveFontSize,responsiveHeight,responsiveWidth} from "react-native-responsive-dimensions";

import {LinearGradient} from "expo-linear-gradient";
import {MaterialIcons} from "@expo/vector-icons";
import * as GlobalStyles from "../styles"
import Colors from "../constants/Colors";

export default class NowPlaying extends React.Component{
    constructor(props){
        super(props);
        this.state={
            progress:0.2
        }
    }
    render(){
            return(
               <LinearGradient colors={[Colors.accentGradientStart,Colors.accentGradientEnd]}
                               start={[0,0]}
                               end={[1,1]}
                               style={styles.nowPlayingContainer}>
               <View style={[styles.progressBar,{width:responsiveWidth((this.state.progress *100))}]}></View>

                   <View style={GlobalStyles.styles.controlContainer}>
                       <View style={GlobalStyles.styles.songContainer}>
                           <Image source={{uri:"https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/7/7/6/f/2cef-dc15-4275-bf25-aa8703a91de0"}}
                                  style={GlobalStyles.styles.albumArt}/>
                          <View style={GlobalStyles.styles.infoContainer}>
                                <Text style={GlobalStyles.styles.songTitle}>God's Plan</Text>
                              <Text style={GlobalStyles.styles.albumText}>Album info</Text>
                          </View>
                       </View>
                       <MaterialIcons name={'play-arrow'} color={Colors.headingColor} size={responsiveFontSize(6)}></MaterialIcons>
                   </View>

               </LinearGradient>
            );
        }


//TODO:Wrap song
}


const styles = StyleSheet.create({
    nowPlayingContainer:{
        height:responsiveHeight(10),
    },
    progressBar:{
        height:responsiveHeight(0.5),
        backgroundColor:Colors.headingColor,
        borderRadius:responsiveWidth(1),
    },

});
