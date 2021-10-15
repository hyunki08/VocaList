import React, { useContext } from 'react';
import { Text, View, Pressable, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from "../Style";
import { AppContext } from '../AppContext';

export const StudyPage = ({ navigation, route }) => {
    const cardsUtil = useContext(AppContext).cards;
    const onBack = () => {
        navigation.pop();
    };
    return (
        <SafeAreaView style={styles.page}>
            <View style={{ ...styles.subTitle }}>
                <Pressable onPress={() => onBack()}>
                    <MaterialIcons name="arrow-back-ios" size={30} color="white" style={{ marginRight: 10 }} />
                </Pressable>
                <Text style={styles.subTitleText}></Text>
            </View>
        </SafeAreaView>
    );
}