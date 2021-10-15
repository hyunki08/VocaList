import React, { useState } from 'react';
import { ScrollView, Text, View, Pressable, SafeAreaView } from 'react-native';
import { styles } from "../Style";

export const StudyPage = ({ navigation }) => {
    const start = () => {
        console.log("start");
    };
    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.title}>
                <Text style={styles.titleText}>학습 시작</Text>
            </View>

            <View style={{ flexGrow: 1, justifyContent: "flex-end", marginBottom: 20}}>
                <Pressable style={styles.button} onPress={start}>
                    <Text style={styles.buttonText}>시작하기</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}