import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { StyleContext } from '../../GlobalStyleProvider';
import DateHeader from '../../Core_ui/DateHeader';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Card from '../../Core_ui/Card';
import { GreenTick, ShareIcon, UpiIcon } from '../../SvgIcons';
import Footer from '../Footer';
import Button from '../../Core_ui/Button';



const style = StyleSheet.create({
    reportPage: {
        backgroundColor: "#ffffff",
        flex: 1,
    },
    homeContainer: {
        flexDirection: 'column',
    },
    topCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 8, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 16,
        elevation: 5,
    },
    infoCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        alignSelf: 'center'

    },
    leftContainer: {
        flexDirection: 'column',
        margin: hp('2%')
    },
    rightContainer: {
        justifyContent: 'center'
    },
    homeBodyContainer: {
        backgroundColor: "#ffffff",
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    cardCustomStyleCard: {
        alignSelf: 'center',
        paddingTop: 30
    },
    bodyContainer: {
        flexDirection: 'column',
        alignContent: 'flex-start'
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconContainer: {
        alignContent: 'flex-end',
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'column',
        alignContent: 'flex-start'
    },
    buttonContainer: {
        flex: 1
    },
    buttonStyle:{
        backgroundColor:'#1286ED',
        borderRadius:20,
        

    }
})
const TransactionReceipt = (props) => {
    const { navigation } = props
    const globalStyle = useContext(StyleContext);
    const [loading, setLoading] = useState(false)
    return (
        <View style={style.reportPage}>
            <View style={{ flexGrow: 1 }}>

                <View style={[globalStyle.background, { flex: 1 }]}>
                    <View style={style.homeContainer}>

                        <View style={{ margin: hp('2%') }}>
                            <DateHeader isBackHeader={true} navHeading={'Transaction Details'} />

                            <View>
                                <Card customStyle={style.topCard}>
                                    <View style={style.leftContainer}>
                                        <Text style={[globalStyle.mediumText]}>
                                            Merchant Name
                                        </Text>

                                        <Text style={[globalStyle.blackSubText]}>
                                            Merchant Name
                                        </Text>

                                        <Text style={[globalStyle.blackSubText]}>
                                            21 Feb, 9:30 AM
                                        </Text>

                                    </View>
                                    <View style={style.rightContainer}>
                                        <GreenTick />

                                    </View>

                                </Card>

                            </View>

                        </View>
                    </View>
                    <ScrollView style={[style.homeBodyContainer, { flexGrow: 1 }]}>

                        <Card
                            hasBackground={true}
                            backgroundImage={require('../../assets/images/credit_bg.png')}
                            customStyle={style.cardCustomStyleCard}
                        >
                            {loading ? (
                                <CardLoader />
                            ) : (
                                <View style={style.cardContainer}>
                                    <View style={style.bodyContainer}>
                                        <Text style={[globalStyle.headingText, { color: '#1A4163', fontSize: 18 }]}>Successful Transactions worth </Text>
                                        <Text style={[globalStyle.headingText, { color: '#1A4163', fontSize: 18 }]}>₹  0</Text>
                                        <Text style={[globalStyle.headingText, { color: '#1A4163', fontSize: 18 }]}>0 Transactions</Text>
                                    </View>

                                    <View style={style.iconContainer}>
                                        <UpiIcon width={32} height={32} />
                                    </View>

                                </View>
                            )}
                        </Card>

                        <Card customStyle={style.infoCard}>
                            <View style={style.row}>
                                <Text style={[[globalStyle.boldText, { color: "#424242" }]]}>Card Number </Text>

                                <Text style={[globalStyle.blueMediumText]}>XXXXXXXXXX544654 </Text>

                                <Text style={[[globalStyle.boldText, { color: "#424242" }]]}>UTR </Text>

                                <Text style={[globalStyle.blueMediumText]}>XXXXXXXXXX544654 </Text>

                                <Text style={[[globalStyle.boldText, { color: "#424242" }]]}>RRN </Text>

                                <Text style={[globalStyle.blueMediumText]}>XXXXXXXXXX544654 </Text>

                                <Text style={[[globalStyle.boldText, { color: "#424242" }]]}>Transaction ID </Text>

                                <Text style={[globalStyle.blueMediumText]}>XXXXXXXXXX544654 </Text>
                            </View>


                        </Card>
                        <View style={style.buttonContainer}>
                            <Button
                             customeStyleContainer={style.buttonStyle}
                            >
                                <ShareIcon fill={'#ffffff'}/>
                                <Text style={[[globalStyle.boldText, { color: "#ffffff",paddingBottom:20 }]]}>Share QR Code</Text>
                                
                            </Button>


                        </View>

                    </ScrollView>
                </View>
            </View>
            <Footer active={'transfer'} navigation={navigation} />
        </View>
    );
};

export default TransactionReceipt;