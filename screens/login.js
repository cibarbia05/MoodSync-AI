import {ResponseType, useAuthRequest} from "expo-auth-session";
import {useEffect} from "react";
import {Button, Text, View, StyleSheet, SafeAreaView} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useNavigation} from "@react-navigation/native";

const LoginScreen = () => {
    const navigation = useNavigation()
    const discovery = {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
    }
    const [request, response, promptAsync] = useAuthRequest({
        responseType: ResponseType.Token,
        clientId: '1dee71455c554af4af36488ba43b6fed',
        clientSecret: '3e7da180e618498187f6b02e32ee2dba',
        scopes: [
            "user-read-email",
            "user-library-read",
            "user-read-recently-played",
            "user-top-read",
            "playlist-read-private",
            "playlist-read-collaborative",
            "playlist-modify-public" // or "playlist-modify-private"
          ],
        usePKCE: false,
        redirectUri: 'exp://10.0.0.185:8081',
    }, discovery)

    useEffect(() => {
        if(response?.type === 'success'){
            const {access_token} = response.params;
            console.log('accessToken', access_token);
            navigation.navigate('Main')
        }
    }, [response])
  return (
    <SafeAreaView style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title={"Login"} onPress={()=>{promptAsync()}}/>
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
export default LoginScreen