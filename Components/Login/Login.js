import React, { useContext, useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, NativeModules, TouchableOpacity } from 'react-native';
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
    }


});

function Login(props) {
    const globalStyle = useContext(StyleContext);
    const { navigation } = props
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState()
    const [mobile, setMobile] = useState()
    const [pasword, setPassword] = useState()
    const [isOtp, setIsOtp] = useState(false)
    const mPin1 = useRef(null)
    const mPin2 = useRef(null)
    const mPin3 = useRef(null)
    const mPin4 = useRef(null)
    const mPin5 = useRef(null)
    const mPin6 = useRef(null)
    const [seconds, setSeconds] = useState(0);

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
        setLoading(true)
        let base64_email = base64Encode(email)
        let client_token = base64Encode("" + email + "" + email)

        let token = base64_email + '.' + base64Encode(mobile + "." + encryptAES256(pasword, client_token))
        let payload = {
            token: token,
            email: base64_email
        }
        console.log(payload)

        const check_login_api = await fetch(`${BASE_URL}/app/login`, {
            method: 'POST',
            headers: {
                'x-client-token': client_token,
                'content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        const is_login = await check_login_api.json()
        console.log(is_login)
        if (is_login?.obj == "Authentication Successful") {
            setSeconds(60)
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
        setLoading(true)
        let payload = {
            name: "",
            email: email,
            mobile_no: mobile,
            otp: getOtp(),
            module: ""
        }
        console.log(payload)

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
                console.log(get_active_status_api_response, email)
            }
        }
        if (validate_otp_api_response?.value == "Valid") {
            await AsyncStorage.removeItem('merchant_status_data');

            await AsyncStorage.setItem('merchant_status_data', JSON.stringify(get_active_status_api_response));

                navigation.navigate('mpin',{type:'setMpin'})

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

    const handleResendOtp=async()=>{
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
        const send_otp_api_res=await send_otp_api.json()
        console.log(send_otp_api_res)
        
        if(send_otp_api_res?.statusCode==200){
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'SUCCESS',
                textBody: 'OTP SENT',
            });
            setSeconds(60)
        }



    }

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
                                    placeHolder={'Mobile_number/ MID'}
                                    onChange={setMobile}
                                />

                                <Text style={globalStyle.boldTextBlack}>Email</Text>
                                <TextField
                                    cutomStyle={style.textField}
                                    placeHolder={'Email'}
                                    onChange={setEmail}
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
                                    <Text style={[globalStyle.normalText, { flexWrap: 'wrap', marginLeft: wp('2%') }]}>
                                        I accept terms, Conditions, and Privacy policy of GVP InfoTech
                                    </Text>
                                </View>
                                <Button
                                    customeStyleButton={style.button}
                                    onClick={!loading ? handleLogin : null}
                                    disabled={loading}
                                >
                                    {loading ? <DotsLoader /> : 'Send Otp'}
                                </Button>
                                <Text style={[globalStyle.normalText, { marginTop: hp('4%'), marginHorizontal: wp('10%'), textAlign: 'center' }]}>
                                    Not an Arthpay registered Merchant?{' '}
                                    <Text style={{ color: '#1286ED' }}>
                                        Register here
                                    </Text>
                                </Text>
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
                                        <Text style={globalStyle.blackSubText}>OTP Expires on : {seconds} s</Text>
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
