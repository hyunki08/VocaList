import React, { useState, useContext } from 'react';
import { Text, View, Pressable, SafeAreaView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from "../Style";
import { AppContext } from '../AppContext';
import { LABEL_COLORS } from '../Constants';

export const StudyPage = ({ navigation, route }) => {
    const cardUtils = useContext(AppContext);
    const [curIndex, setCurIndex] = useState(0);
    const [showInterpretation, setShowInterpretation] = useState(false);
    const isRepeat = route?.params?.repeat !== "one";
    const indexs = route?.params?.keys;
    const onBack = () => {
        navigation.pop();
    };
    const nextCard = () => {
        if (!showInterpretation) {
            setShowInterpretation(true);
            return;
        }
        if (isRepeat || indexs.length > curIndex + 1) {
            setShowInterpretation(false);
            setCurIndex((curIndex + 1) % indexs.length);
            return;
        }
        Alert.alert("학습 종료", "학습이 종료되었습니다.", [{ text: "확인", onPress: () => onBack() }])
    }
    const onPressLabel = async () => {
        const newCard = { ...cardUtils.cards[indexs[curIndex]] };
        newCard.markLevel = (newCard.markLevel + 1) % 4;
        cardUtils.modifyCard(indexs[curIndex], newCard);
    };
    const onPressCheck = () => {
        const newCard = { ...cardUtils.cards[indexs[curIndex]] };
        newCard.checked = !newCard.checked;
        cardUtils.modifyCard(indexs[curIndex], newCard);
    };
    console.log(route);
    return (
        <SafeAreaView style={styles.page}>
            <View style={{ ...styles.subTitle }}>
                <Pressable onPress={() => onBack()}>
                    <MaterialIcons name="arrow-back-ios" size={30} color="white" style={{ marginRight: 10 }} />
                </Pressable>
                <Text style={styles.subTitleText}></Text>
            </View>

            <Pressable style={{ flex: 1 }} onPress={nextCard}>
                <View style={{ flex: 7, alignItems: "center" }}>
                    <Text
                        style={{
                            ...styles.text,
                            fontSize: 40,
                            fontWeight: "600",
                            textAlign: "center",
                            position: "absolute",
                            top: "20%"
                        }}
                    >
                        {cardUtils.cards[indexs[curIndex]].voca}
                    </Text>
                    {showInterpretation &&
                        <Text
                            style={{
                                ...styles.text,
                                fontSize: 30,
                                fontWeight: "600",
                                marginBottom: 200,
                                position: "absolute",
                                top: "35%"
                            }}
                        >
                            {cardUtils.cards[indexs[curIndex]].interpretation}
                        </Text>
                    }
                </View>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                    <Pressable style={{ height: "100%", width: 100, alignItems: "center" }} onPress={onPressLabel}>
                        <MaterialIcons name="label" size={50} color={LABEL_COLORS[cardUtils.cards[indexs[curIndex]].markLevel]} />
                    </Pressable>
                    <Pressable style={{ height: "100%", width: 100, alignItems: "center" }} onPress={onPressCheck}>
                        <MaterialIcons name="check" size={50} color={cardUtils.cards[indexs[curIndex]].checked ? "white" : "#333"} />
                    </Pressable>
                </View>
            </Pressable>
        </SafeAreaView>
    );
}