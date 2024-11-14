import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { StyleContext } from '../../GlobalStyleProvider';
import DateHeader from '../../Core_ui/DateHeader';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Card from '../../Core_ui/Card';
import { GreenTick, ShareIcon, UpiIcon } from '../../SvgIcons';
import Footer from '../Footer';
import Button from '../../Core_ui/Button';
import { BASE_URL } from '../../Config';
import { base64Encode, encryptAES256 } from '../../Encryption';
import { IconButton } from 'react-native-paper';
import { getMerchantSession } from '../../HelperFunctions';

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
        alignItems: 'center', 
        justifyContent: 'center',
    },
    buttonStyle: {
        flexDirection: 'row', 
        alignItems: 'center',
        backgroundColor: '#1286ED', // Set your button background color
        paddingHorizontal: 12,
        borderRadius: 20,
        width: 'auto', 
        height: 'auto', 
    },
})
const TransactionReceipt = (props) => {
    const { navigation } = props
    const {txnId,paymentMethod,clientId,timeStamp}=props?.route?.params
    console.log(txnId,paymentMethod,clientId,timeStamp)
    const globalStyle = useContext(StyleContext);
    const [loading, setLoading] = useState(false)
    const [transDetails,setTransDetails]=useState()
    const [merchantSessionData, setMerchentSessionData] = useState()


    useEffect(() => {
        (async () => {
            setMerchentSessionData(await getMerchantSession())

        })()

    }, [])


    useEffect(()=>{
        (async()=>{
            let x_token=base64Encode(merchantSessionData?.clientDetails?.id)+'.'+base64Encode(encryptAES256(base64Encode(JSON.stringify(

                {
                    txnId:txnId,
                    clientId:clientId,
                    paymentMethod:paymentMethod
                },
                
            )),
            merchantSessionData?.clientDetails?.secret
        ))
            let payload={
                txnId:txnId,
                clientId:clientId,
                paymentMethod:paymentMethod

            }
            console.log("payload",payload)
            console.log('x_token',x_token)
            const get_trans_details=await fetch(`${BASE_URL}/app/txn/getTransactionDetails`,{
                method:'POST',
                headers:{
                    'x-token':x_token,
                    'content-type':'application/json'
                },
                body:JSON.stringify(payload)
            })

            const get_trans_details_res=await get_trans_details.json()
            console.log("get_trans_details_res",get_trans_details_res)

        })()

    },[merchantSessionData])
    return (
        <View style={style.reportPage}>
            <View style={{ flexGrow: 1 }}>

                <View style={[globalStyle.background, { flex: 1 }]}>
                    <View style={style.homeContainer}>

                        <View style={{ margin: hp('2%') }}>
                            <DateHeader isBackHeader={true} navHeading={'Transaction Details'} isDate={false} navigation={navigation}/>

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
                            <View
                             style={style.buttonStyle}
                            >
                                <ShareIcon fill={'#ffffff'}/>
                                <Text style={[[globalStyle.boldText, { color: "#ffffff",paddingBottom:10 }]]}>Share Transaction Report</Text>
                                
                            </View>


                        </View>

                    </ScrollView>
                </View>
            </View>
            <Footer active={'transfer'} navigation={navigation} />
        </View>
    );
};

export default TransactionReceipt;