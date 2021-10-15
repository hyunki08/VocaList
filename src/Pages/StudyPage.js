import React, { useState } from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { styles } from "../Style";

export const StudyPage = ({ navigation }) => {
    const start = () => {
        console.log("start");
    };
    return (
        <View style={styles.page}>
            <View style={styles.title}>
                <Text style={styles.titleText}>학습하기</Text>
            </View>

            <View style={{ flexGrow: 1, justifyContent: "flex-end" }}>
                <Pressable style={styles.button} onPress={start}>
                    <Text style={styles.buttonText}>시작하기</Text>
                </Pressable>
            </View>
        </View>
    );
}