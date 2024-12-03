import React, { useContext, useEffect, useState, useRef, useCallback } from 'react';
import { StyleContext } from '../../GlobalStyleProvider';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image, SafeAreaView, Modal, AppState } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DateHeader from '../../Core_ui/DateHeader';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Card from '../../Core_ui/Card'
import { DeviceDetailsIcon, HelpIcon, LogoutIcon, ProfileUserIcon, QrIcon, RightArrow, SettingsIcon, StaffIcon } from '../../SvgIcons';
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
        justifyContent: 'center', // Center content vertically
        paddingHorizontal: wp('5%'),

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
        flex: 1,
        alignContent: 'center'
    },
    textFilled: {
        color: "#FFFFFF",
        paddingHorizontal: wp('14%')

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


})


const ResetMpin = (props) => {
    const { navigation } = props
    const globalStyle = useContext(StyleContext);
    const [loading, setLoading] = useState(false)
    const [merchantSessionData, setMerchentSessionData] = useState()
    const mPin1 = useRef(null)
    const mPin2 = useRef(null)
    const mPin3 = useRef(null)
    const mPin4 = useRef(null)
    const mPin5 = useRef(null)
    const mPin6 = useRef(null)
    const [isMpin, setISmPIN] = useState()
    const [seconds, setSeconds] = useState(0)
    const { showExitModal, setShowExitModal, handleCloseModal, handleExitApp } = useBackHandler();
    const [appState, setAppState] = useState(AppState.currentState);
    const [retryOtp, setRetryOtp] = useState(true)
    const [screenType, setScreenType] = useState("otp")

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
        console.log(payload)

        const validate_otp_api = await fetch(`${BASE_URL}/app/validateotp`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const validate_otp_api_response = await validate_otp_api.json()

        if (validate_otp_api_response?.value == "Valid") {
            setScreenType("mpin")

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
        console.log("user_creds", user_creds)

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
        console.log(send_otp_api_res)

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

        }, [])
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
                    <Text style={globalStyle.boldTextBlack}>{screenType == 'otp' ? 'Enter OTP' : 'Set MPIN'}</Text>
                    <View style={style.MpinContainer}>
                        <TextField
                            ref={mPin1}
                            cutomStyle={style.textField}
                            placeHolder={''}
                            onChange={(text) => handleChange(text, mPin1, mPin2, 'forward')}
                            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, null, mPin1, 'backward')}
                            keyboardType="numeric"
                            maxLength={1}
                            isPassword={screenType == "otp"?false:true}
                        />

                        <TextField
                            ref={mPin2}
                            cutomStyle={style.textField}
                            placeHolder={''}
                            onChange={(text) => handleChange(text, mPin2, mPin3, 'forward')}
                            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, mPin1, mPin2, 'backward')}
                            keyboardType="numeric"
                            maxLength={1}
                            isPassword={screenType == "otp"?false:true}
                        />
                        <TextField
                            ref={mPin3}
                            cutomStyle={style.textField}
                            placeHolder={''}
                            onChange={(text) => handleChange(text, mPin3, mPin4, 'forward')}
                            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, mPin2, mPin3, 'backward')}
                            keyboardType="numeric"
                            maxLength={1}
                            isPassword={screenType == "otp"?false:true}
                        />
                        <TextField
                            ref={mPin4}
                            cutomStyle={style.textField}
                            placeHolder={''}
                            onChange={(text) => handleChange(text, mPin4, screenType == "otp" ? mPin5 : null, 'forward')}
                            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, mPin3, screenType == "otp" ? mPin4 : null, 'backward')}
                            keyboardType="numeric"
                            maxLength={1}
                            isPassword={screenType == "otp"?false:true}
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
                                    isPassword={screenType == "otp"?false:true}
                                />
                                <TextField
                                    ref={mPin6}
                                    cutomStyle={style.textField}
                                    placeHolder={''}
                                    onChange={(text) => handleChange(text, mPin6, null, 'forward')}
                                    onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, mPin5, mPin6, 'backward')}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    isPassword={screenType == "otp"?false:true}
                                />

                            </View>

                        )

                        }

                    </View>
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
                    <View style={style.buttonMainContainer}>


                        <Button
                            customeStyleButton={style.buttonFilled}
                            customeStyleText={style.textFilled}
                            onClick={screenType=="otp"?handleOtp:null}
                            disabled={loading ? true : false}
                        >
                            {loading ? <DotsLoader /> : screenType == 'otp' ? 'Verify OTP' : 'Set MPIN'}
                        </Button>

                    </View>



                </View>

            </View>
            <Footer active='profile' navigation={navigation} />

        </SafeAreaView>
    );
};

export default ResetMpin;