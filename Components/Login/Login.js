import React, { useContext,useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { StyleContext } from '../../GlobalStyleProvider';
import { TopHeaderBackground,LoginFooter } from '../../SvgIcons';
import { TextField } from '../../Core_ui/TextField';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CheckBox from '@react-native-community/checkbox';
import Button from '../../Core_ui/Button';

const style = StyleSheet.create({
    loginContainer: {
        flexDirection: 'column'
    },
    topHeaderContainer: {

    },
    bannerContainer: {
        justifyContent: 'center',    // Vertically center the image
        alignItems: 'center',        // Horizontally center the image
        marginTop: hp('-10%')

    },
    formContainer: {
        flexDirection: 'column',
        marginHorizontal: wp('4%'),
        marginVertical: hp('5%')
    },
    textField: {
        backgroundColor: "#F2FAFD",


    },
    checkboxContainer:{
        marginHorizontal: wp('1%'),
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    button:{
        backgroundColor:"#1385EC",
        marginVertical:hp('1%')
    }

})


function Login(props) {
    const globalStyle = useContext(StyleContext);
    const [isChecked, setIsChecked] = useState(false);


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={globalStyle.background}>
                <View style={style.loginContainer}>
                    <View style={style.topHeaderContainer}>
                        <TopHeaderBackground />

                    </View>
                    <View style={style.bannerContainer}>
                        <Image source={require('../../assets/images/loginBanner.png')} />

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
                            <Text style={globalStyle.normalText}>
                            I accept terms Conditions and Private policy of GVP InfoTech
                            </Text>

                        </View>
                        <Button
                        customeStyleButton={style.button}
                        buttonText={'Login'}
                        />
                    <LoginFooter/>


                    </View>

                </View>
            </View>
        </ScrollView>

    );
}

export default Login;