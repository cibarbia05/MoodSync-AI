import {Button, Text, View, StyleSheet, SafeAreaView, FlatList, Animated} from "react-native";
import data  from "../image_data";
import SliderItem from "./slider_item";
import Pagination from "./pagination";
import {useRef, useState} from "react";
const Slider = () => {
    const [index, setIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const handleOnScroll = event => {
        Animated.event(
            [
            {
                nativeEvent:{
                    contentOffset:{
                        x: scrollX
                    },
                },
            },
        ], {
            useNativeDriver: false,
        },
        )(event);
    };
    const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
        // console.log("viewableItems", viewableItems);
        setIndex(viewableItems[0].index);
        }).current;
    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current
  return (
    <View style={styles.container}>
        <FlatList data={data}
            renderItem={({item}) => <SliderItem item={item}/>}
            horizontal
            pagingEnabled
            snapToAlignment='center'
            showsHorizontalScrollIndicator={false}
            onScroll={handleOnScroll}
                  onViewableItemsChanged={handleOnViewableItemsChanged}
                  viewabilityConfig={viewabilityConfig}

        />
        <Pagination data={data} scrollX={scrollX} index={index}/>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        alignItems:"center",
        justifyContent:"Center",
    }
})
export default Slider