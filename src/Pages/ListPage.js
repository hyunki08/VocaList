import React, { useCallback, useState } from 'react';
import { ScrollView, Text, View, Pressable, SafeAreaView } from 'react-native';
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
        <SafeAreaView style={styles.page}>
            <View style={styles.title}>
                <Text style={styles.titleText}>내 단어장</Text>
            </View>

            {!!cards && Object.keys(cards).length > 0 &&
                <ScrollView>
                    {Object.keys(cards).map(key => (
                        <VocaCard
                            key={key}
                            id={key}
                            card={cards[key]}
                        />
                    ))}
                </ScrollView>
            }

            {(!cards || (!!cards && Object.keys(cards).length === 0)) &&
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ ...styles.text, fontSize: 18, fontWeight: "600", marginTop: -100 }}>단어장이 비어있습니다.</Text>
                    <Text style={{ ...styles.text, fontSize: 16, fontWeight: "600", marginTop: 10 }}>+ 버튼을 눌러 단어를 추가하세요.</Text>
                </View>
            }

            <Pressable style={styles.floatingButton} onPress={addVoca}>
                <MaterialIcons name="add" size={30} color="black" />
            </Pressable>
        </SafeAreaView>
    );
}