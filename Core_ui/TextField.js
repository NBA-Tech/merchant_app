import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const TextField = forwardRef((props, ref) => {
  const { placeHolder, onChange, cutomStyle, placeHolderTextColor, isPassword, keyboardType, maxLength } = props;
  const [inputValue, setInputValue] = useState(""); // State to track input value
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    getValue: () => inputValue,  // Returns the current input value from state
    focus: () => inputRef.current?.focus(),  // Focuses the TextInput
  }));


  return (
    <View style={styles.textContainer}>
      <TextInput
        ref={inputRef}
        placeholder={placeHolder}
        value={inputValue} // Controlled input value
        onChangeText={(text) => {
          setInputValue(text); // Update state
          if (onChange) {
            onChange(text); // Call the onChange function if provided
          }
        }}
        style={[styles.defaultText, cutomStyle]}
        placeholderTextColor={placeHolderTextColor}
        underlineColor="transparent"
        activeUnderlineColor="#1385EC"
        textColor="#3D5920"
        secureTextEntry={isPassword}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  textContainer: {
    marginHorizontal: wp('1%'),
  },
  defaultText: {
    borderRadius: 8,
    height: hp('2%'),
    fontFamily: 'IBMPlexSans-Bold',
    marginVertical: hp('2%'),
    borderWidth: 1,
    borderColor: '#D4D7E3',
    borderStyle: 'solid',
  },
});

TextField.defaultProps = {
  placeHolder: 'Enter text here',
  placeHolderTextColor: '#8897AD',
  isPassword: false,
};
