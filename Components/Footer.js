import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StyleContext } from '../GlobalStyleProvider';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { HouseIcon, ArrowIcon, QrIcon, BankIcon, UserIcon } from '../SvgIcons';

const style = StyleSheet.create({
    footerContainer: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: '#F7F7F7', // Slightly less white
        borderWidth: 1, // Add border width
        borderColor: '#D4D7E3', // Black border color
        shadowColor: 'rgba(0, 0, 0, 0.25)', // Semi-transparent black for shadow
        shadowOffset: {
            width: 0,
            height: 2, // Vertical offset
        },
        shadowOpacity: 1, // Shadow opacity
        shadowRadius: 4, // Blur radius
        elevation: 4, // For Android shadow
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    footerElements: {
        margin: hp('1%'),
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'

    },

})


const Footer = (props) => {
    const { active, navigation } = props
    const globalStyle = useContext(StyleContext);
    return (
        <View style={style.footerContainer}>
            <TouchableOpacity style={style.footerElements} onPress={() => { navigation.navigate('home') }}>
                <View style={active == "home" ? globalStyle.blueCircleBorder : ''}>
                    <HouseIcon fill={active == "home" ? '#1286ED' : '#1C1B1F'} />

                </View>
                <Text style={[globalStyle.normalText, { textAlign: 'flex-start' }]}>Home</Text>


            </TouchableOpacity>

            <TouchableOpacity style={style.footerElements} onPress={() => { navigation.navigate('reports') }}>

                <View style={active == "transfer" ? globalStyle.blueCircleBorder : ''}>
                    <ArrowIcon fill={active == "transfer" ? '#1286ED' : '#1C1B1F'} />

                </View>
                <Text style={[globalStyle.normalText, { textAlign: 'flex-start' }]}>Transfers</Text>



            </TouchableOpacity>

            <View style={style.footerElements}>
                <View style={active == "payment" ? globalStyle.blueCircleBorder : ''}>
                    <QrIcon fill={active == "payment" ? '#1286ED' : '#1C1B1F'} />

                </View>
                <Text style={[globalStyle.normalText, { textAlign: 'flex-start' }]}>Payments</Text>


            </View>

            <View style={style.footerElements}>
                <View style={active == "payOff" ? globalStyle.blueCircleBorder : ''}>
                    <BankIcon fill={active == "payOff" ? '#1286ED' : '#1C1B1F'} />

                </View>
                <Text style={[globalStyle.normalText, { textAlign: 'flex-start' }]}>Pay Off</Text>


            </View>

            <TouchableOpacity style={style.footerElements} onPress={() => { navigation.navigate('profile') }}>

                <View style={active == "profile" ? globalStyle.blueCircleBorder : ''}>
                    <UserIcon fill={active == "profile" ? '#1286ED' : '#1C1B1F'} />
                </View>

                <Text style={[globalStyle.normalText, { textAlign: 'flex-start' }]}>Profile</Text>

            </TouchableOpacity>


        </View>

    );
};

export default Footer;