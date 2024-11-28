import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { StyleContext } from '../../GlobalStyleProvider';
import DateHeader from '../../Core_ui/DateHeader';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Card from '../../Core_ui/Card';
import { FailedCrossIcon, GreenTick, ShareIcon, UpiIcon } from '../../SvgIcons';
import Footer from '../Footer';
import Button from '../../Core_ui/Button';
import { BASE_URL } from '../../Config';
import { base64Encode, encryptAES256 } from '../../Encryption';
import { IconButton } from 'react-native-paper';
import { getMerchantSession } from '../../HelperFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormatDate } from '../../HelperFunctions';
import CardLoader from '../../Core_ui/CardLoader';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

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
        flexWrap: 'wrap',
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
    const { txnId, paymentMethod, clientId, timeStamp } = props?.route?.params
    const globalStyle = useContext(StyleContext);
    const [loading, setLoading] = useState(true)
    const [transDetails, setTransDetails] = useState()
    const [merchantSessionData, setMerchentSessionData] = useState(false)
    const [merchantData, setMerchantData] = useState()


    useEffect(() => {
        (async () => {
            setMerchentSessionData(await getMerchantSession())

        })()

    }, [])

    useEffect(() => {
        (async () => {
            let merchant_session = await AsyncStorage.getItem('merchant_status_data')
            merchant_session = JSON.parse(merchant_session)

            let payload = {
                merchantId: merchant_session?.id,
                status: "ACTIVE"
            }

            const get_merchant_api = await fetch(`${BASE_URL}/app/merchant/getMerchantData`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            const get_merchant_res = await get_merchant_api.json()
            if (get_merchant_res?.msg == "SUCCESS") {
                setMerchantData(get_merchant_res?.obj)

            }

        })()

    }, [merchantSessionData])


    useFocusEffect(
        useCallback(() => {
        (async () => {
            if (!merchantSessionData) {
                return
            }

            let x_token = base64Encode(merchantSessionData?.clientDetails?.id) + '.' + base64Encode(encryptAES256(base64Encode(JSON.stringify(

                {
                    orderId: txnId,
                    clientId: clientId,
                    paymentMethod: paymentMethod
                },

            )),
                merchantSessionData?.clientDetails?.secret
            ))
            let payload = {
                orderId: txnId,
                clientId: clientId,
                paymentMethod: paymentMethod

            }
            
            const get_trans_details = await fetch(`${BASE_URL}/app/txn/getTransactionDetails`, {
                method: 'POST',
                headers: {
                    'x-token': x_token,
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            const get_trans_details_res = await get_trans_details.json()
            if (get_trans_details_res?.msg == "SUCCESS") {
                setTransDetails(get_trans_details_res?.obj?.[0])

            }
            setLoading(false)

        })()

    },[merchantSessionData]))
    return (
        <View style={style.reportPage}>
            <View style={{ flexGrow: 1 }}>

                <View style={[globalStyle.background, { flex: 1 }]}>
                    <View style={style.homeContainer}>

                        <View style={{ margin: hp('2%') }}>
                            <DateHeader isBackHeader={true} navHeading={'Transaction Details'} isDate={false} navigation={navigation} />

                            <View>

                                {loading ? (
                                    <CardLoader />
                                ) : (
                                    <Card customStyle={style.topCard}>
                                        <View style={style.leftContainer}>
                                            <Text style={[globalStyle.mediumText]}>
                                                {merchantData?.bName}
                                            </Text>

                                            <Text style={[globalStyle.blackSubText]}>
                                                {merchantData?.name}
                                            </Text>

                                            <Text style={[globalStyle.blackSubText]}>
                                                {merchantData?.email}
                                            </Text>

                                        </View>
                                        <View style={style.rightContainer}>
                                            {transDetails?.status=="SUCCESS"?(
                                            <GreenTick width={wp('10%')}/>

                                            ):(
                                                <FailedCrossIcon  width={wp('10%')}/>
                                            )

                                            }

                                        </View>
                                    </Card>



                                )

                                }



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
                                        <Text style={[globalStyle.headingText, { color: '#1A4163'  }]}>Transactions worth </Text>
                                        <Text style={[globalStyle.headingText, { color: '#1A4163'}]}>₹  {transDetails?.amount}</Text>
                                        <Text style={[globalStyle.headingText, { color: '#1A4163', fontSize: wp('4.5%') }]}>{new Date(timeStamp).toISOString().split('.')[0]}</Text>
                                    </View>

                                    <View style={style.iconContainer}>
                                        <UpiIcon width={wp('10%')} height={hp('10%')} />
                                    </View>

                                </View>
                            )}
                        </Card>

                        <Card customStyle={style.infoCard}>
                            <View style={style.row}>
                                {loading ? (
                                    [1, 2, 3,4,5].map((value, index) => (
                                        <CardLoader noOfImage={0} noOfText={2} key={index}/>
                                    ))
                                ) : (
                                    <View>
                                        {transDetails?.id && (
                                            <>
                                                <Text style={[[globalStyle.boldText, { color: "#424242",fontSize: wp('4.5%') }]]}>Transaction Id </Text>
                                                <Text style={[globalStyle.blueMediumText]}>{transDetails?.id} </Text>
                                            </>
                                        )}

                                        {transDetails?.transactedFrom && (
                                            <>
                                                <Text style={[[globalStyle.boldText, { color: "#424242",fontSize: wp('4.5%') }]]}>Transaction From </Text>
                                                <Text style={[globalStyle.blueMediumText]}>{transDetails?.transactedFrom} </Text>
                                            </>
                                        )}

                                        {transDetails?.utr_NO && (
                                            <>
                                                <Text style={[[globalStyle.boldText, { color: "#424242",fontSize: wp('4.5%') }]]}>UTR </Text>
                                                <Text style={[globalStyle.blueMediumText]}>{transDetails?.utr_NO} </Text>
                                            </>
                                        )}

                                        {transDetails?.rrn && (
                                            <>
                                                <Text style={[[globalStyle.boldText, { color: "#424242",fontSize: wp('4.5%') }]]}>RRN </Text>
                                                <Text style={[globalStyle.blueMediumText]}>{transDetails?.rrn} </Text>
                                            </>
                                        )}

                                        {transDetails?.status && (
                                            <>
                                                <Text style={[[globalStyle.boldText, { color: "#424242",fontSize: wp('4.5%') }]]}>Status</Text>
                                                <Text style={[globalStyle.blueMediumText]}>{transDetails?.status} </Text>
                                            </>
                                        )}
                                    </View>

                                )

                                }

                            </View>


                        </Card>
                        <View style={style.buttonContainer}>
                            <View
                                style={style.buttonStyle}
                            >
                                <ShareIcon fill={'#ffffff'} size={wp('6%')}/>
                                <Text style={[[globalStyle.boldText, { color: "#ffffff", paddingBottom: 10,fontSize: wp('4.5%') }]]}>Share Transaction Report</Text>

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