import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { StyleContext } from '../../GlobalStyleProvider';
import { TopHeaderBackground, LoginFooter } from '../../SvgIcons';
import { TextField } from '../../Core_ui/TextField';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CheckBox from '@react-native-community/checkbox';
import Button from '../../Core_ui/Button';

const style = StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: 'center', // Center the content vertically
    },

    bannerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('-15%'),
        marginBottom: hp('5%'), // Add some bottom margin to space out the form
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: wp('5%'),
    },
    textField: {
        backgroundColor: "#F2FAFD",
        borderRadius: 8,
        padding: wp('2%'),
        marginBottom: hp('2%'),
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp('2%'),
    },
    button: {
        backgroundColor: "#1385EC",
        marginVertical: hp('3%'),
        paddingVertical: hp('1.5%'),
        borderRadius: 8,
    },

});

function Login(props) {
    const globalStyle = useContext(StyleContext);
    const [isChecked, setIsChecked] = useState(false);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={[globalStyle.background, { flex: 1 }]}>
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
                        <Text style={globalStyle.boldText}>Mobile Number</Text>
                        <TextField
                            cutomStyle={style.textField}
                            placeHolder={'Mobile_number/ MID'}
                        />
                        <View style={style.checkboxContainer}>
                            <CheckBox
                                value={isChecked}
                                onValueChange={setIsChecked}
                                tintColors={{ true: '#007AFF', false: '#000000' }} // Customize colors
                            />
                            <Text style={[globalStyle.normalText, { flexWrap: 'wrap', marginLeft: wp('2%') }]}>
                                I accept terms, Conditions, and Privacy policy of GVP InfoTech
                            </Text>
                        </View>
                        <Button
                            customeStyleButton={style.button}
                            buttonText={'Login'}
                        />
                        <Text style={[globalStyle.normalText, { marginTop: hp('4%'), marginHorizontal: wp('10%'), textAlign: 'center' }]}>
                            Not an Arthpay registered Merchant?{' '}
                            <Text style={{ color: '#1286ED' }}>
                                Register here
                            </Text>
                        </Text>
                    </View>
                    <View style={style.footerContainer}>
                        <LoginFooter />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default Login;
