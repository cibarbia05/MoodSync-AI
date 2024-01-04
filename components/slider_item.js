import {
    Text,
    View,
    StyleSheet,
    Image,
    Pressable
} from "react-native";
import {useNavigation} from "@react-navigation/native";
import globalStyles from "../styles/global_styles"

const SliderItem = ({item}) => {
  const navigation = useNavigation()
  const isLastItem = (item.id === 3);

  const lastItemButton = () => {
      if(isLastItem) {
          return (
              <Pressable style={globalStyles.button} onPress={() => {
                  navigation.navigate("Login")
              }}>
                  <Text style={globalStyles.buttonText}>Get Started</Text>
              </Pressable>
          )
      }
  };
  return (
    <View style={globalStyles.container}>
        <Image source={item.img}
               resizeMode="contain" style={styles.image}/>
        <View style={styles.content}>
            <Text style={styles.description}>{item.description}</Text>
            {lastItemButton()}
        </View>

    </View>
  );
}
const styles = StyleSheet.create({
    image:{
        flex:0.6,
        width:'100%',
    },
    content:{
        flex:0.4,
        alignItems:'center',
    },
    description:{
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
})
export default SliderItem