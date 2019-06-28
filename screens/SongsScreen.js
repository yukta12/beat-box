import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';

import NowPlaying from "../components/NowPlaying";
import {LinearGradient} from "expo-linear-gradient";
import Colors from "../constants/Colors";
import {Audio} from "expo-av";
import {getAllSongs} from "../services/SongService";
import {FlatList} from "react-navigation";
import SongItem from "../components/SongItem";
import RoundedButton from "../components/RoundedButton";
import {MaterialIcons} from "@expo/vector-icons";
import {responsiveWidth,responsiveHeight,responsiveFontSize} from "react-native-responsive-dimensions";

export default class SongsScreen extends React.Component {
  constructor(props) {
    super(props);
    const sound = new Audio.Sound();
    this.state = {
      songs: [],
      isPaused:false,
      sound:sound,
      currentSong:undefined,
      isSongLoading:false,

    };
  }

  async componentWillMount() {
    let songs = await getAllSongs();
    console.log("Songs:"+JSON.stringify(songs));
    this.setState({
      songs: songs
    });
  }
  async componentDidMount() {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true
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
                        renderItem={({item}) => <SongItem song={item}isActive={this.isSongActive(item)} songClicked={this.playSong.bind(this)}/>}/>
            </ScrollView>
          </LinearGradient>

          {typeof this.state.currentSong !== "undefined" ? <NowPlaying isPaused={this.state.isPaused}
                                                                       song={this.state.currentSong}
                                                                       onToggle={this.togglePause.bind(this)}/>
              :null}
        </View>
    );
  }

  isSongActive(item){
    return(this.isSongSelected() && this.state.currentSong.id === item.id);
  }
   isSongSelected(){
    return (typeof this.state.currentSong !=='undefined');
   }

  async playSong(song){
    console.log(typeof this.state.currentSong);
    let songLoaded = (typeof this.state.currentSong) !== "undefined";
    if(!this.state.isSongLoading &&
        (!songLoaded || this.state.currentSong.id !== song.id )){
      this.setState({
        isSongLoading:true,
      });
      if(songLoaded){
        await this.state.sound.unloadAsync();
      }
      console.log("Loading Song");
      await this.state.sound.loadAsync({uri: song.location},{}, false);
      console.log("Playing Song");
      await this.state.sound.playAsync();
      this.setState({
        currentSong:song,
        isSongLoading:false,
      });
    }
  }
  async togglePause(){
    console.log("Toggle Pause Called");
    if(this.state.currentSong){
      console.log("Going to pause current song: "+this.state.currentSong);
      let isPaused = !this.state.isPaused;
      if(isPaused){
        console.log("Pausing song");
        await this.state.sound.pauseAsync();
        console.log("Paused");
      }else{
        console.log("Playing SOng");
        await this.state.sound.playAsync();
        console.log("Played");
      }
      this.setState({
        isPaused:isPaused
      });

    }
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
