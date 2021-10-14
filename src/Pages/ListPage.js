import React, { useCallback, useState } from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { styles } from '../Style';
import { MaterialIcons } from '@expo/vector-icons';
import { VocaCard } from '../Components/VocaCard';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY_CARDS } from '../Constants';

export const ListPage = ({ navigation, route }) => {
    const [cards, setCards] = useState({});
    const addVoca = () => { navigation.push('AddPage', { card: {} }) }
    const onLoad = async () => {
        const cards = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY_CARDS));
        if (cards) {
            setCards(cards);
        }
    }
    useFocusEffect(
        useCallback(() => {
            onLoad()
        }, [])
    );
    return (
        <View style={styles.page}>
            <View style={styles.title}>
                <Text style={styles.titleText}>단어장</Text>
            </View>

            <ScrollView>
                {cards ?
                    Object.keys(cards).map(key => (
                        <VocaCard
                            key={key}
                            voca={cards[key].voca}
                            interpretation={cards[key].interpretation}
                            description={cards[key].description}
                        />
                    )) : (
                        <View>
                            <Text style={styles.text}>단어장이 비어있습니다.</Text>
                        </View>
                    )}
            </ScrollView>

            <Pressable style={styles.floatingButton} onPress={addVoca}>
                <MaterialIcons name="add" size={30} color="black" />
            </Pressable>
        </View>
    );
}