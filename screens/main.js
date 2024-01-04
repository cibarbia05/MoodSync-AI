import {useState} from "react";
import {Text, SafeAreaView, Pressable, ImageBackground} from "react-native";
import {StatusBar} from "expo-status-bar";
import add_all_playlist_tracks from '../api/playlist.js'
import globalStyles from "../styles/global_styles"
const MainScreen = () => {
  const [modal, setModal] = useState([]);
  return (
      <ImageBackground source={require('../assets/images/4.png')} imageStyle={{opacity:0.5}}>
        <SafeAreaView style={globalStyles.container}>
            <Text style={globalStyles.title}>A new music experience is at your fingertips. Generate a playlist that will satisfy your emotions!</Text>
            <Pressable style={globalStyles.button} onPress={add_all_playlist_tracks}>
                <Text style={globalStyles.buttonText}>Generate my playlist</Text>
            </Pressable>
            {modal}
            <StatusBar style="auto" />
        </SafeAreaView>
      </ImageBackground>
  );
}
export default MainScreen