import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StyleContext } from '../../GlobalStyleProvider';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { RightArrow } from '../../SvgIcons';
import Card from '../../Core_ui/Card';
import { StatIcon, BankIcon, DownloadIcon } from '../../SvgIcons';
import CardLoader from '../../Core_ui/CardLoader';
import Button from '../../Core_ui/Button';
import DateHeader from '../../Core_ui/DateHeader';
import { ScrollView } from 'react-native-gesture-handler';
import Footer from '../Footer';
import { BASE_URL } from '../../Config';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { DataContext } from '../../DataContext';
import { FormatDate, getMerchantSession, convertRupeesToPaise } from '../../HelperFunctions';
import { TextField } from '../../Core_ui/TextField';
import DotsLoader from '../../DotsLoader';
const style = StyleSheet.create({
    paymentContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    paymentBodyContainer: {
        backgroundColor: "#ffffff",
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: hp('5%')
    },
    payment: {
        margin: hp('3%')
    },
    textField: {
        backgroundColor: "#F2FAFD",
        borderRadius: 8,
        padding: wp('2%'),
        marginBottom: hp('2%'),
    },
    home: {
        backgroundColor: "#ffffff",
        flex: 1,
    },
    button: {
        backgroundColor: "#1385EC",
        paddingVertical: hp('1.5%'),
        borderRadius: 8,
        marginHorizontal: hp('3%')
    },
    cardCustomStyle: {
        flex: 1,
        alignSelf: 'center',
        padding: hp('2%'),
        alignItems: 'center'
    },

})
const Payment = (props) => {
    const { navigation } = props
    const globalStyle = useContext(StyleContext);
    const { transDate, setTransDate } = useContext(DataContext)
    const [merchantSessionData, setMerchentSessionData] = useState()
    const [loading, setLoading] = useState(false)
    const [isQr, setIsQr] = useState(false)
    const [qr, setQr] = useState('')
    const [currOrderId,setCurrOrderId]=useState(undefined)
    const [intervalId, setIntervalId] = useState(null)

    const amountRef = useRef('');



    const handlePayment = async () => {
        setLoading(true)
        setIsQr(false)
        let amount = amountRef.current.getValue()
        if (amount == 0) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'OOPS !',
                textBody: 'Amount should be greater than 0',
            });
            return
        }
        let headers = {
            'content-type': 'application/json',
            'x-client-id': merchantSessionData?.clientDetails?.id,
            'x-client-secret': merchantSessionData?.clientDetails?.secret
        }
        let payload = {
            custRefId: "",
            custFirstName: "",
            custLastName: "",
            custGstNum: "",
            custMobileNum: "",
            qrType: "DYNAMIC",
            amount: amount,
            validTill: ""
        }
        const generate_qr_api = await fetch(`${BASE_URL}/app/txn/generateQr`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        })

        const generate_qr_api_res = await generate_qr_api.json()
        // console.log(generate_qr_api_res)
        if (generate_qr_api_res?.statusCode == 200) {
            setQr(generate_qr_api_res?.obj)
            setCurrOrderId(generate_qr_api_res?.msg)

            setIsQr(true)
        }
        setLoading(false)



    }
    const qrStatusCheckApi=async()=>{
        let headers = {
            'content-type': 'application/json',
            'x-client-id': merchantSessionData?.clientDetails?.id,
        }
        let payload={
            orderId:currOrderId
        }

        const id=setInterval(async() => {
            console.log("headers",headers)

            const check_qr_status=await fetch(`${BASE_URL}/app/txn/getQRPaymentStatus`,{
                method:'POST',
                headers:headers,
                body:JSON.stringify(payload)
            })
            const qr_res=await check_qr_status.json()
            console.log(qr_res)
            if(qr_res?.msg=="SUCCESS"){
                setIsQr(false)
                clearInterval(id)
                navigation.navigate('payment_status',{status:"SUCCESS"})
            }
            else if(qr_res?.msg=="FAILURE"){
                clearInterval(id)
                setIsQr(false)
                navigation.navigate('payment_status',{status:"FAILURE"})

            }
            // clearInterval(id)r
        }, 3000);
        setIntervalId(id)

    }

    useEffect(() => {
        const getSession = async () => {
            setMerchentSessionData(await getMerchantSession())

        }
        getSession()


    }, [])

    useEffect(()=>{
        if(isQr){
            qrStatusCheckApi()

        }
        else{
            clearInterval(intervalId)
        }

    },[isQr])

    return (
        <View style={style.home}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ marginBottom: hp('2%') }}>

                <View style={[globalStyle.background, { flex: 1 }]}>
                    <View style={style.paymentContainer}>
                        <DateHeader isDate={false} isBackHeader={true} navHeading={'Payment'} navigation={navigation} />

                    </View>

                    <View style={style.paymentBodyContainer}>
                        {!isQr && (
                            <View>
                                <View style={style.payment}>

                                    <Text style={globalStyle.boldTextBlack}>Enter Amount</Text>
                                    <TextField
                                        cutomStyle={style.textField}
                                        placeHolder={'Eg:90'}
                                        ref={amountRef}
                                        keyboardType="numeric"
                                    />

                                </View>
                                <Button
                                    customeStyleButton={style.button}
                                    onClick={handlePayment}
                                >
                                    {loading ? <DotsLoader /> : 'Generate'}

                                </Button>
                            </View>

                        )

                        }

                        {isQr && (
                            <View>
                                <View style={style.qrContainer}>

                                    <Card customStyle={style.cardCustomStyle}>
                                        <Image
                                            source={{ uri: `data:image/png;base64,${qr}` }}
                                            style={{ width: wp('80%'), height: hp('60%') }}
                                        />



                                    </Card>

                                </View>
                                <Button
                                    customeStyleButton={style.button}
                                    onClick={()=>{setIsQr(false)}}
                                >
                                    {loading ? <DotsLoader /> : 'Close'}

                                </Button>
                            </View>

                        )

                        }



                    </View>
                </View>

            </ScrollView>
            <Footer active="payment" navigation={navigation} />

        </View>
    );
};

export default Payment;