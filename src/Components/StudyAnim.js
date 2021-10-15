import React, { useRef } from 'react';
import { Text, View, Dimensions, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { OPTION_CHECKED, OPTION_LABEL, OPTION_REPEAT, OPTION_SORT } from '../Constants';

export const StudyAnim = ({ animArea }) => {
    const vocas = ["Apple", "Baanan"];
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const getWidth = () => {
        const ratio = windowHeight / animArea.height * 0.9;
        return windowWidth / ratio;
    }
    const moveAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const startAnimMove = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(moveAnim, {
                    toValue: -10,
                    duration: 700,
                    useNativeDriver: true,
                }),
                Animated.timing(moveAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.delay(1000),
            ]),
            {
                iterations: -1
            }
        ).start();
    }
    const startAnimScale = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 0.8,
                    duration: 700,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.delay(1000),
            ]),
            {
                iterations: -1
            }
        ).start();
    }
    startAnimMove();
    startAnimScale();
    return (
        <View
            style={{
                height: "90%",
                width: getWidth(),
                borderWidth: 5,
                borderColor: animArea.height === 0 ? "black" : "white",
                borderRadius: 30,
                marginBottom: 20,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text style={{ position: "absolute", top: "35%", fontSize: 18, fontWeight: "500", color: "#999" }}>Apple</Text>
            <Text style={{ position: "absolute", top: "50%", fontSize: 14, fontWeight: "400", color: "#999" }}>사과</Text>
            <Animated.View style={{ position: "absolute", top: "70%", transform: [{ translateY: moveAnim, scale: scaleAnim }] }}>
                <MaterialIcons name="touch-app" size={40} color="white" />
            </Animated.View>
        </View>
    );
};