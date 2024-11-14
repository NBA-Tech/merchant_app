import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
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
        height: hp('10%')
    },
    button: {
        backgroundColor: "#1385EC",
        paddingVertical: hp('1.5%'),
        borderRadius: 8,
    },
    MpinContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: hp('5%')
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

    }

});

function Mpin(props) {
    const typeMpin = props?.route?.params?.type
    const {navigation}=props
    const globalStyle = useContext(StyleContext);
    const [loading, setLoading] = useState(false)
    const [merchantSessionData, setMerchentSessionData] = useState()
    const mPin1 = useRef(null)
    const mPin2 = useRef(null)
    const mPin3 = useRef(null)
    const mPin4 = useRef(null)

    const handleChange = (text, nextInputRef) => {
        if (text.length === 1 && nextInputRef) {
            nextInputRef.current.focus();
        }
    };

    const validateMpin=async ()=>{
        let mpin=mPin1.current.getValue()+mPin2.current.getValue()+mPin3.current.getValue()+mPin4.current.getValue()
        let token=base64Encode(merchantSessionData?.clientDetails?.id)+'.'+base64Encode(encryptAES256(base64Encode(JSON.stringify(

            {
                mpin:mpin,
                clientId:merchantSessionData?.clientDetails?.id
            },
            
        )),
        merchantSessionData?.clientDetails?.secret
    ))
        const validate_mpin_api=await fetch(`${BASE_URL}/app/validateMerchantMpin`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({
                token:token
            })
        })
        let validate_mpin_res=validate_mpin_api.headers.get('x-token')
        validate_mpin_res=decryptAES256(validate_mpin_res,merchantSessionData?.clientDetails?.secret)

        if(validate_mpin_res=="true"){
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Login Success',
                textBody: 'Welcome back!',
            });
    
            setTimeout(() => {
                navigation.navigate('main',{screen:'home'})
            }, 3000);

        }
        else{
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Failed',
                textBody: 'Check Mpin',
            });

        }


        
    }

    const setMpin=async()=>{
        let mpin=mPin1.current.getValue()+mPin2.current.getValue()+mPin3.current.getValue()+mPin4.current.getValue()
        console.log(merchantSessionData)
        let token=base64Encode(merchantSessionData?.clientDetails?.id)+'.'+base64Encode(encryptAES256(base64Encode(JSON.stringify(

            {
                mpin:mpin,
                clientId:merchantSessionData?.clientDetails?.id
            },
            
        )),
        merchantSessionData?.clientDetails?.secret
    ))
    let payload={
        token:token
    }
    console.log(payload)

    const set_mpin_api=await fetch(`${BASE_URL}/app/setMerchantMpin`,{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(payload)
    })

    const set_mpin_res=await set_mpin_api.json()
    
    if(set_mpin_res?.msg=="Success"){
        Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Login Success',
            textBody: set_mpin_res?.obj,
        });

        setTimeout(() => {
            navigation.navigate('main',{screen:'home'})
        }, 3000);

    }
    else{
        Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Failed',
            textBody: set_mpin_res?.obj,
        });
    }

    }


    useEffect(() => {
        (async () => {
            setMerchentSessionData(await getMerchantSession())
            console.log(await getMerchantSession())

        })()

    }, [])


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
                        <Text style={globalStyle.boldTextBlack}>{typeMpin == 'setMpin' ? 'Set mPin' : 'Confirm mPin'}</Text>
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

                        <View style={style.buttonMainContainer}>
                            {typeMpin != 'setMpin' && (
                                <Button
                                    customeStyleButton={style.buttonContainer}
                                    customeStyleText={style.text}
                                >
                                    Switch Account
                                </Button>
                            )

                            }


                            <Button
                                customeStyleButton={style.buttonFilled}
                                customeStyleText={style.textFilled}
                                onClick={typeMpin=='setMpin'?setMpin:validateMpin}
                            >
                                {typeMpin == 'setMpin' ? 'Set' : 'Login'}
                            </Button>

                        </View>



                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default Mpin;
