import React from 'react';
import {View,StyleSheet,Text,Image,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
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
                               >
               <TouchableWithoutFeedback onPress={this.nowPlayingClicked.bind(this)}>
                   <View style={styles.nowPlayingContainer}>
                       <View style={[styles.progressBar,{width:responsiveWidth((this.state.progress *100))}]}></View>

                       <View style={GlobalStyles.styles.controlContainer}>
                           <View style={GlobalStyles.styles.songContainer}>
                               <Image source={{uri:this.props.song.thumbnail}}
                                      style={GlobalStyles.styles.albumArt}/>
                               <View style={GlobalStyles.styles.infoContainer}>
                                   <Text style={[GlobalStyles.styles.songTitle,{color:Colors.headingColor}]}>{this.props.song.title}</Text>
                                   <Text style={GlobalStyles.styles.albumText}>{this.props.song.album}-{this.props.song.artist}</Text>
                               </View>
                           </View>
                           <TouchableOpacity onPress={()=> this.props.onToggle()}>
                               {this.renderPlayButton()}
                           </TouchableOpacity>

                       </View>
                   </View>

               </TouchableWithoutFeedback>
               </LinearGradient>
            );
        }

        nowPlayingClicked(){
            console.log("nowplaying clicked");
        }
        renderPlayButton(){
            if(this.props.isPaused){
                return(
                    <MaterialIcons name={'play-arrow'} color={Colors.headingColor} size={responsiveFontSize(6)}></MaterialIcons>
                );
            }
            return(
                <MaterialIcons name={'pause'} color={Colors.headingColor} size={responsiveFontSize(6)}></MaterialIcons>
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
