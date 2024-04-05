import React from "react";
import { styles } from "../../styles";
import { Text, View, Dimensions, TextInput } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    useAnimatedProps,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { SliderPropsType } from "../../types/slider.type";




const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const WIDTH = Dimensions.get("window").width - 40;
const KOBSIZE = 20;





export const SliderUpdated: React.FC<any> = ({
    max = 100,
    steps = 1,
    progress = 0,
    frozenProgress = 0,
    min = 0,
    disable = false,
    width = WIDTH
}) => {
    const MAXWIDTH = width - KOBSIZE / 2 + 6;
    const xKnob1 = useSharedValue(0 + progress);
    const scaleKnob1 = useSharedValue(1);
    const ctx = useSharedValue(0);

    const gestureHandler = Gesture.Pan()
        .onBegin(() => {
            ctx.value = xKnob1.value;
        })
        .onChange((e) => {
            scaleKnob1.value = 1.3;
            xKnob1.value =
                ctx.value + e.translationX < 0 + frozenProgress
                    ? 0 + frozenProgress
                    : ctx.value + e.translationX > MAXWIDTH
                        ? MAXWIDTH
                        : ctx.value + e.translationX;
        })
        .onFinalize(() => {
            scaleKnob1.value = 1;
        });

    const styleLine = useAnimatedStyle(() => {
        return {
            backgroundColor: "black",
            height: 3,
            marginTop: -3,
            borderRadius: 3,
            width: MAXWIDTH - xKnob1.value + 4,
            transform: [{ translateX: xKnob1.value }],
        };
    });
    const knobStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: xKnob1.value }, { scale: scaleKnob1.value }],
        };
    });

    const label = useAnimatedProps(() => {
        const nvl =
            xKnob1.value === progress
                ? progress
                : Math.round((0 + (xKnob1.value / MAXWIDTH) * (max - 0)) / steps) *
                steps;
        return {
            placeholder: `${nvl}`,
        };
    });
    return (
        <View style={styles.container}>

        </View>
    );
};
