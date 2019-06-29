import * as Font from 'expo-font';
import React, {Component} from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import {Audio} from "expo-av";
import {getAllSongs} from "./services/SongService";
import {LinearGradient} from "expo-linear-gradient";
import Colors from "./constants/Colors";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const sound = new Audio.Sound();
    this.state = {
      fontLoaded: false,
      isPaused:false,
      sound:sound,
      currentSong:{},
      isSongLoading:false,
      songs:[],
      duration:0,
      position:0,
    };

  }

  async componentWillMount() {
    await Font.loadAsync({
      'fira-regular': require("./assets/fonts/fira-sans/FiraSans-Regular.ttf"),
      'fira-semibold': require("./assets/fonts/fira-sans/FiraSans-SemiBold.ttf")
    });
    let songs=await getAllSongs();
    this.setState({
      fontLoaded: true,
      songs:songs,
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
    this.state.sound.setOnPlaybackStatusUpdate(this.updatePosition.bind(this));
  }

  render() {

    console.log(Object.keys(this.state.currentSong).length !== 0);
    console.log("Render Called");
    if (this.state.fontLoaded) {

      return (
          <LinearGradient colors={[Colors.primaryGradientStart,Colors.primaryGradientEnd]}
                          start={[0,0]}
                          end={[1,1]}
                          style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="light-content"/>}

            <AppNavigator
                screenProps={{
                  currentSong: this.state.currentSong,
                  isSongActive: (item)=> this.isSongActive(item),
                  isSongSelected: ()=> this.isSongSelected(),
                  playSong: async (song) => this.playSong(song),
                  nextSong :()=>this.nextSong(),
                  previousSong:()=>this.previousSong(),
                  duration: this.state.duration,
                  position: this.state.position,
                  seek: (positionInPercentage) => this.seek(positionInPercentage),
                  togglePause : async () => this.togglePause(),
                  isPaused: this.state.isPaused,
                }}
            />
          </LinearGradient>
      );
    }
    return null;
  }

  isSongActive(item){
    return (this.isSongSelected() && this.state.currentSong.id === item.id)
  }
  isSongSelected(){
    return (Object.keys(this.state.currentSong).length !== 0)
  }


  async playSong(song){

    console.log(Object.keys(this.state.currentSong).length !== 0);
    let songLoaded = Object.keys(this.state.currentSong).length !== 0;
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
        isPaused:false
      });
    }
  }

  nextSong(){
    if(this.isSongSelected()){
      let currentIndex = this.indexOfSong(this.state.currentSong);
      let nextSong = this.state.songs[(currentIndex + 1) % this.state.songs.length];
      this.playSong(nextSong);
    }
  }

  previousSong(){

    if(this.isSongSelected()){
      let currentIndex = this.indexOfSong(this.state.currentSong);
      let previousSong = this.state.songs[(currentIndex - 1) % this.state.songs.length];
      this.playSong(previousSong);
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

  indexOfSong(song){
    for(let i=0;i<this.state.songs.length;i++){
      if(song.id=== this.state.songs[i].id)
        return i;
    }
  }

  seek(positionInPercentage){
    let positionInMillis = (positionInPercentage * this.state.duration) / 100;
    this.state.sound.setPositionAsync(positionInMillis);
    this.setState({
      positionInMillis: positionInPercentage
    });
  }

  updatePosition({durationMillis,positionMillis}){
    if((typeof durationMillis !== "undefined" && (typeof positionMillis !== "undefined"))){
      let positionInPercentage = (positionMillis/durationMillis) * 100;
      console.log(`Duration in Millis: ${durationMillis}, position: ${positionInPercentage}, poisition millis : ${positionMillis}`);
      this.setState({
        duration:durationMillis,
        position: positionInPercentage,
      });
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});