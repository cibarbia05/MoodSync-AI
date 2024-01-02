import {ResponseType, useAuthRequest} from "expo-auth-session";
import {useEffect} from "react";
import {Button, Text, View, StyleSheet, SafeAreaView} from "react-native";
import {StatusBar} from "expo-status-bar";

const MainScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
        <Text>Main</Text>
        <StatusBar style="auto" />
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