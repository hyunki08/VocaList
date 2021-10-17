import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from '../Style';
import { STORAGE_KEY_CARDS, LABEL_COLORS } from '../Constants';
import { useContext } from 'react/cjs/react.development';
import { AppContext } from '../AppContext';

const Label = ({ level = 0, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={{
                position: "absolute",
                right: 25,
                width: 20,
                height: 30,
                borderBottomEndRadius: 5,
                borderBottomStartRadius: 5,
                backgroundColor: LABEL_COLORS[level]
            }}
        />
    );
}

const Check = ({ checked = false, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={{ position: "absolute", right: 20, bottom: 15, width: 40, height: 40, alignItems: "flex-end", justifyContent: "flex-end" }}
        >
            <MaterialIcons name="check" size={30} color={checked ? "white" : "#333"} />
        </Pressable>
    );
}

export const VocaCard = ({ id, card, disabled = false, selected = false }) => {
    const cardsUtil = useContext(AppContext);
    const [state, setState] = useState({ id, card, selected });
    const onSelect = () => setState({ ...state, selected: !state.selected });
    const save = async (newCard) => {
        cardsUtil.modifyCard(id, newCard);
    }
    const onPressLabel = async () => {
        const newCard = { ...state.card };
        newCard.markLevel = (newCard.markLevel + 1) % 4;
        save(newCard);
        setState({ ...state, card: newCard });
    };
    const onPressCheck = () => {
        const newCard = { ...state.card };
        newCard.checked = !newCard.checked;
        save(newCard);
        setState({ ...state, card: newCard });
    };
    const onPressLong = () => {
        Alert.alert("삭제", "단어를 삭제하시겠습니까?", [{ text: "아니오" }, {
            text: "삭제", onPress: () => { cardsUtil.deleteCard(id); }, style: "destructive"
        }]);
    }
    useEffect(() => {
        setState({ ...state, card });
    }, [card]);
    return (
        <Pressable disabled={disabled} style={{ ...styles.vocaCard, height: state.selected ? 170 : 100 }} onPress={onSelect} onLongPress={onPressLong}>
            {disabled === false && <Label level={state.card?.markLevel} onPress={onPressLabel} />}
            {disabled === false && <Check checked={state.card?.checked} onPress={onPressCheck} />}
            <Text style={{ ...styles.text, ...styles.vocaText }}>
                {state.card?.voca}
            </Text>
            {state.selected ? (
                <View>
                    <Text style={{ ...styles.text, ...styles.vocaInterpretation }}>
                        {state.card?.interpretation}
                    </Text>
                    <Text style={{ ...styles.text, ...styles.vocaDescription }}>
                        {state.card?.description}
                    </Text>
                </View>
            ) : (
                <View></View>
            )}
        </Pressable>
    );
}