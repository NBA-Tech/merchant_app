import React, { useContext, useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, NativeModules, TouchableOpacity, BackHandler,Linking  } from 'react-native';
import { StyleContext } from '../../GlobalStyleProvider';
import { TopHeaderBackground, LoginFooter } from '../../SvgIcons';
import { TextField } from '../../Core_ui/TextField';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CheckBox from '@react-native-community/checkbox';
import Button from '../../Core_ui/Button';
import DotsLoader from '../../DotsLoader';
import { BASE_URL } from '../../Config';
import { base64Encode, base64Decode, encryptAES256 } from '../../Encryption';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isValidEmail } from '../../HelperFunctions';
import { useBackHandler } from '../../BackHandler';

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
        borderRadius: 8,
        padding: wp('2%'),
        marginBottom: hp('2%'),
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: "#1385EC",
        paddingVertical: hp('1.5%'),
        borderRadius: 8,
        marginVertical:hp('2%')
    },
    MpinContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: hp('2%'),
    },
    otpField: {
        backgroundColor: "#F2FAFD",
        width: wp('12%'),
        height: hp('8%'),

    },
    resendOtp: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: hp('3%')
    },
    normalText: {
        fontSize: 16,
        color: '#000',
      },
      link: {
        color: '#1E90FF', // Highlight the link text (e.g., blue color)
        textDecorationLine: 'underline',
      },


});

