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
        fontSize: wp('5.5%'), // Responsive font size
        fontStyle: 'normal',
        fontFamily: 'IBMPlexSans-Bold',
        color: "#000000",
    },
    blueMediumText: {
        color: "#1286ED",
        fontSize: wp('5.2%'), // Responsive font size
        fontFamily: 'IBMPlexSans-SemiBold',
    },
    boldTextBlack: {
        color: "#323232",
        fontSize: wp('5.5%'), // Responsive font size
        fontStyle: 'normal',
        fontFamily: 'IBMPlexSans-Bold',
    },
    headingText: {
        fontSize: wp('7%'), // Responsive font size for headings
        fontStyle: 'normal',
        fontFamily: 'IBMPlexSans-Bold',
        marginTop: hp('1%'), // Responsive margin
        color: "#FFFFFF",
    },
    blackSubText: {
        fontSize: wp('5%'), // Responsive font size for subtext
        fontStyle: 'normal',
        fontFamily: 'IBMPlexSans-Light',
        color: "#323232",
    },
    mediumText: {
        color: "#323232",
        fontSize: wp('5%'), // Responsive font size
        fontFamily: 'IBMPlexSans-Medium',
    },
    normalText: {
        color: "#1D3039",
        fontSize: wp('4%'), // Responsive font size for smaller text
        fontFamily: 'IBMPlexSans-Light',
        fontWeight: 'bold',
    },
    blueCircleBorder: {
        backgroundColor: "#D9EDFF",
        width: wp('10%'), // Set width
        height: wp('10%'), // Make height equal to width
        borderRadius: wp('5%'), // Half of width/height for a perfect circle
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        padding: wp('0.5%'), // Optional: Padding inside the circle
    },
    
});
