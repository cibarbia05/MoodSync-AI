import {ResponseType, useAuthRequest} from "expo-auth-session";
import {useEffect} from "react";
import {Text, SafeAreaView, Pressable, Image, ImageBackground} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useNavigation} from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import globalStyles from "../styles/global_styles"

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
            "playlist-modify-public",
            "playlist-modify-private"
          ],
        usePKCE: false,
        redirectUri: 'exp://10.0.0.185:8081',
    }, discovery)

    useEffect(() => {
        if(response?.type === 'success'){
             const fetchData = async () => {
                const {access_token} = response.params;
                await SecureStore.setItemAsync('access_token', access_token);
                console.log('accessToken', access_token);
                navigation.navigate('Main')
              }
              fetchData()
        }
    }, [response])
  return (
      <ImageBackground source={require('../assets/images/3.png')} imageStyle={{opacity:0.5}}>
        <SafeAreaView style={[globalStyles.container]}>
            <Text style={globalStyles.title}>Connect with Spotify to obtain a personalized playlist</Text>
             <Pressable style={globalStyles.button} onPress={() => {promptAsync()}}>
                  <Text style={globalStyles.buttonText}>Connect</Text>
              </Pressable>
        </SafeAreaView>
      </ImageBackground>

  );
}
export default LoginScreen