function Login(props) {
    const globalStyle = useContext(StyleContext);
    const { navigation } = props
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState(undefined)
    const [mobile, setMobile] = useState(undefined)
    const [pasword, setPassword] = useState()
    const [isOtp, setIsOtp] = useState(false)
    const mPin1 = useRef(null)
    const mPin2 = useRef(null)
    const mPin3 = useRef(null)
    const mPin4 = useRef(null)
    const mPin5 = useRef(null)
    const mPin6 = useRef(null)
    const [seconds, setSeconds] = useState(0);
    const { showExitModal, setShowExitModal, handleCloseModal, handleExitApp } = useBackHandler();


    const handleChange = (text, nextInputRef) => {
        if (text.length === 1 && nextInputRef) {
            nextInputRef.current.focus();
        }
    };

    useEffect(() => {
        if (seconds === 0) return;

        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const remainingSeconds = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };


    const handleLogin = async () => {
        if (!isChecked) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'OOPS',
                textBody: "Accept the terms and conditions",
            });
            return

        }
        if (mobile == undefined || mobile == '' || email == undefined || email == '') {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'OOPS',
                textBody: "Mobile number/Email is required",
            });
            return

        }
        if (mobile.length < 10) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'OOPS',
                textBody: "Provide a valid mobile number",
            });
            return

        }
        if (pasword == undefined || pasword == '') {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'OOPS',
                textBody: "Password is required",
            });
            return

        }
        if (!isValidEmail(email)) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'OOPS',
                textBody: "Email is not valid",
            });
            return

        }
        setLoading(true)
        let base64_email = base64Encode(email)
        let client_token = base64Encode("" + email + "" + email)

        let token = base64_email + '.' + base64Encode(mobile + "." + encryptAES256(pasword, client_token))
        let payload = {
            token: token,
            email: base64_email
        }

        const check_login_api = await fetch(`${BASE_URL}/app/login`, {
            method: 'POST',
            headers: {
                'x-client-token': client_token,
                'content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        const is_login = await check_login_api.json()
        if (is_login?.obj == "Authentication Successful") {
            setSeconds(120)
            setLoading(false)
            setIsOtp(true)
        }
        else {
            setLoading(false)
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Login Failed',
                textBody: is_login?.obj,
            });
        }

    }
    const getOtp = () => {
        return [mPin1, mPin2, mPin3, mPin4, mPin5, mPin6]
            .map((value) => value.current.getValue())
            .join('');
    };
    const handleOtp = async () => {
        const otp_values = getOtp()
        if (!otp_values || otp_values.length != 6) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Oops',
                textBody: 'OTP field is empty',
            });
            return

        }
        setLoading(true)
        let payload = {
            name: "",
            email: email,
            mobile_no: mobile,
            otp: otp_values,
            module: ""
        }

        const validate_otp_api = await fetch(`${BASE_URL}/app/validateotp`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const validate_otp_api_response = await validate_otp_api.json()
        let get_active_status_api_response = ""
        if (validate_otp_api_response?.key) {
            setLoading(false)
            if (validate_otp_api_response?.value == "Valid") {
                payload = {
                    email: email
                }
                const get_active_status_api = await fetch(`${BASE_URL}/app/merchant/getActiveStatus`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })

                get_active_status_api_response = await get_active_status_api.json()
            }
        }
        if (validate_otp_api_response?.value == "Valid") {
            // await AsyncStorage.removeItem('merchant_status_data');

            await AsyncStorage.setItem('merchant_status_data', JSON.stringify(get_active_status_api_response));

            navigation.navigate('mpin', { type: 'setMpin' })

        }
        else {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Login Failed',
                textBody: 'OTP FAILED',
            });
        }
        setLoading(false)

    }

    const handleResendOtp = async () => {
        let payload = {
            name: "",
            email: email,
            mobile_no: mobile,
            otp: "",
            module: ""
        }

        const send_otp_api = await fetch(`${BASE_URL}/app/generateotp`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const send_otp_api_res = await send_otp_api.json()

        if (send_otp_api_res?.statusCode == 200) {
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'SUCCESS',
                textBody: 'OTP SENT',
            });
            setSeconds(120)
        }



    }

    useEffect(() => {
        const backAction = () => {
            setShowExitModal(true)
            return true

        };

        BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, [navigation]);


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
                        {!isOtp ? (
                            <View>
                                <Text style={globalStyle.boldTextBlack}>Mobile Number</Text>
                                <TextField
                                    cutomStyle={style.textField}
                                    placeHolder={'Mobile Number'}
                                    onChange={setMobile}
                                    keyboardType="numeric"
                                    maxLength={10}
                                />

                                <Text style={globalStyle.boldTextBlack}>Email</Text>
                                <TextField
                                    cutomStyle={style.textField}
                                    placeHolder={'Email'}
                                    onChange={setEmail}
                                    keyboardType="email-address"
                                />

                                <Text style={globalStyle.boldTextBlack}>Password</Text>
                                <TextField
                                    cutomStyle={style.textField}
                                    placeHolder={'Password'}
                                    onChange={setPassword}
                                    isPassword={true}
                                />
                                <View style={style.checkboxContainer}>
                                    <CheckBox
                                        value={isChecked}
                                        onValueChange={setIsChecked}
                                        tintColors={{ true: '#007AFF', false: '#000000' }} // Customize colors
                                    />
                                    <Text style={[style.normalText, { flexWrap: 'wrap' }]}>
                                        I accept{' '}
                                        <Text style={style.link} onPress={()=>{Linking.openURL('https://merchant.arthpay.com/doc/tnc2.pdf')}}>
                                            terms & conditions
                                        </Text>
                                        ,{' '}
                                        <Text style={style.link} onPress={()=>{Linking.openURL('https://merchant.arthpay.com/doc/tnc2.pdf')}}>
                                            privacy policy
                                        </Text>{' '}
                                        of GVP Infotech Limited (Arthpay)
                                    </Text>
                                </View>
                                <Button
                                    customeStyleButton={style.button}
                                    onClick={!loading ? handleLogin : null}
                                    disabled={loading}
                                >
                                    {loading ? <DotsLoader /> : 'Send OTP'}
                                </Button>
                            </View>

                        ) :
                            <View>
                                <Text style={[globalStyle.boldTextBlack, { paddingHorizontal: wp('3%') }]}>Verify OTP</Text>
                                <View style={style.MpinContainer}>
                                    <TextField
                                        ref={mPin1}
                                        cutomStyle={style.otpField}
                                        placeHolder={''}
                                        onChange={(text) => handleChange(text, mPin2)}
                                        keyboardType="numeric"
                                        maxLength={1}
                                    />

                                    <TextField
                                        ref={mPin2}
                                        cutomStyle={style.otpField}
                                        placeHolder={''}
                                        onChange={(text) => handleChange(text, mPin3)}
                                        keyboardType="numeric"
                                        maxLength={1}
                                    />
                                    <TextField
                                        ref={mPin3}
                                        cutomStyle={style.otpField}
                                        placeHolder={''}
                                        onChange={(text) => handleChange(text, mPin4)}
                                        keyboardType="numeric"
                                        maxLength={1}
                                    />
                                    <TextField
                                        ref={mPin4}
                                        cutomStyle={style.otpField}
                                        placeHolder={''}
                                        onChange={(text) => handleChange(text, mPin5)}
                                        keyboardType="numeric"
                                        maxLength={1}
                                    />
                                    <TextField
                                        ref={mPin5}
                                        cutomStyle={style.otpField}
                                        placeHolder={''}
                                        onChange={(text) => handleChange(text, mPin6)}
                                        keyboardType="numeric"
                                        maxLength={1}
                                    />
                                    <TextField
                                        ref={mPin6}
                                        cutomStyle={style.otpField}
                                        placeHolder={''}
                                        onChange={(text) => handleChange(text, null)}
                                        keyboardType="numeric"
                                        maxLength={1}
                                    />





                                </View>
                                <View style={style.resendOtp}>
                                    {seconds > 0 ? (
                                        <Text style={globalStyle.blackSubText}>OTP expires in  {seconds} s</Text>
                                    ) : (
                                        <TouchableOpacity onPress={handleResendOtp}>
                                            <Text style={globalStyle.blueMediumText}>Resend Otp</Text>
                                        </TouchableOpacity>

                                    )


                                    }

                                </View>


                                <Button
                                    customeStyleButton={style.button}
                                    onClick={(!loading && seconds > 0) ? handleOtp : null}
                                    disabled={(loading || seconds <= 0)}
                                >
                                    {loading ? <DotsLoader /> : 'Verify'}
                                </Button>
                            </View>

                        }

                    </View>

                </View>
            </View>
        </ScrollView>
    );
}

export default Login;
