import {Dimensions} from "react-native";

const {width,height} = Dimensions.get('screen')
const globalStyles = {
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width,
        height,
    },
    darkContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0b1d2f',
        width,
        height,
    },
    button: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 50,
        marginTop: 50,
        alignItems: 'center',
        justifyContent:'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    whiteTitle: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
    }
}
export default globalStyles