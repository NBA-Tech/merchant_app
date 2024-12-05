import React, { useContext, useEffect, useState, useRef, useCallback } from 'react';
import { StyleContext } from '../../GlobalStyleProvider';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image, SafeAreaView, Modal, AppState } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DateHeader from '../../Core_ui/DateHeader';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Footer from '../Footer';
import { getMerchantSession } from '../../HelperFunctions';
import { BASE_URL } from '../../Config';
import { AuthContext } from '../../AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextField } from '../../Core_ui/TextField';
import Button from '../../Core_ui/Button';
import { useFocusEffect } from '@react-navigation/native';
import { useBackHandler } from '../../BackHandler';
import BackgroundTimer from 'react-native-background-timer';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import DotsLoader from '../../DotsLoader';
import { base64Encode, base64Decode, encryptAES256, decryptAES256 } from '../../Encryption';
import { useAuth } from '../../AuthProvider';
const style = StyleSheet.create({
    profilePage: {
        backgroundColor: "#ffffff",
        flex: 1,

    },
    homeContainer: {
        flexDirection: 'column',
        flex: 1,
    },
    headerBg: {
        backgroundColor: '#073761',
        height: hp('15%'),
        borderBottomLeftRadius: 300,
        borderBottomRightRadius: 300,
        position: 'absolute',
        right: '-10%',
        left: '-10%',


    },
    formContainer: {
        flex: 1, // Take remaining space below the header
        justifyContent: 'space-between', // Center content vertically
        paddingHorizontal: wp('5%'),
        flexDirection: 'column',
        marginTop: hp('-10%')

    },
    MpinContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    textField: {
        backgroundColor: "#F2FAFD",
        width: wp('12%'),
        height: hp('8%'),
    },
    buttonMainContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1
    },
    textFilled: {
        color: "#FFFFFF",
        paddingHorizontal: wp('10%')

    },
    buttonFilled: {
        backgroundColor: "#1385EC",
        marginHorizontal: wp('0%'),
        marginVertical: hp('1%'),
        borderRadius: 10,           // Rounded corners
        borderWidth: 1,             // Border thickness
    },
    resendOtp: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: hp('3%')
    },
    mpinText: {
        backgroundColor: "#F2FAFD",
        width: 'max-content',
        height: hp('10%'),
        textAlign: 'center',
        width: wp('20%')
    },
    outLinedButton: {
        backgroundColor: "#ffffff",
        borderColor: '#1286ED',
        marginHorizontal: wp('0%'),
        marginVertical: hp('1%'),
        borderRadius: 10,           // Rounded corners
        borderWidth: 1,
    },
    disabledOutLinedButton: {
        backgroundColor: "#f0f0f0",
        borderColor: "#d0d0d0",
        opacity: 0.7,
        marginHorizontal: wp('0%'),
        marginVertical: hp('1.1%'),
        
      },


})


