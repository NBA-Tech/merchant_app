import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
import { FormatDate, getMerchantSession,convertRupeesToPaise } from '../../HelperFunctions';
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
        marginHorizontal:hp('3%')
    },
})
const Payment = (props) => {
    const { navigation } = props
    const globalStyle = useContext(StyleContext);
    const { transDate, setTransDate } = useContext(DataContext)
    const [merchantSessionData, setMerchentSessionData] = useState()
    const [loading,setLoading]=useState(false)
    const orderInfoRef = useRef('');
    const currencyRef = useRef('');
    const amountRef = useRef('');
    const firstNameRef = useRef('');
    const lastNameRef = useRef('');
    const chMobileRef = useRef('');
    const chEmailRef = useRef('');
    const chAddrStreetRef = useRef('');
    const chAddrCityRef = useRef('');
    const chAddrStateRef = useRef('');
    const chAddrZipRef = useRef('');

    const handlePayment=async()=>{
        setLoading(true)
        let payload={
            orderDetails:{
                orderInfo:orderInfoRef.current.getValue(),
                currency:currencyRef.current.getValue(),
                amount:convertRupeesToPaise(amountRef.current.getValue()),

            },
            customerDetails:{
                firstName:firstNameRef.current.getValue(),
                lastName:lastNameRef.current.getValue(),
                chMobile:chMobileRef.current.getValue(),
                chEmail:chEmailRef.current.getValue(),
                chAddrStreet:chAddrStreetRef.current.getValue(),
                chAddrCity:chAddrCityRef.current.getValue(),
                chAddrState:chAddrStateRef.current.getValue(),
                chAddrZip:chAddrZipRef.current.getValue()
            }
        }

        let headers = {
            'content-type': 'application/json',
            'x-client-id': merchantSessionData?.clientDetails?.id,
            'x-client-secret': merchantSessionData?.clientDetails?.secret

        }

        const get_payent_url=await fetch(`${BASE_URL}/merchant/orderCreate`,{
            method:'POST',
            headers:headers,
            body:JSON.stringify(payload)
        })

        const payment_url_res=await get_payent_url.json()
        if(payment_url_res?.statusCode==200){
            navigation.navigate('payment_gateway',{url:payment_url_res?.obj})
        }
        setLoading(false)
    }

    useEffect(()=>{
        const getSession=async()=>{
            setMerchentSessionData(await getMerchantSession())

        }
        getSession()
        

    },[])

    return (
        <View style={style.home}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{marginBottom:hp('2%')}}>

                <View style={[globalStyle.background, { flex: 1 }]}>
                    <View style={style.paymentContainer}>
                        <DateHeader isDate={false} isBackHeader={true} navHeading={'Payment'} navigation={navigation} />

                    </View>

                    <View style={style.paymentBodyContainer}>
                        <View style={style.payment}>
                            <Text style={globalStyle.boldTextBlack}>Order Id *</Text>
                            <TextField
                                cutomStyle={style.textField}
                                placeHolder={'Eg: 123411212'}
                                ref={orderInfoRef}
                            />
                            <Text style={globalStyle.boldTextBlack}>Currency *</Text>
                            <TextField
                                cutomStyle={style.textField}
                                placeHolder={'Eg : INR'}
                                ref={currencyRef}
                            />
                            <Text style={globalStyle.boldTextBlack}>Amount *</Text>
                            <TextField
                                cutomStyle={style.textField}
                                placeHolder={'Eg: 90'}
                                ref={amountRef}
                            />
                            <Text style={globalStyle.boldTextBlack}>First Name</Text>
                            <TextField
                                cutomStyle={style.textField}
                                placeHolder={'eg : Ajay'}
                                ref={firstNameRef}
                            />
                            <Text style={globalStyle.boldTextBlack}>Last Name</Text>
                            <TextField
                                cutomStyle={style.textField}
                                placeHolder={'Eg: Hardika'}
                                ref={lastNameRef}
                            />
                            <Text style={globalStyle.boldTextBlack}>Mobile Number</Text>
                            <TextField
                                cutomStyle={style.textField}
                                placeHolder={'Eg: 934412312312'}
                                ref={chMobileRef}
                                keyboardType="numeric"
                            />
                            <Text style={globalStyle.boldTextBlack}>Email</Text>
                            <TextField
                                cutomStyle={style.textField}
                                placeHolder={'John@gmail.com'}
                                ref={chEmailRef}
                            />
                            <Text style={globalStyle.boldTextBlack}>State</Text>
                            <TextField
                                cutomStyle={style.textField}
                                placeHolder={'Eg: IL'}
                                ref={chAddrStateRef}
                            />
                            <Text style={globalStyle.boldTextBlack}>City</Text>
                            <TextField
                                cutomStyle={style.textField}
                                placeHolder={'Eg: SA'}
                                ref={chAddrCityRef}
                            />
                            <Text style={globalStyle.boldTextBlack}>Street</Text>
                            <TextField
                                cutomStyle={style.textField}
                                placeHolder={'EG: NO:3 IL'}
                                ref={chAddrStreetRef}
                            />
                            <Text style={globalStyle.boldTextBlack}>ZipCode</Text>
                            <TextField
                                cutomStyle={style.textField}
                                placeHolder={'Eg:6411'}
                                ref={chAddrZipRef}
                            />

                        </View>
                        <Button
                            customeStyleButton={style.button}
                            onClick={handlePayment}
                        >
                            {loading ? <DotsLoader /> : 'Pay Now'}
                            
                        </Button>

                    </View>
                </View>

            </ScrollView>
            <Footer active="payment" navigation={navigation} />

        </View>
    );
};

export default Payment;