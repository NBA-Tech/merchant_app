import React, { useContext, useState } from 'react';
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

});

function Login(props) {
    const globalStyle = useContext(StyleContext);
    const [isChecked, setIsChecked] = useState(false);
    const [loading,setLoading]=useState(false)
    const [email,setEmail]=useState()
    const [mobile,setMobile]=useState()
    const [pasword,setPassword]=useState()

    const handleLogin=async()=>{
        console.log("click",email,pasword,mobile)
        let base64_email=base64Encode(email)
        let client_token=base64Encode(""+email+""+email)

        let token=base64_email+'.'+base64Encode(mobile+"."+encryptAES256(pasword,client_token))
        let payload={
            token:token,
            email:base64_email
        }
        
        const check_login_api=await fetch(`${BASE_URL}/app/login`,{
            method:'POST',
            headers:{
                'x-client-token':client_token,
                'content-type':'application/json'
            },
            body:JSON.stringify(payload)
        })

        const is_login=await check_login_api.json()
        console.log(is_login) 

    }

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
                            onChange={setMobile}
                        />

                        <Text style={globalStyle.boldText}>Email</Text>
                        <TextField
                            cutomStyle={style.textField}
                            placeHolder={'Email'}
                            onChange={setEmail}
                        />

                        <Text style={globalStyle.boldText}>Password</Text>
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
                            onClick={!loading?handleLogin:null}
                        >   
                            {loading?<DotsLoader/>:'Login'}
                            </Button>
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
