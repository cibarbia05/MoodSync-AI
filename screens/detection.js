import {
    StyleSheet,
    Text,
    TextInput,
    Pressable,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard, KeyboardAvoidingView, View, Image, Animated
} from "react-native";
import React, {useState} from "react";
import globalStyles from "../styles/global_styles";
import startPlaylistGeneration from '../api/playlist.js'
import ModalPopup from "../components/popup";
const DetectionScreen = () => {
    const [text, setText] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const scaleValue = React.useRef(new Animated.Value(0)).current;
        React.useEffect(() => {
        toggleModal();
    }, [modalVisible]);
    const toggleModal = () => {
        if (modalVisible) {
            setModalVisible(true);
            Animated.spring(scaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            setTimeout(() => setModalVisible(false), 200);
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };
    return (
        <SafeAreaView style={[globalStyles.darkContainer, styles.keyboadContainer]}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView style={globalStyles.darkContainer}>
                        <Text style={globalStyles.whiteTitle}>Write thoughts/experiences about your mood to generate the ideal playlist</Text>
                        <Text style={globalStyles.subtitle}>(ex: Tell us about your day!)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Write Anything'
                            onChangeText={setText}
                            value={text}
                            multiline
                            maxLength={500}
                        />
                        <Pressable style={globalStyles.button} onPress = {() => {startPlaylistGeneration(text); setModalVisible(true)}}>
                            <Text style={globalStyles.buttonText}>Generate Playlist</Text>
                        </Pressable>
                        <ModalPopup visible={modalVisible}>
                            <View style={{alignItems: 'center'}}>
                                <View style={styles.header}>
                                    <Pressable onPress={() => setModalVisible(false)}>
                                        <Text style={styles.popupExitButton}>X</Text>
                                    </Pressable>
                                </View>
                            </View>
                            <View style={{alignItems: 'center'}}>
                                <Text style={styles.successText}>Success</Text>
                                <Image source={require('../assets/images/success.png')} style={{width:150, height:150}}/>
                                <Text>Congratulations! Your playlist was successfully added to your Spotify account</Text>
                            </View>
                        </ModalPopup>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#0b1d2f',
    },
    keyboadContainer: {
        padding: 10,
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 150,
        minWidth: '75%',
        maxWidth: '75%',
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: 'gray',
        backgroundColor: '#ffffff',
        color: 'black',
        fontSize: 16,
    },
    header: {
        width: '100%',
        height: 20,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    successText: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    popupExitButton:{
        fontSize: 20,
        fontWeight: 'bold',
  }
})
export default DetectionScreen;