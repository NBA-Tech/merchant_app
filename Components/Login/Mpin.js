import React, { useContext, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { StyleContext } from '../../GlobalStyleProvider';
import { TopHeaderBackground, LoginFooter } from '../../SvgIcons';
import { TextField } from '../../Core_ui/TextField';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CheckBox from '@react-native-community/checkbox';
import Button from '../../Core_ui/Button';
import DotsLoader  from '../../DotsLoader';
import { BASE_URL } from '../../Config';
import { base64Encode,base64Decode,encryptAES256 } from '../../Encryption';
const style = StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: 'center', // Center the content vertically
    },

    bannerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('-25%'),
        marginBottom: hp('5%'), // Add some bottom margin to space out the form
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: wp('5%'),
    },
    textField: {
        backgroundColor: "#F2FAFD",
        width:'max-content',
        height:hp('10%')
    },
    button: {
        backgroundColor: "#1385EC",
        paddingVertical: hp('1.5%'),
        borderRadius: 8,
    },
    MpinContainer:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginVertical:hp('5%')
    }

});

function Mpin(props) {
    const globalStyle = useContext(StyleContext);
    const [loading,setLoading]=useState(false)
    const mPin1=useRef(null)
    const mPin2=useRef(null)
    const mPin3=useRef(null)
    const mPin4=useRef(null)

    const handleChange = (text, nextInputRef) => {
        if (text.length === 1 && nextInputRef) {
          nextInputRef.current.focus();
        }
      };
    

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={[globalStyle.backgroundWhite, { flex: 1 }]}>
                <View style={style.loginContainer}>
                    <View style={style.topHeaderContainer}>
                        <TopHeaderBackground />
                    </View>
                    <View style={style.bannerContainer}>
                        <Image
                            source={require('../../assets/images/loginBanner.png')}
                            style={{ width: wp('60%'), height: hp('20%'), resizeMode: 'contain' }}
                        />
                    </View>
                    <View style={style.formContainer}>
                        <Text style={globalStyle.boldTextBlack}>Confirm mPin</Text>
                        <View style={style.MpinContainer}>
                        <TextField
                            ref={mPin1}
                            cutomStyle={style.textField}
                            placeHolder={''}
                            onChange={(text) => handleChange(text, mPin2)}
                            keyboardType="numeric"
                            maxLength={1}
                        />

                         <TextField
                            ref={mPin2}
                            cutomStyle={style.textField}
                            placeHolder={''}
                            onChange={(text) => handleChange(text, mPin3)}
                            keyboardType="numeric"
                            maxLength={1}
                        />
                         <TextField
                         ref={mPin3}
                            cutomStyle={style.textField}
                            placeHolder={''}
                            onChange={(text) => handleChange(text, mPin4)}
                            keyboardType="numeric"
                            maxLength={1}
                        />
                         <TextField
                         ref={mPin4}
                            cutomStyle={style.textField}
                            placeHolder={''}
                            onChange={(text) => handleChange(text, null)}
                            keyboardType="numeric"
                            maxLength={1}
                        />

                        </View>
                       

                      
                    </View>
                    <View style={style.footerContainer}>
                        <LoginFooter />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default Mpin;
