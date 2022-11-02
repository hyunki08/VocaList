import React, { useState } from "react";
import { TextInput } from "react-native";
import { styles } from "../Style";

export const Input = ({ placeholder, onEndEditing, onFoucus }) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const endEditing = () => {
    setFocused(false);
    onEndEditing(value);
    onFoucus(false);
  };
  return (
    <TextInput
      autoCorrect={false}
      placeholderTextColor="#999"
      placeholder={placeholder}
      value={value}
      onChangeText={(text) => setValue(text)}
      style={{
        ...styles.input,
        backgroundColor: focused === true ? "white" : "#DDD",
      }}
      onFocus={() => {
        setFocused(true);
        onFoucus(true);
      }}
      onEndEditing={endEditing}
    />
  );
};
