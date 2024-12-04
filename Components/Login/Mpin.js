import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, BackHandler, TouchableOpacity,Modal } from 'react-native';
import { StyleContext } from '../../GlobalStyleProvider';
import { TopHeaderBackground, LoginFooter } from '../../SvgIcons';
import { TextField } from '../../Core_ui/TextField';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CheckBox from '@react-native-community/checkbox';
import Button from '../../Core_ui/Button';
import DotsLoader from '../../DotsLoader';
import { BASE_URL } from '../../Config';
import { base64Encode, base64Decode, encryptAES256, decryptAES256 } from '../../Encryption';
import { getMerchantSession } from '../../HelperFunctions';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { AuthProvider, useAuth } from '../../AuthProvider';
import { useBackHandler } from '../../BackHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { NoInterNetIcon } from '../../SvgIcons';

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
        width: 'max-content',
        height: hp('10%'),
        textAlign: 'center',
        width: wp('20%')
    },
    button: {
        backgroundColor: "#1385EC",
        paddingVertical: hp('1.5%'),
        borderRadius: 8,
    },
    MpinContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    buttonMainContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
        alignContent: 'center'
    },
    buttonContainer: {
        marginHorizontal: wp('0%'),
        marginVertical: hp('1%'),
        borderRadius: 10,           // Rounded corners
        borderWidth: 1,             // Border thickness
        borderColor: '#0F1ECD',     // Border color
    },
    button: {
        paddingHorizontal: wp('2%'),
        paddingVertical: hp('1%'),
    },
    text: {
        color: "#0F1ECD",
        paddingHorizontal: wp('8%')
    },
    buttonFilled: {
        backgroundColor: "#1385EC",
        marginHorizontal: wp('0%'),
        marginVertical: hp('1%'),
        borderRadius: 10,           // Rounded corners
        borderWidth: 1,             // Border thickness
    },
    textFilled: {
        color: "#FFFFFF",
        paddingHorizontal: wp('14%')

    },
    resendMpin: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginVertical: hp('2%')
    },
    modalView: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#000000',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#d3d3d3',
    },
    exitButton: {
        backgroundColor: '#ff5c5c',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },


});

function Mpin(props) {
    const typeMpin = props?.route?.params?.type
    const { navigation } = props
    const globalStyle = useContext(StyleContext);
    const [loading, setLoading] = useState(false)
    const [merchantSessionData, setMerchentSessionData] = useState()
    const mPin1 = useRef(null)
    const mPin2 = useRef(null)
    const mPin3 = useRef(null)
    const mPin4 = useRef(null)
    const { isAuthenticated, setIsAuthenticated } = useAuth()
    const [resetMpinModal,setResetMpinModal]=useState(false)
    const { showExitModal, setShowExitModal, handleCloseModal, handleExitApp } = useBackHandler();

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

    const validateMpin = async () => {

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
        let validate_mpin_res = validate_mpin_api.headers.get('x-token')
        validate_mpin_res = decryptAES256(validate_mpin_res, merchantSessionData?.clientDetails?.secret)

        if (validate_mpin_res == "true") {
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Login Success',
                textBody: 'Welcome back!',
            });
            setLoading(false)

            navigation.navigate('main', { screen: 'homeTab' })
            setIsAuthenticated(true)


        }
        else {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Failed',
                textBody: 'Check Mpin',
            });
            setLoading(false)

        }



    }

    const setMpin = async () => {

        let mpin = mPin1.current.getValue() + mPin2.current.getValue() + mPin3.current.getValue() + mPin4.current.getValue()
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
                title: 'Login Success',
                textBody: set_mpin_res?.obj,
            });
            setLoading(false)
            setIsAuthenticated(true)

            navigation.navigate('main', { screen: 'homeTab' })



        }
        else {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Failed',
                textBody: set_mpin_res?.obj,
            });
            setLoading(false)
        }

    }
    const handleResetMpin=()=>{
        setResetMpinModal(false)
        navigation.navigate('login', { isResendOtp: true })

    }


    useFocusEffect(
        useCallback(() => {
            const fetchMerchantSession = async () => {
                const sessionData = await getMerchantSession();
                setMerchentSessionData(sessionData);
            };
            [mPin1, mPin2, mPin3, mPin4].map((value, index) => {
                value.current.setValue('')
            })
            mPin1.current.focus()

            fetchMerchantSession();

            // Optionally, you can return a cleanup function here if needed
            return () => {
                // Cleanup code (if necessary)
            };
        }, []) // Dependency array; add dependencies if required
    );




    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={[globalStyle.backgroundWhite, { flex: 1 }]}>
                <View style={style.loginContainer}>
                    <Modal visible={resetMpinModal} transparent={true} animationType="slide">
                        <View style={style.centeredView}>
                            <View style={style.modalView}>
                                <NoInterNetIcon />
                                <Text style={style.modalText}>Are you sure you want to reset your MPIN? An OTP will be sent to your registered mobile number</Text>
                                <View style={style.buttonContainer}>
                                    <TouchableOpacity
                                        style={[style.button, style.cancelButton]}
                                        onPress={() => { setResetMpinModal(false) }}
                                    >
                                        <Text style={style.buttonText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[style.button, style.exitButton]}
                                        onPress={handleResetMpin}
                                    >
                                        <Text style={style.buttonText}>Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
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
                        <Text style={globalStyle.boldTextBlack}>{typeMpin == 'setMpin' ? 'Set MPIN' : 'Enter MPIN'}</Text>
                        <View style={style.MpinContainer}>
                            <TextField
                                ref={mPin1}
                                cutomStyle={style.textField}
                                placeHolder={''}
                                onChange={(text) => handleChange(text, mPin1, mPin2, 'forward')}
                                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, null, mPin1, 'backward')}
                                keyboardType="numeric"
                                maxLength={1}
                                isPassword={true}
                            />

                            <TextField
                                ref={mPin2}
                                cutomStyle={style.textField}
                                placeHolder={''}
                                onChange={(text) => handleChange(text, mPin2, mPin3, 'forward')}
                                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, mPin1, mPin2, 'backward')}
                                keyboardType="numeric"
                                maxLength={1}
                                isPassword={true}
                            />
                            <TextField
                                ref={mPin3}
                                cutomStyle={style.textField}
                                placeHolder={''}
                                onChange={(text) => handleChange(text, mPin3, mPin4, 'forward')}
                                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, mPin2, mPin3, 'backward')}
                                keyboardType="numeric"
                                maxLength={1}
                                isPassword={true}
                            />
                            <TextField
                                ref={mPin4}
                                cutomStyle={style.textField}
                                placeHolder={''}
                                onChange={(text) => handleChange(text, mPin4, null, 'forward')}
                                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, mPin3, mPin4, 'backward')}
                                keyboardType="numeric"
                                maxLength={1}
                                isPassword={true}
                            />

                        </View>
                        {typeMpin != 'setMpin' && (
                            <View style={style.resendMpin}>
                                <TouchableOpacity onPress={()=>{setResetMpinModal(true)}}>
                                    <Text style={globalStyle.blueMediumText}>Forgot MPIN ?</Text>
                                </TouchableOpacity>


                            </View>


                        )

                        }


                        <View style={style.buttonMainContainer}>


                            <Button
                                customeStyleButton={style.buttonFilled}
                                customeStyleText={style.textFilled}
                                onClick={typeMpin == 'setMpin' ? setMpin : validateMpin}
                                disabled={loading ? true : false}
                            >
                                {loading ? <DotsLoader /> : typeMpin == 'setMpin' ? 'Set' : 'Login'}
                            </Button>

                        </View>



                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default Mpin;
