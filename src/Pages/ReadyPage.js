import React, { useState } from 'react';
import { Text, View, Pressable, SafeAreaView } from 'react-native';
import { Option } from '../Components/Option';
import { OPTION_CHECKED, OPTION_LABEL, OPTION_REPEAT, OPTION_SORT } from '../Constants';
import { styles } from "../Style";
import { StudyAnim } from '../Components/StudyAnim';

export const ReadyPage = ({ navigation }) => {
    const [state, setState] = useState({
        sort: OPTION_SORT.default,
        repeat: OPTION_REPEAT.default,
        label: OPTION_LABEL.default,
        checked: OPTION_CHECKED.default,
    });
    const [animArea, setAnimArea] = useState({ width: 0, height: 0 });
    const onLayout = event => {
        const { height, width } = event.nativeEvent.layout;
        setAnimArea({ width: width, height: height });
    };
    const changeSort = (value) => setState({ ...state, sort: value });
    const changeLabel = (value) => setState({ ...state, label: value });
    const changeChecked = (value) => setState({ ...state, checked: value });
    const changeRepeat = (value) => setState({ ...state, repeat: value });
    const start = () => {
        console.log("start");
        console.log(state);
        navigation.push('StudyPage', { ...state });
    };
    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.title}>
                <Text style={styles.titleText}>학습 시작</Text>
            </View>

            <View style={{ flex: 1.3, justifyContent: "center", alignItems: "center" }} onLayout={onLayout}>
                <StudyAnim animArea={animArea} />
            </View>

            <View style={{ flex: 1, justifyContent: "space-between", marginBottom: 30 }}>
                <Option option={{ ...OPTION_SORT }} selectedValue={state.sort} changeValue={changeSort} />
                <Option option={{ ...OPTION_LABEL }} selectedValue={state.label} showIcon={true} changeValue={changeLabel} />
                <Option option={{ ...OPTION_CHECKED }} selectedValue={state.checked} showIcon={true} changeValue={changeChecked} />
                <Option option={{ ...OPTION_REPEAT }} selectedValue={state.repeat} showIcon={true} changeValue={changeRepeat} />
            </View>

            <View style={{ flexGlow: 1, justifyContent: "flex-end", marginBottom: 15 }}>
                <Pressable style={styles.button} onPress={start}>
                    <Text style={styles.buttonText}>시작하기</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}