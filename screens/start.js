import {SafeAreaView} from "react-native";
import Slider from "../components/slider";
import globalStyles from "../styles/global_styles";
const StartScreen = () => {
  return (
    <SafeAreaView style={globalStyles.darkContainer}>
        <Slider/>
    </SafeAreaView>
  );
}
export default StartScreen;