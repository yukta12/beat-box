import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import{responsiveHeight,responsiveWidth,responsiveFontSize} from "react-native-responsive-dimensions";
import AppNavigator from './navigation/AppNavigator';
import {LinearGradient} from "expo-linear-gradient";
import Colors from "./constants/Colors";


export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      fontLoaded:false
    };
  }
  async componentWillMount(){
    await Font.loadAsync({
      'fira-regular':require("./assets/fonts/fira-sans/FiraSans-Regular.ttf"),
      'fira-semibold':require("./assets/fonts/fira-sans/FiraSans-SemiBold.ttf")
    });
    this.setState({
      fontLoaded:true
    });
  }
  render(){
    if(this.state.fontLoaded){
      return(
          <LinearGradient colors={[Colors.primaryGradientStart, Colors.primaryGradientEnd]}
                          start={[0, 0]}
                          end={[0, 0]}
                          style={{flex: 1}} style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle={"light-content"}/>}
            <AppNavigator/>
          </LinearGradient>
      );
    }
    return null;
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:responsiveHeight(4),
  },
});
