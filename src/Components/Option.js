import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { OPTION_REPEAT, OPTION_SORT } from '../Constants';
import { styles } from "../Style";

const OptionToggle = ({ on, name, icon, showIcon = false, activeColor, inactiveColor, onPress }) => {
    return (
        <Pressable style={{ ...styles.studyOptionToggle, borderColor: on ? "white" : "black" }} onPress={onPress}>
            {showIcon && icon !== "" ? (
                <MaterialIcons name={icon} size={24} color={on ? activeColor : inactiveColor} />
            ) : (
                <Text style={{ ...styles.studyOptionToggleText, color: on ? activeColor : inactiveColor }}>{name}</Text>
            )}
        </Pressable>
    );
};

export const Option = ({ option, showIcon = false, selectedValue, changeValue }) => {
    const [state, setState] = useState({ option, selectedValue });
    const onPress = (value) => {
        setState({ ...state, selectedValue: value });
        changeValue(value);
    };
    return (
        <View style={{ flexDirection: "row", alignItems: "center", height: 50, width: "100%", marginVertical: 5 }}>
            <Text style={{ ...styles.text, ...styles.studyOptionTitle }}>{state.option.name}</Text>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-evenly" }}>
                {state.option?.values.map(({ name, icon, value, activeColor, inactiveColor }) => (
                    <OptionToggle
                        key={value}
                        on={value === state.selectedValue}
                        name={name}
                        icon={icon}
                        showIcon={showIcon}
                        activeColor={activeColor}
                        inactiveColor={inactiveColor}
                        onPress={() => onPress(value)}
                    />
                ))}
            </View>
        </View>
    );
};