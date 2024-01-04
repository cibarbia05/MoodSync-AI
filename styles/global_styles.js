import {Dimensions} from "react-native";

const {width,height} = Dimensions.get('screen')
const globalStyles = {
    container: {
        alignItems:"center",
        justifyContent:"center",
        width,
        height,
    },
    button:{
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 50,
        marginTop: 50,
        alignItems: 'center',
        justifyContent:'center',
    },
    buttonText:{
        color: 'white',
        fontSize: 18,
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
}
export default globalStyles