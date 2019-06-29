import React, {Component} from 'react';

import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import * as GlobalStyles from "../styles";
import Colors from "../constants/Colors";
import Slider from 'react-native-slider';
import {responsiveHeight, responsiveWidth, responsiveFontSize} from "react-native-responsive-dimensions";
import {AntDesign, Entypo, MaterialIcons} from "@expo/vector-icons";
import NowPlaying from "../components/NowPlaying";

export default class NowPlayingScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            isLiked:false,
        }
    }

    render(){
        return(
            <View style={GlobalStyles.styles.container}>
                <LinearGradient colors={[Colors.primaryGradientStart,Colors.primaryGradientEnd]}
                                start={[0,0]}
                                end={[1,1]}
                                style={{flex:1,alignItems:"stretch"}}>
                    <View style={styles.searchContainer}>
                        <LinearGradient colors={[Colors.accentGradientStart, Colors.accentGradientEnd]}
                                        start={[0, 0]}
                                        end={[1, 1]}
                                        style={styles.controlContainer}>
                            <View style={styles.songContainer}>
                                <Image source={{uri: this.props.screenProps.currentSong.thumbnail}}
                                       style={styles.albumArt}/>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.songTitle}>
                                        {this.props.screenProps.currentSong.title}
                                    </Text>
                                    <Text style={styles.albumText}>
                                        {this.props.screenProps.currentSong.album} - {this.props.screenProps.currentSong.artist}
                                    </Text>
                                    <View style={styles.separator}/>


                                    <View style={styles.tagContainer}>
                                        <Text style={styles.tagText}>
                                            {this.props.screenProps.currentSong.genre}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </LinearGradient>

                        <View style={styles.control}>
                            <Slider value={this.props.screenProps.position}
                                    minimumValue={0}
                                    minimumTrackTintColor={Colors.headingColor}
                                    maximumTrackTintColor={Colors.blueColor}
                                    thumbTintColor={Colors.headingColor}
                                    maximumValue={100}
                                    onValueChange={this.props.screenProps.seek.bind(this)}/>
                            <View style={styles.controlButtons}>
                                <TouchableOpacity onPress={() => {
                                    let isLiked = this.state.isLiked;
                                    this.setState({
                                        isLiked: !isLiked,
                                    });
                                }}>
                                    <AntDesign name={"heart"} color={(this.state.isLiked) ? Colors.accentColor : Colors.headingColor}
                                               size={responsiveFontSize(3.5)}
                                    />

                                </TouchableOpacity>

                                <TouchableOpacity onPress={this.props.screenProps.previousSong.bind(this)}>
                                    <AntDesign name={"stepbackward"} color={Colors.headingColor}
                                               size={responsiveFontSize(3.5)}
                                    />

                                </TouchableOpacity>

                                <TouchableOpacity style={styles.playContainer} onPress={this.props.screenProps.togglePause.bind(this)}>
                                    <MaterialIcons name={(this.props.screenProps.isPaused ? "play-arrow" : "pause")} color={Colors.headingColor}
                                               size={responsiveFontSize(3.5)}
                                    />
                                </TouchableOpacity>


                                <TouchableOpacity onPress={this.props.screenProps.nextSong.bind(this)}>
                                    <AntDesign name={"stepforward"} color={Colors.headingColor}
                                               size={responsiveFontSize(3.5)}
                                    />

                                </TouchableOpacity>

                                <TouchableOpacity onPress={this.props.screenProps.nextSong.bind(this)}>
                                    <Entypo name={"dots-three-horizontal"} color={Colors.headingColor} size={responsiveFontSize(3.5)}/>

                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </LinearGradient>
            </View>
        );
    }
}



NowPlayingScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    searchContainer: {
        flex: 1,
        alignItems: 'stretch',
    },
    controlContainer: {
        paddingHorizontal: responsiveWidth(4),
        paddingVertical: responsiveHeight(1.5),
    },
    songContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    albumArt: {
        width: responsiveWidth(23),
        height: responsiveWidth(23),
        borderRadius: responsiveWidth(3),
        marginRight: responsiveWidth(4)
    },

    infoContainer: {
        alignSelf: 'stretch',
        justifyContent: 'space-around',
        shadowColor: '#333',
    },
    songTitle: {
        fontFamily: 'fira-semibold',
        color: Colors.headingColor,
        fontSize: responsiveFontSize(2.4),

    },
    albumText: {
        fontFamily: 'fira-regular',
        color: Colors.greyColor,
        fontSize: responsiveFontSize(1.8)
    },
    separator: {
        alignSelf: 'stretch',
        height: 2,
        backgroundColor: Colors.lightAccentColor
    },
    tagContainer: {
        backgroundColor: Colors.lightAccentColor,
        alignSelf: 'flex-start',
        paddingVertical: responsiveHeight(0.4),
        paddingHorizontal: responsiveWidth(2),
        borderRadius: responsiveWidth(10)
    },
    tagText: {
        fontFamily: 'fira-regular',
        color: Colors.headingColor,
        fontSize: responsiveFontSize(1.5)
    },
    control: {
        backgroundColor: Colors.primaryColor,
        justifyContent: 'space-around',
        paddingHorizontal: responsiveWidth(6),
        height: responsiveHeight(20)
    },
    controlButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    playContainer: {
        width: responsiveWidth(15),
        height: responsiveWidth(15),
        backgroundColor: Colors.blueColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: responsiveWidth(7.5),
    }
});