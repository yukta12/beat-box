import React from 'react';
import {Platform, View, Image, Text,TouchableOpacity,TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {responsiveFontSize, responsiveHeight, responsiveWidth} from "react-native-responsive-dimensions";
import {MaterialIcons} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import * as GlobalStyles from "../styles";

export default class NowPlaying extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <LinearGradient colors={[Colors.accentGradientStart, Colors.accentGradientEnd]}
                            start={[0, 0]}
                            end={[1, 1]}
            >
                <TouchableWithoutFeedback onPress={this.nowPlayingClicked.bind(this)}>
                    <View style={styles.nowPlayingContainer}>
                        {/*Progress Bar*/}
                        <View style={[styles.progressBar, {width: responsiveWidth(this.props.currentPosition)}]}/>
                        {/*End ofProgress Bar*/}

                        <View style={GlobalStyles.styles.controlContainer}>
                            <View style={GlobalStyles.styles.songContainer}>
                                <Image
                                    source={{uri: this.props.song.thumbnail}}
                                    style={GlobalStyles.styles.albumArt}
                                />
                                <View style={GlobalStyles.styles.infoContainer}>
                                    <Text style={[GlobalStyles.styles.songTitle,{color:Colors.headingColor}]}>
                                        {this.props.song.title}
                                    </Text>
                                    <Text style={GlobalStyles.styles.albumText}>
                                        {this.props.song.album} - {this.props.song.artist}
                                    </Text>
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
        this.props.navigation.navigate("NowPlaying");
    }

    renderPlayButton(){
        if(this.props.isPaused){
            return(
                <MaterialIcons name={"play-arrow"} color={Colors.headingColor} size={responsiveFontSize(6)}/>
            );
        }
        return (
            <MaterialIcons name={"pause"} color={Colors.headingColor} size={responsiveFontSize(6)}/>
        );
    }
}

const styles = StyleSheet.create({
    nowPlayingContainer: {
        height: responsiveHeight(10),
    },

    progressBar:{
        height: responsiveHeight(0.4),
        backgroundColor:Colors.headingColor,
        borderRadius: responsiveWidth(1),
    },



});