import {ResponseType, useAuthRequest} from "expo-auth-session";
import {useEffect} from "react";
import {Button, Text, View, StyleSheet, SafeAreaView} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useNavigation} from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import Slider from "../components/slider";
const StartScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
        <Slider/>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container: {
        alignItems:"center",
        justifyContent:"Center",
        backgroundColor:'#0b1d2f',
    }
})
export default StartScreen