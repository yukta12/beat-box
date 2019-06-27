import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import NowPlaying from "../components/NowPlaying";
import {LinearGradient} from "expo-linear-gradient";
import Colors from "../constants/Colors";

//import { MonoText } from '../components/StyledText';

export default function SongsScreen() {
  return (
    <View style={styles.container}>
    <LinearGradient colors={[Colors.primaryGradientStart,Colors.primaryGradientEnd]}
                    start={[0,0]}
                    end={[1,1]}
                    style={{flex:1}}/>
      <NowPlaying/>


    </View>
  );
}

SongsScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
