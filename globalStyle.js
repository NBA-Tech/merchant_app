import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const globalStyle = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#073761",
    },
    backgroundWhite: {
        flex: 1,
        backgroundColor: "#F8F9FA",
    },
    boldText: {
        fontSize: wp('4.5%'), // Responsive font size
        fontStyle: 'normal',
        fontFamily: 'IBMPlexSans-Bold',
        marginTop: hp('1%'), // Responsive margin
        color: "#FFFFFF",
    },
    boldBlackText: {
        fontSize: wp('4.5%'), // Responsive font size
        fontStyle: 'normal',
        fontFamily: 'IBMPlexSans-Bold',
        color: "#000000",
    },
    blueMediumText: {
        color: "#1286ED",
        fontSize: wp('4.2%'), // Responsive font size
        fontFamily: 'IBMPlexSans-SemiBold',
    },
    boldTextBlack: {
        color: "#323232",
        fontSize: wp('4.5%'), // Responsive font size
        fontStyle: 'normal',
        fontFamily: 'IBMPlexSans-Bold',
        marginTop: hp('0.5%'), // Responsive margin
    },
    headingText: {
        fontSize: wp('6%'), // Responsive font size for headings
        fontStyle: 'normal',
        fontFamily: 'IBMPlexSans-Bold',
        marginTop: hp('1%'), // Responsive margin
        color: "#FFFFFF",
    },
    blackSubText: {
        fontSize: wp('4%'), // Responsive font size for subtext
        fontStyle: 'normal',
        fontFamily: 'IBMPlexSans-Light',
        color: "#323232",
    },
    mediumText: {
        color: "#323232",
        fontSize: wp('4%'), // Responsive font size
        fontFamily: 'IBMPlexSans-Medium',
    },
    normalText: {
        color: "#1D3039",
        fontSize: wp('3%'), // Responsive font size for smaller text
        fontFamily: 'IBMPlexSans-Light',
        fontWeight: 'bold',
    },
    blueCircleBorder: {
        backgroundColor: "#D9EDFF",
        borderRadius: wp('10%'), // Responsive border radius
    },
});
