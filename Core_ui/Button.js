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
    height: hp('5%'),
    justifyContent: 'center', 
    alignItems: 'center',
  },
  defaultStyleText: {
    fontFamily: 'NexaText-Trial-Bold',
    textAlign: 'center',
    color:"#ffffff" 
  },
});

const Button = (props) => {
  const { customeStyleButton, buttonText, customeStyleText,onClick,children,disabled } = props;
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={[styles.defaultStyleButton, customeStyleButton]} onPress={onClick} disabled={disabled}>
        <Text style={[styles.defaultStyleText, customeStyleText]}>
          {buttonText?buttonText:children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};


Button.defaultProps ={
  disabled:false
}
export default Button;