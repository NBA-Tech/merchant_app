import { StyleSheet } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

export const globalStyle=StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:"#F8F9FA"
    },
    boldText:{
        color:"#0C1421",
        fontSize:18,
        fontStyle:'normal',
        fontFamily:'NexaText-Trial-Bold',
        marginTop:heightPercentageToDP('1%')
    },
    headingText:{
        color:"#0C1421",
        fontSize:24,
        fontStyle:'normal',
        fontFamily:'NexaText-Trial-Bold',
        marginTop:heightPercentageToDP('1%')
    },


    normalText:{
        color:"#1D3039",
        fontSize:12,
        fontFamily:'NexaText-Trial-Regular'
    }


})