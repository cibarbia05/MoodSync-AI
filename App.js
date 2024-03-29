
import {Button, StyleSheet, Text, View} from 'react-native';
import LoginStack from "./navigation/LoginStack";
import {NavigationContainer} from "@react-navigation/native";
import StartScreen from "./screens/start";
import Login from "./screens/login";

export default function App() {
    return (
        <NavigationContainer>
            <LoginStack/>
        </NavigationContainer>
    );
}
