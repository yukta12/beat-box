import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import NowPlaying from "../components/NowPlaying";
import {LinearGradient} from "expo-linear-gradient";
import Colors from "../constants/Colors";
import {getAllSongs} from "../services/SongService";
import {FlatList} from "react-navigation";
import SongItem from "../components/SongItem";
import RoundedButton from "../components/RoundedButton";
import {MaterialIcons} from "@expo/vector-icons";
import {responsiveWidth,responsiveHeight,responsiveFontSize} from "react-native-responsive-dimensions";

export default class SongsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: []
    };
  }

  async componentWillMount() {
    let songs = await getAllSongs();
    console.log("Songs:"+JSON.stringify(songs));
    this.setState({
      songs: songs
    });
  }


  render() {
    return (
        <View style={styles.container}>
          <LinearGradient colors={[Colors.primaryGradientStart, Colors.primaryGradientEnd]}
                          start={[0, 0]}
                          end={[0, 0]}
                          style={{flex: 1}}>
            <ScrollView>
              <View style={styles.buttonGroup}>
                <RoundedButton icon={<MaterialIcons name={'play-arrow'} size={responsiveFontSize(3)} color={'#fff'}/>}
                               onPress={() => console.log("Play Songs")} title={"Play All"}/>

                <RoundedButton icon={<MaterialIcons name={'shuffle'} size={responsiveFontSize(3)} color={'#fff'}/>}
                               onPress={() => console.log("Shuffle All")} title={"Shuffle"}/>
              </View>
              <FlatList data={this.state.songs}
                        style={{flex:1}}
                        keyExtractor={(data) => data.id + ""}
                        renderItem={({item}) => <SongItem song ={item}/>}/>
            </ScrollView>
          </LinearGradient>
          <NowPlaying/>
        </View>
    );
  }
}

SongsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonGroup:{
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: responsiveHeight(2),
  }
});
