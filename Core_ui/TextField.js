import React, { forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { TextInput } from 'react-native-paper';

export const TextField = forwardRef((props, ref) => {
  const { placeHolder, onChange, cutomStyle, placeHolderTextColor,isPassword } = props; 

  return (
    <View style={styles.textContainer}>
      <TextInput
        ref={ref}
        placeholder={placeHolder} 
        onChangeText={onChange}
        style={[styles.defaultText, cutomStyle]} 
        placeholderTextColor={placeHolderTextColor}
         underlineColor="transparent"
         activeUnderlineColor="transparent"
         textColor='#3D5920'
         secureTextEntry={isPassword}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  textContainer: {
    marginHorizontal: wp('1%'),
  },
  defaultText: {
    borderRadius: 5,
    height: 20,
    fontFamily: 'IBMPlexSans-Bold',
    marginVertical:hp('2%'),
    borderRadius:8,
    borderWidth: 1,              
    borderColor: '#D4D7E3',      
    borderStyle: 'solid',
  },
});
TextField.defaultProps ={
  placeHolder:'Enter text here',
  placeHolderTextColor:'#8897AD',
  isPassword:false
}