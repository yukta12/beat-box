import React from 'react';
import {StyleSheet,Text,TouchableOpacity,View,Image} from 'react-native';
import Colors from "../constants/Colors";
import {responsiveWidth,responsiveHeight,responsiveFontSize} from "react-native-responsive-dimensions";

import * as GlobalStyles from "../styles";
import {linearGradient} from 'expo-linear-gradient';

export default class SongItem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={styles.mainContainer}>
                <View style={GlobalStyles.styles.songContainer}>
                    <Image source={{uri:this.props.song.thumbnail}}
                            style={GlobalStyles.styles.albumArt}
                    />
                    <View styles={GlobalStyles.styles.infoContainer}>
                        <Text style={GlobalStyles.styles.songTitle}>{this.props.song.title}</Text>
                        <Text style={GlobalStyles.styles.albumText}>{this.props.song.album}-{this.props.song.artist}</Text>


                    </View>
                </View>
                    <Text style={styles.durationText}>{this.props.song.duration}</Text>

            </View>
        );
    }

}

const styles = StyleSheet.create({
        mainContainer:{
            alignSelf:'stretch',
            flexDirection:'row',
            justifyContent:'space-between',
            paddingHorizontal:responsiveWidth(5),
            paddingVertical:responsiveHeight(1.3),
            borderBottomWidth:2,
            borderBottomColor:'rgba(76,82,128,0.4)'

        },
    durationText:{
            color:Colors.headingColor,
            fontFamily:'fira-regular',
            fontSize:responsiveFontSize(1.8),
            alignSelf: 'center'
    }

});

