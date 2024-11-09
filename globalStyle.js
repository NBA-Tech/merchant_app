import { StyleSheet } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

export const globalStyle=StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:"#073761"
    },
    backgroundWhite:{
        flex:1,
        backgroundColor:"#F8F9FA"
    },
    boldText:{
        fontSize:18,
        fontStyle:'normal',
        fontFamily:'IBMPlexSans-Bold',
        marginTop:heightPercentageToDP('1%'),
        color:"#FFFFFF"
    },
    boldTextBlack:{
        color:"#323232",
        fontSize:18,
        fontStyle:'normal',
        fontFamily:'IBMPlexSans-Bold',
        marginTop:heightPercentageToDP('1%'),

    },
    headingText:{
        fontSize:24,
        fontStyle:'normal',
        fontFamily:'IBMPlexSans-Bold',
        marginTop:heightPercentageToDP('1%'),
        color:"#FFFFFF"
    },

    blackSubText:{
        fontSize:16,
        fontStyle:'normal',
        fontFamily:'IBMPlexSans-Light',
        color:"#323232",

    },


    normalText:{
        color:"#1D3039",
        fontSize:12,
        fontFamily:'IBMPlexSans-Light',
        fontWeight:'bold'
    },
    blueCircleBorder:{
        backgroundColor:"#D9EDFF",
        borderRadius:50,
        padding:5,

    }


})