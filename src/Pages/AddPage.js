import React, { useRef, useState, useContext } from 'react';
import { SafeAreaView, Text, View, Pressable, Alert, Animated } from 'react-native';
import { styles } from '../Style';
import { MaterialIcons } from '@expo/vector-icons';
import { VocaCard } from '../Components/VocaCard';
import { DEFAULT_CARD_DATA } from '../Constants';
import { Input } from '../Components/Input';
import { AppContext } from '../AppContext';


export const AddPage = ({ navigation }) => {
    const cardsUtil = useContext(AppContext);
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
    const save = async (save) => {
        if (save) {
            if (!state || !state?.voca) { Alert.alert("단어", "단어를 입력하세요.", [{ text: "확인" }]); return; }
            if (!state || !state?.interpretation) { Alert.alert("뜻", "뜻을 입력하세요.", [{ text: "확인" }]); return; }

            try {
                const result = cardsUtil.addCard({ ...state, ...DEFAULT_CARD_DATA });
                if (result)
                    Alert.alert("성공", "단어가 정상적으로 추가되었습니다.", [{ text: "확인", onPress: () => { navigation.pop(); } }]);
                else
                    Alert.alert("실패", "알 수 없는 이유로 단어를 추가할 수 없습니다.", [{ text: "확인", onPress: () => { navigation.pop(); } }]);
            } catch {
                Alert.alert("실패", "알 수 없는 이유로 단어를 추가할 수 없습니다.", [{ text: "확인", onPress: () => { navigation.pop(); } }]);
            }
        } else {
            navigation.pop();
        }
    };
    return (
        <SafeAreaView style={styles.page}>
            <View style={{ ...styles.subTitle }}>
                <Pressable onPress={() => save(false)}>
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
                    <Pressable style={styles.button} onPress={() => save(true)}>
                        <Text style={styles.buttonText}>저장</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}