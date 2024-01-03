import {ResponseType, useAuthRequest} from "expo-auth-session";
import {useEffect} from "react";
import {Button, Text, View, StyleSheet, SafeAreaView} from "react-native";
import {StatusBar} from "expo-status-bar";
import add_all_playlist_tracks from '../api/playlist.js'


const MainScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
        <Text>Main</Text>
        <StatusBar style="auto" />
        <Button title={'Generate my Playlist'} onPress={add_all_playlist_tracks}/>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container: {
        alignItems:"center",
        justifyContent:"Center",
    }
})
export default MainScreen