import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: wp('10%'),
  },
  defaultStyleButton: {
    borderRadius: 10,
    borderWidth: 0.5, 
    borderColor: '#DDD',
    height: hp('6%'),
    justifyContent: 'center', 
    alignItems: 'center',
    
   
  },
  defaultStyleText: {
    fontFamily: 'IBMPlexSans-Bold',
    textAlign: 'center',
    color:"#ffffff"
  },
});

const Button = ({customeStyleButton=undefined, buttonText=undefined, customeStyleText=undefined,onClick=undefined,children=undefined,disabled=false,customeStyleContainer=undefined}) => {

  return (
    <View style={[styles.buttonContainer,customeStyleContainer]}>
      <TouchableOpacity style={[styles.defaultStyleButton, customeStyleButton]} onPress={onClick} disabled={disabled}>
        <Text style={[styles.defaultStyleText, customeStyleText]}>
          {buttonText?buttonText:children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};


export default Button;