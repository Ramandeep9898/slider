import React from "react";
import { styles } from "../../styles";
import { Text, View, Dimensions, TextInput } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    useAnimatedProps,
} from "react-native-reanimated";
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from "react-native-gesture-handler";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const WIDTH = Dimensions.get("window").width - 40;
const KOBSIZE = 20;
const MAXWIDTH = WIDTH - KOBSIZE / 2 + 6;

export const RangeSlider = ({ max = 100, min = 0, steps = 1 }) => {
    const isDraggingKnob1 = useSharedValue(false);
    const isDraggingKnob2 = useSharedValue(false);
    const xKnob1 = useSharedValue(0);
    const xKnob2 = useSharedValue(MAXWIDTH);
    const ctx = useSharedValue(0);

    const gestureHandler1 = Gesture.Pan()
        .onBegin(() => {
            isDraggingKnob1.value = true;
            ctx.value = xKnob1.value;
        })
        .onChange((e) => {
            isDraggingKnob1.value = true;
            xKnob1.value =
                ctx.value + e.translationX < 0
                    ? 0
                    : ctx.value + e.translationX > xKnob2.value
                        ? xKnob2.value
                        : ctx.value + e.translationX;
        })
        .onFinalize(() => {
            isDraggingKnob1.value = false;
        });

    const gestureHandler2 = Gesture.Pan()
        .onBegin((e) => {
            isDraggingKnob2.value = true;
            ctx.value = xKnob2.value;
        })
        .onChange((e) => {
            xKnob2.value =
                ctx.value + e.translationX < xKnob1.value
                    ? xKnob1.value
                    : ctx.value + e.translationX > MAXWIDTH
                        ? MAXWIDTH
                        : ctx.value + e.translationX;
        })
        .onFinalize(() => {
            isDraggingKnob2.value = false;
        });

    const styleLine = useAnimatedStyle(() => {
        return {
            backgroundColor: "thistle",
            height: 3,
            marginTop: -3,
            borderRadius: 3,
            width: xKnob2.value - xKnob1.value,
            transform: [{ translateX: xKnob1.value }],
        };
    });
    const styleKnob1 = useAnimatedStyle(() => {
        return {
            zIndex: 11,
            transform: [
                { translateX: xKnob1.value },
                { scale: isDraggingKnob1.value ? 2 : 1 },
            ],
            borderWidth: isDraggingKnob1.value ? 4 : 1,
            borderColor: isDraggingKnob1.value ? "#d710a221" : "thistle",
        };
    });
    const styleKnob2 = useAnimatedStyle(() => {
        return {
            zIndex: 1,
            transform: [
                { translateX: xKnob2.value },
                { scale: isDraggingKnob2.value ? 2 : 1 },
            ],
            borderWidth: isDraggingKnob2.value ? 4 : 1,
            borderColor: isDraggingKnob2.value ? "#d710a221" : "thistle",
        };
    });

    const propsLabel1 = useAnimatedProps(() => {
        return {
            placeholder: `${Math.round((min + (xKnob1.value / MAXWIDTH) * (max - min)) / steps) *
                steps
                }`,
        };
    });
    const propsLabel2 = useAnimatedProps(() => {
        return {
            placeholder: `${Math.round((min + (xKnob2.value / MAXWIDTH) * (max - min)) / steps) *
                steps
                }`,
        };
    });

    return (
        <GestureHandlerRootView
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
            }}
        >
            <View style={styles.container}>
                <Text>Range Swiper double- Basic</Text>
                <View style={styles.rangeLabelContainer}>
                    <AnimatedTextInput
                        placeholder={min}
                        editable={false}
                        style={styles.rangeLabel}
                        animatedProps={propsLabel1}
                    />
                    <AnimatedTextInput
                        placeholder={max}
                        editable={false}
                        style={styles.rangeLabel}
                        animatedProps={propsLabel2}
                    />
                </View>
                <View style={styles.tackPath} />
                <Animated.View style={styleLine} />
                <View>
                    <GestureDetector gesture={gestureHandler1}>
                        <Animated.View style={[styles.knob, styleKnob1]} />
                    </GestureDetector>
                    <GestureDetector gesture={gestureHandler2}>
                        <Animated.View style={[styles.knob, styleKnob2]} />
                    </GestureDetector>
                </View>
            </View>
        </GestureHandlerRootView>
    );
};