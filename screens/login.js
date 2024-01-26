import {ResponseType, useAuthRequest} from "expo-auth-session";
import {useEffect} from "react";
import {Text, SafeAreaView, Pressable, ImageBackground} from "react-native";
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
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
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
                navigation.navigate('Detection')
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
export default LoginScreen;