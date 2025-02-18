import React, { useEffect, useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { StyleContext } from '../../GlobalStyleProvider';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CalendarIcon, CardIcon, RightArrow, UpiIcon } from '../../SvgIcons';
import Card from '../../Core_ui/Card';
import { StatIcon, BankIcon, DownloadIcon, FilterIcon } from '../../SvgIcons';
import CardLoader from '../../Core_ui/CardLoader';
import Button from '../../Core_ui/Button';
import DateHeader from '../../Core_ui/DateHeader';
import { ScrollView } from 'react-native-gesture-handler';
import Footer from '../Footer';
import { BASE_URL } from '../../Config';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { DataContext } from '../../DataContext';
import { FormatDate, getMerchantSession, formatDateWithAmPm } from '../../HelperFunctions';
import { Dropdown } from 'react-native-element-dropdown';
import { FAB, Provider as PaperProvider } from 'react-native-paper';
import Modal from "react-native-modal";
import { BlurView } from '@react-native-community/blur';
import { scaleFont } from '../../globalStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


const style = StyleSheet.create({
    reportPage: {
        backgroundColor: "#ffffff",
        flex: 1,
    },
    homeContainer: {
        flexDirection: 'column',
    },
    iconContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: hp('3%'),
    },
    bodyContainer: {
        flexDirection: 'column',
        marginHorizontal: wp('1%')
    },
    homeBodyContainer: {
        backgroundColor: "#ffffff",
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    filterContainer: {
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        justifyContent: 'flex-start',
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: hp('2%')
    },
    dropdown: {
        height: hp('5%'),
        borderRadius: 8,
        paddingHorizontal: 8,
        color: '#000000',
        width: '100%',
    },
    settlementContainer: {
        flexDirection: 'column',
    },
    cardData: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flex: 1
    },
    cardCustomStyle: {
        alignSelf: 'center'
    },
    cardCustomStyleCard: {
        alignSelf: 'center',
        marginTop: hp('2%'),
        paddingTop: 30,
        padding: wp('2%')
    },
    infoContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
    },
    logoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        marginRight: wp('8%')

    },
    rightContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
        alignItems: 'center'

    },
    transactionContainer: {
        marginLeft: wp('3%')

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        backgroundColor: '#1286ED',
        bottom: 0,
    },
    modalAbsolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    chipFilled: {
        backgroundColor: '#1286ED',
        justifyContent: 'center',
        borderRadius: 20,
        color: '#FFFFFF',
        paddingVertical: 10,
        justifyContent: 'center',
        paddingHorizontal: 10,
        alignItems: 'center',
        flexShrink: 0,
        marginHorizontal: wp('2%'),
        textAlign: 'center'
    },
    dateField: {
        backgroundColor: '#E5F3FF',
        borderRadius: 12,
        paddingTop: 12,
        paddingRight: 10,
        paddingBottom: 12,
        paddingLeft: 20,
        alignItems: 'center',
        gap: 10,
        flexShrink: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',

    },
    button: {
        backgroundColor: "#ffffff",
        borderColor: '#1286ED',
        padding: 10,
        borderRadius: 30

    },
    buttonBlue: {
        backgroundColor: "#1286ED",
        borderColor: '#1286ED',
        padding: 10,
        paddingHorizontal: 30,
        borderRadius: 30
    },
    chipOutline: {
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        borderRadius: 20,
        color: '#1286ED',
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
        borderColor: '#1286ED',
        borderWidth: 1,
        marginHorizontal: wp('2%'),
        textAlign: 'center'

    }

})

