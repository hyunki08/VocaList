import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { styles } from '../Style';

export const VocaCard = ({ voca, interpretation, description, disabled = false, selected = false }) => {
    const [isSelected, setSelected] = useState(selected);
    const onSelect = () => setSelected(!isSelected);
    return (
        <Pressable disabled={disabled} style={{ ...styles.vocaCard, height: isSelected ? 170 : 100 }} onPress={onSelect}>
            <Text style={{ ...styles.text, ...styles.vocaText }}>
                {voca}
            </Text>
            {isSelected ? (
                <View>
                    <Text style={{ ...styles.text, ...styles.vocaInterpretation }}>
                        {interpretation}
                    </Text>
                    <Text style={{ ...styles.text, ...styles.vocaDescription }}>
                        {description}
                    </Text>
                </View>
            ) : (
                <View></View>
            )}
        </Pressable>
    );
}