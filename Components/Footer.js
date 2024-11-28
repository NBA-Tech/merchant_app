import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StyleContext } from '../GlobalStyleProvider';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { HouseIcon, ArrowIcon, QrIcon, BankIcon, UserIcon } from '../SvgIcons';

const style = StyleSheet.create({
    footerContainer: {
        borderTopLeftRadius: wp('4%'),
        borderTopRightRadius: wp('4%'),
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: '#F7F7F7', // Slightly less white
        borderWidth: 1, // Add border width
        borderColor: '#D4D7E3', // Black border color
        shadowColor: 'rgba(0, 0, 0, 0.25)', // Semi-transparent black for shadow
        shadowOffset: { width: 0, height: hp('0.5%') },
        shadowOpacity: 1, // Shadow opacity
        shadowRadius: wp('1%'),
        elevation: 4, // For Android shadow
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('3%'),
    
    },
    footerElements: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp('1%'),

    },
 

})


const Footer = (props) => {
    const { active, navigation } = props
    const globalStyle = useContext(StyleContext);
    return (
        <View style={style.footerContainer}>
            <TouchableOpacity style={style.footerElements} onPress={() => { navigation.navigate('home') }}>
                <View style={active == "home" ? globalStyle.blueCircleBorder : ''}>
                    <HouseIcon fill={active == "home" ? '#1286ED' : '#1C1B1F'} width={wp('6%')} height={hp('4%')}/>

                </View>
                <Text style={[globalStyle.mediumText, { textAlign: 'center',fontSize:wp('3.5%') }]}>Home</Text>


            </TouchableOpacity>

            <TouchableOpacity style={style.footerElements} onPress={() => { navigation.navigate('reportsTab') }}>

                <View style={active == "transfer" ? globalStyle.blueCircleBorder : ''}>
                    <ArrowIcon fill={active == "transfer" ? '#1286ED' : '#1C1B1F'} width={wp('6%')} height={hp('4%')}/>

                </View>
                <Text style={[globalStyle.mediumText, { textAlign: 'center',fontSize:wp('3.5%') }]}>Transactions</Text>



            </TouchableOpacity>

            <TouchableOpacity style={style.footerElements} onPress={() => { navigation.navigate('payment') }}>
                <View style={active == "payment" ? globalStyle.blueCircleBorder : ''}>
                    <QrIcon fill={active == "payment" ? '#1286ED' : '#1C1B1F'} width={wp('6%')} height={hp('4%')}/>

                </View>
                <Text style={[globalStyle.mediumText, { textAlign: 'center',fontSize:wp('3.5%') }]}>Payments</Text>


            </TouchableOpacity>

            <TouchableOpacity style={style.footerElements} onPress={() => { navigation.navigate('settlement_report') }}>
                <View style={active == "settlement_report" ? globalStyle.blueCircleBorder : ''}>
                    <BankIcon fill={active == "settlement_report" ? '#1286ED' : '#1C1B1F'} width={wp('6%')} height={hp('4%')}/>

                </View>
                <Text style={[globalStyle.mediumText, { textAlign: 'center',fontSize:wp('3.5%') }]}>Settlements</Text>


                </TouchableOpacity>

            <TouchableOpacity style={style.footerElements} onPress={() => { navigation.navigate('profile') }}>

                <View style={active == "profile" ? globalStyle.blueCircleBorder : ''}>
                    <UserIcon fill={active == "profile" ? '#1286ED' : '#1C1B1F'} width={wp('6%')} height={hp('4%')}/>
                </View>

                <Text style={[globalStyle.mediumText, { textAlign: 'center',fontSize:wp('3.5%') }]}>Profile</Text>

            </TouchableOpacity>


        </View>

    );
};

export default Footer;