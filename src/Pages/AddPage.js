import React, { useRef, useState } from 'react';
import { Text, View, Pressable, Alert, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../Style';
import { MaterialIcons } from '@expo/vector-icons';
import { VocaCard } from '../Components/VocaCard';
import { STORAGE_KEY_CARDS } from '../Constants';
import { Input } from '../Components/Input';

const DEFAULT_CARD_DATA = {
    checked: false,
    markLevel: 0,
};

export const AddPage = ({ navigation, route }) => {
    const [state, setState] = useState();
    const endVocaEditing = (value) => {
        const newState = { ...state, voca: value };
        setState(newState);
    }
    const endInterpretationEditing = (value) => {
        const newState = { ...state, interpretation: value };
        setState(newState);
    }
    const endDescriptionEditing = (value) => {
        const newState = { ...state, description: value };
        setState(newState);
    }
    const moveAnim = useRef(new Animated.Value(0)).current;
    const moveInputView = (up) => {
        if (up) {
            Animated.timing(moveAnim, {
                toValue: -180,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(moveAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }
    const onSave = async (save) => {
        if (save) {
            if (!state || !state?.voca) { Alert.alert("단어", "단어를 입력하세요.", [{ text: "확인" }]); return; }
            if (!state || !state?.interpretation) { Alert.alert("뜻", "뜻을 입력하세요.", [{ text: "확인" }]); return; }

            try {
                // 11월 1일 오전 11시
                // 일요일 저녁 7시
                const oldCards = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY_CARDS));
                const newCards = oldCards ? { ...oldCards, [Date.now()]: { ...state, ...DEFAULT_CARD_DATA } } : { [Date.now()]: { ...state, ...DEFAULT_CARD_DATA } };
                await AsyncStorage.setItem(STORAGE_KEY_CARDS, JSON.stringify(newCards));
                Alert.alert("성공", "단어가 정상적으로 추가되었습니다.", [{ text: "확인", onPress: () => { navigation.pop(); } }]);
            } catch {
                Alert.alert("실패", "알 수 없는 이유로 단어를 추가할 수 없습니다.", [{ text: "확인", onPress: () => { navigation.pop(); } }]);
            }
        } else {
            navigation.pop();
        }
    };
    return (
        <View style={styles.page}>
            <View style={{ ...styles.subTitle }}>
                <Pressable onPress={() => onSave(false)}>
                    <MaterialIcons name="arrow-back-ios" size={30} color="white" style={{ marginRight: 10 }} />
                </Pressable>
                <Text style={styles.subTitleText}>단어 추가</Text>
            </View>

            <VocaCard card={{ ...state }} disabled={true} selected={true} />

            <View style={{ flex: 1 }}>
                <Animated.View style={{ transform: [{ translateY: moveAnim }], backgroundColor: "black" }}>
                    <Input placeholder="단어를 입력하세요." onEndEditing={endVocaEditing} onFoucus={moveInputView} />
                    <Input placeholder="뜻을 입력하세요." onEndEditing={endInterpretationEditing} onFoucus={moveInputView} />
                    <Input placeholder="(선택) 설명 입력하세요." onEndEditing={endDescriptionEditing} onFoucus={moveInputView} />
                </Animated.View>

                <View style={{ flexGrow: 1, justifyContent: "flex-end" }}>
                    <Pressable style={styles.button} onPress={() => onSave(true)}>
                        <Text style={styles.buttonText}>저장</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}