const ResetMpin = (props) => {
    const { navigation } = props
    const globalStyle = useContext(StyleContext);
    const [loading, setLoading] = useState(false)
    const mPin1 = useRef(null)
    const mPin2 = useRef(null)
    const mPin3 = useRef(null)
    const mPin4 = useRef(null)
    const mPin5 = useRef(null)
    const mPin6 = useRef(null)
    const mPin2_1 = useRef(null)
    const mPin2_2 = useRef(null)
    const mPin2_3 = useRef(null)
    const mPin2_4 = useRef(null)
    const [isMpin, setISmPIN] = useState()
    const [seconds, setSeconds] = useState(0)
    const { showExitModal, setShowExitModal, handleCloseModal, handleExitApp } = useBackHandler();
    const [appState, setAppState] = useState(AppState.currentState);
    const [retryOtp, setRetryOtp] = useState(true)
    const [screenType, setScreenType] = useState("curr_mpin")
    const { isAuthenticated, setIsAuthenticated } = useAuth();

    const handleChange = (text, currentRef, nextInputRef, direction) => {
        if (direction === 'forward' && text.length === 1 && nextInputRef) {
            nextInputRef.current.focus();
        }
    };

    const handleKeyPress = (nativeEvent, prevInputRef, currentRef, direction) => {
        if (direction === 'backward' && nativeEvent.key === 'Backspace' && !nativeEvent.text && prevInputRef) {
            prevInputRef.current.focus();
        }
    };
    const getOtp = () => {
        return [mPin1, mPin2, mPin3, mPin4, mPin5, mPin6]
            .map((value) => value.current.getValue())
            .join('');
    };
    const validateMpin = async () => {
        let merchantSessionData = await AsyncStorage.getItem('merchant_status_data')
        merchantSessionData = JSON.parse(merchantSessionData)

        let mpin = mPin1.current.getValue() + mPin2.current.getValue() + mPin3.current.getValue() + mPin4.current.getValue()
        if (mpin.length != 4) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Oops',
                textBody: "Fill 4 digit MPIN",
            });
            return

        }
        setLoading(true)

        let token = base64Encode(merchantSessionData?.clientDetails?.id) + '.' + base64Encode(encryptAES256(base64Encode(JSON.stringify(

            {
                mpin: mpin,
                clientId: merchantSessionData?.clientDetails?.id
            },

        )),
            merchantSessionData?.clientDetails?.secret
        ))
        const validate_mpin_api = await fetch(`${BASE_URL}/app/validateMerchantMpin`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                token: token
            })
        })
        console.log(validate_mpin_api.headers.get('x-token'), mpin, merchantSessionData)
        let validate_mpin_res = validate_mpin_api.headers.get('x-token')
        validate_mpin_res = decryptAES256(validate_mpin_res, merchantSessionData?.clientDetails?.secret)

        if (validate_mpin_res == "true") {
            [mPin1, mPin2, mPin3, mPin4].map((value, index) => {
                value.current.setValue('')
            })
            console.log(validate_mpin_res, screenType)
            setScreenType("otp")

        }
        else {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Failed',
                textBody: 'Check Mpin',
            });

        }
        setLoading(false)




    }

    const setMpin = async () => {
        let merchantSessionData = await AsyncStorage.getItem('merchant_status_data')
        merchantSessionData = JSON.parse(merchantSessionData)

        let mpin = mPin1.current.getValue() + mPin2.current.getValue() + mPin3.current.getValue() + mPin4.current.getValue()
        let mpin2 = mPin2_1.current.getValue() + mPin2_2.current.getValue() + mPin2_3.current.getValue() + mPin2_4.current.getValue()
        if (mpin != mpin2) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Oops',
                textBody: "MPIN doesn't match",
            });
            return
        }

        if (mpin == '' || mpin.length != 4) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Oops',
                textBody: 'Fill 4 digit MPIN',
            });
            return

        }
        setLoading(true)
        let token = base64Encode(merchantSessionData?.clientDetails?.id) + '.' + base64Encode(encryptAES256(base64Encode(JSON.stringify(

            {
                mpin: mpin,
                clientId: merchantSessionData?.clientDetails?.id
            },

        )),
            merchantSessionData?.clientDetails?.secret
        ))
        let payload = {
            token: token
        }

        const set_mpin_api = await fetch(`${BASE_URL}/app/setMerchantMpin`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        const set_mpin_res = await set_mpin_api.json()

        if (set_mpin_res?.msg == "Success") {
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Updated Successfully',
                textBody: 'MPIN Updated Successfully',
            });
            setLoading(false)
            navigation.navigate('mpin')



        }
        else {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Failed',
                textBody: set_mpin_res?.obj,
            });

        }
        setLoading(false)

    }
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
        let user_creds = await AsyncStorage.getItem('user_creds');

        user_creds = JSON.parse(user_creds)
        let payload = {
            name: "",
            email: user_creds?.email,
            mobile_no: user_creds?.mobile,
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

        if (validate_otp_api_response?.value == "Valid") {
            [mPin1, mPin2, mPin3, mPin4].map((value, index) => {
                value.current.setValue('')
            })
            mPin1.current.focus()
            setScreenType("set_mpin")

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
        let user_creds = await AsyncStorage.getItem('user_creds');

        user_creds = JSON.parse(user_creds)

        let payload = {
            name: "",
            email: user_creds?.email,
            mobile_no: user_creds?.mobile,
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
            [mPin1, mPin2, mPin3, mPin4, mPin5, mPin6].map((value, index) => {
                value.current.setValue('')
            })
            mPin1.current.focus()
            setSeconds(120)
            setRetryOtp(!retryOtp)
        }



    }

    useEffect(() => {
        if (seconds === 0) return;

        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds]);

    useFocusEffect(
        useCallback(() => {
            if (screenType == "otp") {


                handleResendOtp()
                const subscription = AppState.addEventListener('change', nextAppState => {
                    setAppState(nextAppState);
                });

                // Start the timer when the component mounts
                const intervalId = BackgroundTimer.setInterval(() => {
                    setSeconds(prev => {
                        if (prev <= 1) {
                            BackgroundTimer.clearInterval(intervalId);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000); // 1-second interval

                return () => {
                    BackgroundTimer.clearInterval(intervalId); // Cleanup on unmount
                    subscription.remove();
                };
            }

        }, [screenType])
    )

    return (
        <SafeAreaView style={style.profilePage}>

            <View style={[globalStyle.backgroundWhite]}>
                <View style={style.homeContainer}>
                    <View style={style.headerBg}>
                        <DateHeader isBackHeader={true} navHeading={'Reset Mpin'} customStyle={{ marginLeft: hp('5%') }} navigation={navigation} isDate={false} />

                    </View>

                </View>
                <View style={style.formContainer}>
                    <Text style={globalStyle.boldTextBlack}>{screenType == 'otp' ? 'Enter OTP' : screenType == 'curr_mpin' ? 'Enter Current MPIN' : 'Set New MPIN'}</Text>
                    <View style={style.MpinContainer}>
                        <TextField
                            ref={mPin1}
                            cutomStyle={screenType == "otp" ? style.textField : style.mpinText}
                            placeHolder={''}
                            onChange={(text) => handleChange(text, mPin1, mPin2, 'forward')}
                            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, null, mPin1, 'backward')}
                            keyboardType="numeric"
                            maxLength={1}
                            isPassword={screenType == "otp" ? false : true}
                        />

                        <TextField
                            ref={mPin2}
                            cutomStyle={screenType == "otp" ? style.textField : style.mpinText}
                            placeHolder={''}
                            onChange={(text) => handleChange(text, mPin2, mPin3, 'forward')}
                            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, mPin1, mPin2, 'backward')}
                            keyboardType="numeric"
                            maxLength={1}
                            isPassword={screenType == "otp" ? false : true}
                        />
                        <TextField
                            ref={mPin3}
                            cutomStyle={screenType == "otp" ? style.textField : style.mpinText}
                            placeHolder={''}
                            onChange={(text) => handleChange(text, mPin3, mPin4, 'forward')}
                            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, mPin2, mPin3, 'backward')}
                            keyboardType="numeric"
                            maxLength={1}
                            isPassword={screenType == "otp" ? false : true}
                        />
                        <TextField
                            ref={mPin4}
                            cutomStyle={screenType == "otp" ? style.textField : style.mpinText}
                            placeHolder={''}
                            onChange={(text) => handleChange(text, mPin4, screenType == "otp" ? mPin5 : null, 'forward')}
                            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, mPin3, screenType == "otp" ? mPin4 : null, 'backward')}
                            keyboardType="numeric"
                            maxLength={1}
                            isPassword={screenType == "otp" ? false : true}
                        />
                        {screenType == "otp" && (
                            <View style={style.MpinContainer}>
                                <TextField
                                    ref={mPin5}
                                    cutomStyle={style.textField}
                                    placeHolder={''}
                                    onChange={(text) => handleChange(text, mPin5, mPin6, 'forward')}
                                    onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, mPin4, mPin5, 'backward')}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    isPassword={screenType == "otp" ? false : true}
                                />
                                <TextField
                                    ref={mPin6}
                                    cutomStyle={style.textField}
                                    placeHolder={''}
                                    onChange={(text) => handleChange(text, mPin6, null, 'forward')}
                                    onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, mPin5, mPin6, 'backward')}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    isPassword={screenType == "otp" ? false : true}
                                />

                            </View>

                        )

                        }

                    </View>

                    {screenType == "otp" && (
                        <View style={style.resendOtp}>
                            {seconds > 0 && screenType == "otp" ? (
                                <Text style={globalStyle.blackSubText}>OTP expires in  {seconds} s</Text>
                            ) : (
                                <TouchableOpacity onPress={handleResendOtp}>
                                    <Text style={globalStyle.blueMediumText}>Resend Otp</Text>
                                </TouchableOpacity>

                            )


                            }

                        </View>

                    )

                    }

                    {screenType == "set_mpin" && (
                        <View>
                            <Text style={globalStyle.boldTextBlack}>{'Confirm New MPIN'}</Text>
                            <View style={style.MpinContainer}>
                                <TextField
                                    ref={mPin2_1}
                                    cutomStyle={screenType == "otp" ? style.textField : style.mpinText}
                                    placeHolder={''}
                                    onChange={(text) => handleChange(text, mPin2_1, mPin2_2, 'forward')}
                                    onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, null, mPin2_1, 'backward')}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    isPassword={screenType == "otp" ? false : true}
                                />

                                <TextField
                                    ref={mPin2_2}
                                    cutomStyle={screenType == "otp" ? style.textField : style.mpinText}
                                    placeHolder={''}
                                    onChange={(text) => handleChange(text, mPin2_2, mPin2_3, 'forward')}
                                    onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, mPin2_1, mPin2_2, 'backward')}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    isPassword={screenType == "otp" ? false : true}
                                />
                                <TextField
                                    ref={mPin2_3}
                                    cutomStyle={screenType == "otp" ? style.textField : style.mpinText}
                                    placeHolder={''}
                                    onChange={(text) => handleChange(text, mPin2_3, mPin2_4, 'forward')}
                                    onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, mPin2_2, mPin2_3, 'backward')}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    isPassword={screenType == "otp" ? false : true}
                                />
                                <TextField
                                    ref={mPin2_4}
                                    cutomStyle={screenType == "otp" ? style.textField : style.mpinText}
                                    placeHolder={''}
                                    onChange={(text) => handleChange(text, mPin2_4, null, 'forward')}
                                    onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, mPin2_3, mPin2_4, 'backward')}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    isPassword={screenType == "otp" ? false : true}
                                />
                            </View>



                        </View>
                    )

                    }

                    <View style={style.buttonMainContainer}>


                        <Button
                            customeStyleButton={screenType=="curr_mpin"?style.disabledOutLinedButton:style.outLinedButton}
                            customeStyleText={style.textFilled}
                            onClick={screenType == "otp" ? () => { setScreenType("curr_mpin") } : () => { setScreenType("otp") }}
                            disabled={screenType=="curr_mpin"?true:false}

                        >
                            <Text style={{ color: screenType=="curr_mpin"?'#A0C7ED':"#1286ED" }}>
                                {'Prev'}
                            </Text>
                        </Button>

                        <Button
                            customeStyleButton={style.buttonFilled}
                            customeStyleText={style.textFilled}
                            onClick={screenType == "otp" ? handleOtp : screenType == "curr_mpin" ? validateMpin : setMpin}
                            disabled={loading ? true : false}
                        >
                            {loading ? <DotsLoader /> : screenType == "set_mpin" ? 'Set MPIN' : 'Next'}
                        </Button>

                    </View>



                </View>

            </View>
            <Footer active='profile' navigation={navigation} />

        </SafeAreaView>
    );
};

export default ResetMpin;