const Reports = (props) => {
    const { navigation } = props
    const globalStyle = useContext(StyleContext);
    const date_props = props?.route?.params?.date_props
    const trans_type_props = props?.route?.params?.trans_type_props
    const status_props = props?.route?.params?.status
    // console.log("props",date_props,trans_type_props,status_props)
    // console.log(navigation)

    const { transDate, setTransDate } = useContext(DataContext)
    const [loading, setLoading] = useState(false);
    const [merchantSessionData, setMerchentSessionData] = useState()
    const [transAmount, setTransAmount] = useState(0)
    const [totalTrans, setTotalTrans] = useState(0)
    const [isStatusFocus, setIsStatusFocus] = useState(false)
    const [currStatus, setCurrStatus] = useState("")
    const [filterModal, setFilterModal] = useState(false)
    const [isUpi, setIsUpi] = useState(false)
    const [isPg, setIsPg] = useState(false)
    const [fromDate, setFromDate] = useState(() => {
        const date = new Date();
        // date.setMonth(date.getMonth() - 1);
        return date;
    });

    const [toDate, setToDate] = useState(new Date())
    const [allTransData, setAllTransData] = useState([])
    const [isFilterUpdate, setIsFilterUpdate] = useState(false)
    const [fromDateModal, setFromDateModal] = useState(false)
    const [toDateModal, setToDateModal] = useState(false)
    const [trans, setNoTrans] = useState(false)

    const status = [
        { label: 'SUCCESS', value: 'SUCCESS' },
        { label: 'FAILED', value: 'FAILED' },
    ];
    const paymentMethods = [
        { label: 'UPI', value: 'upi' },
        { label: 'PG', value: 'pg' }
    ]

    const getTransactionDetails = async (trans_type, from_date, to_date) => {
        if (!merchantSessionData?.clientDetails?.id) {
            return
        }

        let payload = {
            paymentMethods: trans_type.length == 0 ? ["ALL"] : trans_type,
            transactionDate: {
                from: from_date.toISOString().split('T')[0],
                to: to_date.toISOString().split('T')[0]
            },

        }
        let headers = {
            'content-type': 'application/json',
            'x-client-id': merchantSessionData?.clientDetails?.id,
            'x-client-secret': merchantSessionData?.clientDetails?.secret

        }


        const get_transaction_data_api = await fetch(`${BASE_URL}/app/txn/getAllTransactionDetails`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        })

        const get_transaction_data_res = await get_transaction_data_api.json()

        if (get_transaction_data_res?.msg == "Success") {
            let total_trans_temp = []
            let total_amount = 0
            get_transaction_data_res.obj.forEach(paymentMethodObj => {
                paymentMethodObj.transactionDetailPojo.forEach(transaction => {
                    if (
                        currStatus === "" ||
                        (currStatus === "FAILED" && ["FAILURE", "FAILED"].includes(transaction?.status)) ||
                        currStatus === transaction?.status
                    ) {
                        total_trans_temp.push(transaction);
                        total_amount += parseFloat(transaction?.amount || 0);
                    }

                });
            });

            let total_trans = total_trans_temp.sort((a, b) => {
                const dateA = new Date(a.timeStamp).getTime();
                const dateB = new Date(b.timeStamp).getTime();
                return dateB - dateA; // Descending order
            });

            // const total_transaction_count = get_transaction_data_res?.obj.reduce(
            //     (count, { transactionDetailPojo }) => count + (transactionDetailPojo?.length || 0),
            //     0
            // );

            setTransAmount(total_amount.toFixed(2))
            setTotalTrans(total_trans_temp?.length)

            setAllTransData(total_trans)
            if (total_trans_temp?.length == 0) {

                setNoTrans(true)
            }
            else {
                setNoTrans(false)
            }



        }
        else {
            setTransAmount(0)
            setTotalTrans(0)
            setAllTransData([])


            setNoTrans(true)
        }




    }
    const handleFilterReset = () => {
        setIsUpi(false)
        setIsPg(false)
        setToDate(new Date())
        setFromDate(() => {
            const date = new Date();
            // date.setMonth(date.getMonth() - 1);
            return date;

        })
        setCurrStatus("")
        setIsFilterUpdate(!isFilterUpdate)

    }

    const handleTransDetails = (value) => {
        navigation.navigate('transactionreceipt', {
            txnId: value?.orderId,
            paymentMethod: value?.paymentMethod,
            clientId: merchantSessionData?.clientDetails?.id,
            timeStamp: value?.timeStamp,
        });


    }
    useEffect(() => {
        const getSession = async () => {
            setMerchentSessionData(await getMerchantSession())

        }
        getSession()


    }, [])

    useEffect(() => {
        if (date_props != undefined) {
            setFromDate(date_props?.fromDate)
            setToDate(date_props?.toDate)
        }
        if (trans_type_props != undefined) {
            if (trans_type_props == "UPI") {
                setIsUpi(true)
            }
            else if (trans_type_props == "PG") {
                setIsPg(true)

            }
        }
        if (status_props != undefined) {
            setCurrStatus(status_props)
        }
        setIsFilterUpdate(!isFilterUpdate)

    }, [])



    useFocusEffect(
        React.useCallback(() => {
            setFilterModal(false);
            setLoading(true);

            const trans_type = [
                isUpi ? "UPI" : "",
                isPg ? "PG" : ""
            ].filter(Boolean);

            getTransactionDetails(trans_type, fromDate, toDate)
                .finally(() => setLoading(false));
        }, [merchantSessionData, isFilterUpdate])
    );




    return (
        <SafeAreaView style={style.reportPage}>
            <View style={{ flexGrow: 1 }}>

                <View style={[globalStyle.background, { flex: 1 }]}>
                    <View style={style.homeContainer}>

                        <View style={{ margin: hp('2%') }}>
                            <DateHeader isBackHeader={true} navHeading={'Transaction Report'} isDate={false} navigation={navigation} />

                            {filterModal && (
                                <Modal
                                    isVisible={filterModal}
                                    animationType="fade"
                                    transparent={true}
                                    customBackdrop={
                                        <TouchableWithoutFeedback onPress={() => { setFilterModal(false) }}>
                                            <View style={[style.modalAbsolute, { pointerEvents: 'box-none' }]}>
                                                <BlurView
                                                    style={style.modalAbsolute}
                                                    blurType="dark"
                                                    blurAmount={500}
                                                    reducedTransparencyFallbackColor="white"
                                                />
                                            </View>
                                        </TouchableWithoutFeedback>
                                    }
                                >
                                    <View style={style.filterContainer}>
                                        <Text style={[globalStyle.boldText, { color: '#1286ED', fontSize: wp('4.5%') }]}>Payment method</Text>

                                        <View style={style.filterRow}>
                                            <View >
                                                <TouchableOpacity onPress={() => { setIsUpi(!isUpi) }}>
                                                    <Text style={[globalStyle.boldText, isUpi ? style.chipFilled : style.chipOutline, { fontSize: wp('5%') }]}>UPI    {isUpi ? 'X' : ''}</Text>
                                                </TouchableOpacity>
                                            </View>

                                            <View >
                                                <TouchableOpacity onPress={() => { setIsPg(!isPg) }}>
                                                    <Text style={[globalStyle.boldText, isPg ? style.chipFilled : style.chipOutline, { fontSize: wp('5%') }]}>PG     {isPg ? 'X' : ''}</Text>
                                                </TouchableOpacity>
                                            </View>




                                        </View>

                                        <Text style={[globalStyle.boldText, { color: '#1286ED', fontSize: wp('4.5%') }]}>Status</Text>



                                        <View style={style.filterRow}>
                                            <View>
                                                <TouchableOpacity onPress={() => { currStatus == "SUCCESS" ? setCurrStatus('') : setCurrStatus('SUCCESS') }}>
                                                    <Text style={[globalStyle.boldText, currStatus == "SUCCESS" ? style.chipFilled : style.chipOutline, { fontSize: wp('5%') }]}>SUCCESS    {currStatus == "SUCCESS" ? 'X' : ''}</Text>
                                                </TouchableOpacity>
                                            </View>

                                            <View>
                                                <TouchableOpacity onPress={() => { currStatus == "FAILED" ? setCurrStatus('') : setCurrStatus('FAILED') }}>
                                                    <Text style={[globalStyle.boldText, currStatus == "FAILED" ? style.chipFilled : style.chipOutline, { fontSize: wp('5%') }]}>FAILED     {currStatus == "FAILED" ? 'X' : ''}</Text>
                                                </TouchableOpacity>
                                            </View>




                                        </View>

                                        <View >
                                            <Text style={[globalStyle.boldText, { color: '#1286ED', fontSize: wp('4.5%') }]}>Date</Text>
                                            <View style={style.filterRow}>

                                                <TouchableOpacity style={style.filterRow} onPress={() => { setFromDateModal(!fromDateModal) }}>
                                                    <View style={style.dateField}>
                                                        <Text style={[globalStyle.boldText, { color: '#000000', fontSize: wp('3.5%'), marginTop: hp('0%') }]}>{fromDate.toISOString().split('T')[0]}</Text>
                                                        <CalendarIcon />
                                                    </View>
                                                </TouchableOpacity>

                                                <TouchableOpacity style={style.filterRow} onPress={() => { setToDateModal(!toDateModal) }}>
                                                    <View style={style.dateField}>
                                                        <Text style={[globalStyle.boldText, { color: '#000000', fontSize: wp('3.5%'), marginTop: hp('0%') }]}>{toDate.toISOString().split('T')[0]}</Text>
                                                        <CalendarIcon />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <DateTimePickerModal
                                            isVisible={fromDateModal}
                                            mode="date"
                                            display="spinner"
                                            onConfirm={(selectedDate) => {
                                                if (selectedDate) {
                                                    setFromDate(selectedDate);
                                                }
                                                setFromDateModal(false);
                                            }}
                                            onCancel={() => setFromDateModal(false)}
                                            maximumDate={new Date()}
                                            date={fromDate}
                                        />

                                        <DateTimePickerModal
                                            isVisible={toDateModal}
                                            mode="date"
                                            display="spinner"
                                            onConfirm={(selectedDate) => {
                                                if (selectedDate) {
                                                    setToDate(selectedDate);
                                                }
                                                setToDateModal(false);
                                            }}
                                            onCancel={() => setToDateModal(false)}
                                            maximumDate={new Date()}
                                            date={toDate}
                                        />

                                        <View>

                                            <View style={style.filterRow}>

                                                <Button
                                                    customeStyleButton={style.button}
                                                    disabled={loading}
                                                    onClick={handleFilterReset}
                                                >
                                                    <Text style={{ color: '#1286ED', fontSize: wp('3.5%') }}>
                                                        Reset Filter
                                                    </Text>
                                                </Button>

                                                <Button
                                                    customeStyleButton={style.buttonBlue}
                                                    disabled={loading}
                                                    onClick={() => { setIsFilterUpdate(!isFilterUpdate) }}
                                                >
                                                    <Text style={{ color: '#FFFFFF', fontSize: wp('3.5%') }}>
                                                        Filter
                                                    </Text>
                                                </Button>
                                            </View>

                                        </View>

                                    </View>

                                </Modal>

                            )

                            }
                            <Card
                                hasBackground={true}
                                backgroundImage={require('../../assets/images/credit_bg.png')}
                                customStyle={style.cardCustomStyleCard}
                            >
                                <View style={style.iconContainer}>
                                    <StatIcon width={wp('8%')} height={hp('5%')} />
                                </View>
                                {loading ? (
                                    <CardLoader />
                                ) : (
                                    <View style={style.bodyContainer}>
                                        <Text style={[globalStyle.headingText, { color: '#FFFFFFD9' }]}>Transactions Worth </Text>
                                        <Text style={[globalStyle.headingText, { color: '#FFFFFFD9' }]}>₹  {transAmount}</Text>
                                        <Text style={[globalStyle.headingText, { color: '#FFFFFFD9', fontSize: wp('4.5%') }]}>{totalTrans} Transactions</Text>
                                    </View>
                                )}
                            </Card>


                        </View>
                    </View>

                    <View style={style.homeBodyContainer}>
                        {trans && (
                            <Text style={[globalStyle.boldTextBlack, { textAlign: 'center' }]}>No Transaction Found</Text>

                        )

                        }

                        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                            <View style={style.transactionContainer}>
                                {loading && (
                                    Array.from({ length: 5 }).map((_, index) => (
                                        <Card key={index} customStyle={style.cardCustomStyle}>
                                            <TouchableOpacity>
                                                <View style={style.settlementContainer}>
                                                    <CardLoader />
                                                </View>
                                            </TouchableOpacity>
                                        </Card>
                                    ))
                                )}

                                {allTransData && allTransData.map((value, index) => (
                                    <Card key={index} customStyle={style.cardCustomStyle}>
                                        <TouchableOpacity onPress={() => handleTransDetails(value)}>
                                            <View style={style.settlementContainer}>
                                                <View style={style.cardData}>
                                                    <View style={style.logoContainer}>
                                                        {value?.paymentMethod === "UPI" ? (
                                                            <UpiIcon width={wp('8%')} height={hp('10%')} />
                                                        ) : (
                                                            <CardIcon width={wp('8%')} height={hp('10%')} />
                                                        )}
                                                    </View>
                                                    <View style={[style.infoContainer, { maxWidth: '70%' }]}>
                                                        <Text
                                                            style={[globalStyle.boldTextBlack, { textAlign: 'flex-start', flexWrap: 'wrap' }]}
                                                            ellipsizeMode="tail" // Optional: Adds "..." for overflowing text
                                                        >
                                                            Amount : ₹{value?.amount}
                                                        </Text>
                                                        {value?.payer_name && (
                                                            <Text style={[globalStyle.blackSubText, { textAlign: 'flex-start', fontSize: scaleFont('1.7%') }]}>
                                                                Payer Name : {value?.payer_name}
                                                            </Text>
                                                        )}
                                                        <Text
                                                            style={[globalStyle.blackSubText, { textAlign: 'flex-start', flexWrap: 'wrap', fontSize: scaleFont('1.7%') }]}
                                                            ellipsizeMode="tail"
                                                        >
                                                            ID : {value?.orderId}
                                                        </Text>
                                                        <Text style={[globalStyle.blackSubText, { textAlign: 'flex-start', fontSize: scaleFont('1.7%') }]}>
                                                            Status : {value?.status}
                                                        </Text>
                                                        {value?.date && (
                                                            <Text style={[globalStyle.blackSubText, { textAlign: 'flex-start', fontSize: scaleFont('1.7%') }]}>
                                                                Time : {value?.date + '  ' + value?.time}
                                                            </Text>
                                                        )}

                                                    </View>
                                                    <View style={style.rightContainer}>
                                                        <RightArrow fill={"#1286ED"} width={wp('6%')} height={hp('6.5%')} />
                                                    </View>
                                                </View>

                                            </View>
                                        </TouchableOpacity>
                                    </Card>
                                ))}
                            </View>
                        </ScrollView>

                        <PaperProvider>
                            <View style={[style.container, { position: 'absolute', bottom: 20, right: 10 }]}>
                                <FAB
                                    style={style.fab}
                                    icon={() => <FilterIcon />}
                                    onPress={() => setFilterModal(true)}
                                />
                            </View>
                        </PaperProvider>

                    </View>



                </View>

            </View>
            <Footer active={'transfer'} navigation={navigation} />
        </SafeAreaView>
    );
};

export default Reports;