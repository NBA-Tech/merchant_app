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
import DateTimePicker from '@react-native-community/datetimepicker';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { DataContext } from '../../DataContext';
import { FormatDate, getMerchantSession } from '../../HelperFunctions';
import { Dropdown } from 'react-native-element-dropdown';
import { FAB, Provider as PaperProvider } from 'react-native-paper';
import Modal from "react-native-modal";
import { BlurView } from '@react-native-community/blur';


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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('3%'),
    },
    bodyContainer: {
        flexDirection: 'column',
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
        justifyContent: 'space-between',
        marginVertical: hp('2%')
    },
    dropdown: {
        height: 40,
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
        paddingTop: 30
    },
    infoContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start'
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
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
        marginHorizontal: wp('5%')
    },
    dateField: {
        backgroundColor: '#E5F3FF',
        borderRadius: 12,
        paddingTop: 12,
        paddingRight: 10,
        paddingBottom: 12,
        paddingLeft: 20,
        alignItems: 'center',
        gap: 10, // This may not work depending on the React Native version; an alternative is to use margin or justifyContent with flex properties
        flexShrink: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'
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
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
        borderColor: '#1286ED',
        borderWidth: 1,
        marginHorizontal: wp('5%')

    }

})

const Reports = (props) => {
    const { navigation } = props
    const globalStyle = useContext(StyleContext);
    const date_props = props?.route?.params?.date_props
    const trans_type_props = props?.route?.params?.trans_type_props
    const status_props = props?.route?.params?.status

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
        { label: 'FAILED', value: 'FAILURE' },
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
        console.log("hello world",payload)


        const get_transaction_data_api = await fetch(`${BASE_URL}/app/txn/getAllTransactionDetails`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        })

        const get_transaction_data_res = await get_transaction_data_api.json()
        console.log(get_transaction_data_res?.obj?.[0]?.transactionDetailPojo)

        if (get_transaction_data_res?.msg == "Success") {
            let total_trans_temp = []
            let total_amount = 0
            get_transaction_data_res.obj.forEach(paymentMethodObj => {
                paymentMethodObj.transactionDetailPojo.forEach(transaction => {
                    if (currStatus == "" || currStatus == transaction?.status) {
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
        console.log(value?.orderId)
        navigation.navigate('reportsMain', {
            screen: 'transactionreceipt',
            params: {
                txnId: value?.orderId,
                paymentMethod: value?.paymentMethod,
                clientId: merchantSessionData?.clientDetails?.id,
                timeStamp: value?.timeStamp,
            },
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
            console.log("hello world",trans_type, fromDate, toDate)

            getTransactionDetails(trans_type, fromDate, toDate)
                .finally(() => setLoading(false));
        }, [merchantSessionData, isFilterUpdate])
    );




    return (
        <View style={style.reportPage}>
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
                                        <Text style={[globalStyle.boldText, { color: '#1286ED', fontSize: 18 }]}>Payment method</Text>

                                        <View style={[style.filterRow, { justifyContent: 'flex-start' }]}>
                                            <TouchableOpacity style={style.filterRow} onPress={() => { setIsUpi(!isUpi) }}>
                                                <Text style={[globalStyle.boldText, isUpi ? style.chipFilled : style.chipOutline]}>UPI    {isUpi ? 'X' : ''}</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={style.filterRow} onPress={() => { setIsPg(!isPg) }}>
                                                <Text style={[globalStyle.boldText, isPg ? style.chipFilled : style.chipOutline]}>PG     {isPg ? 'X' : ''}</Text>
                                            </TouchableOpacity>




                                        </View>

                                        <Text style={[globalStyle.boldText, { color: '#1286ED', fontSize: 18 }]}>Status</Text>

                                        <View style={style.filterRow}>
                                            <Dropdown
                                                style={[
                                                    style.dropdown,
                                                    isStatusFocus && { borderColor: 'blue' },
                                                    { backgroundColor: '#E5F3FF' },
                                                ]}
                                                placeholderStyle={{
                                                    color: '#000000', // Placeholder text black
                                                    fontSize: 16, // Example for adjusting font size (optional)
                                                    fontFamily: 'IBMPlexSans-Bold'
                                                }}
                                                selectedTextStyle={{
                                                    color: '#000000', // Selected text black
                                                    fontSize: 16, // Adjust as necessary
                                                    fontFamily: 'IBMPlexSans-Bold'
                                                }}
                                                itemTextStyle={{
                                                    color: '#000000', // Items in the dropdown list should also be black
                                                    fontFamily: 'IBMPlexSans-Bold'
                                                }}
                                                dropdownStyle={{
                                                    backgroundColor: '#E5F3FF', // Dropdown background color to white
                                                }}
                                                maxHeight={300}
                                                labelField="label"
                                                valueField="value"
                                                placeholder={!isStatusFocus ? 'Select Status' : '...'}
                                                onFocus={() => setIsStatusFocus(true)}
                                                onBlur={() => setIsStatusFocus(false)}
                                                data={status}
                                                value={currStatus}
                                                onChange={(item) => setCurrStatus(item?.value)}

                                            />

                                        </View>
                                        <View >
                                            <Text style={[globalStyle.boldText, { color: '#1286ED', fontSize: 18 }]}>Date</Text>
                                            <View style={style.filterRow}>

                                                <TouchableOpacity style={style.filterRow} onPress={() => { setFromDateModal(!fromDateModal) }}>
                                                    <View style={style.dateField}>
                                                        <Text style={[globalStyle.boldText, { color: '#000000', fontSize: 15 }]}>{fromDate.toISOString().split('T')[0]}</Text>
                                                        <CalendarIcon />
                                                    </View>
                                                </TouchableOpacity>

                                                <TouchableOpacity style={style.filterRow} onPress={() => { setToDateModal(!toDateModal) }}>
                                                    <View style={style.dateField}>
                                                        <Text style={[globalStyle.boldText, { color: '#000000', fontSize: 15 }]}>{toDate.toISOString().split('T')[0]}</Text>
                                                        <CalendarIcon />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        {fromDateModal && (
                                            <DateTimePicker
                                                value={fromDate}
                                                mode="date"
                                                display="spinner"
                                                onChange={(event, selectedDate) => {
                                                    if (selectedDate) {
                                                        setFromDate(selectedDate)
                                                    }
                                                    setFromDateModal(false)

                                                }}
                                                maximumDate={new Date()}
                                            />
                                        )

                                        }

                                        {toDateModal && (
                                            <DateTimePicker
                                                value={toDate}
                                                mode="date"
                                                display="spinner"
                                                onChange={(event, selectedDate) => {
                                                    if (selectedDate) {
                                                        setToDate(selectedDate)
                                                    }
                                                    setToDateModal(false)

                                                }}
                                                maximumDate={new Date()}
                                            />
                                        )

                                        }

                                        <View>

                                            <View style={style.filterRow}>

                                                <Button
                                                    customeStyleButton={style.button}
                                                    disabled={loading}
                                                    onClick={handleFilterReset}
                                                >
                                                    <Text style={{ color: '#1286ED' }}>
                                                        Reset Filter
                                                    </Text>
                                                </Button>

                                                <Button
                                                    customeStyleButton={style.buttonBlue}
                                                    disabled={loading}
                                                    onClick={() => { setIsFilterUpdate(!isFilterUpdate) }}
                                                >
                                                    <Text style={{ color: '#FFFFFF' }}>
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
                                    <StatIcon />
                                </View>
                                {loading ? (
                                    <CardLoader />
                                ) : (
                                    <View style={style.bodyContainer}>
                                        <Text style={[globalStyle.headingText, { color: '#FFFFFFD9', fontSize: 18 }]}>Transactions Worth </Text>
                                        <Text style={[globalStyle.headingText, { color: '#FFFFFFD9', fontSize: 18 }]}>₹  {transAmount}</Text>
                                        <Text style={[globalStyle.headingText, { color: '#FFFFFFD9', fontSize: 18 }]}>{totalTrans} Transactions</Text>
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
                                                        {value?.paymentMethod === "UPI" ? <UpiIcon /> : <CardIcon />}
                                                    </View>
                                                    <View style={style.infoContainer}>
                                                        <Text style={[globalStyle.boldTextBlack, { textAlign: 'center' }]}>
                                                            Amount : ₹{value?.amount}
                                                        </Text>
                                                        <Text style={[globalStyle.blackSubText, { textAlign: 'center' }]}>
                                                            ID : {value?.orderId}
                                                        </Text>
                                                        <Text style={[globalStyle.blackSubText, { textAlign: 'center' }]}>
                                                            Status : {value?.status}
                                                        </Text>
                                                        {value?.timeStamp && (
                                                            <Text style={[globalStyle.blackSubText, { textAlign: 'center' }]}>
                                                                Date : {new Date(value?.timeStamp).toISOString().split('T')[0]}
                                                            </Text>

                                                        )

                                                        }

                                                    </View>
                                                    <View style={style.rightContainer}>
                                                        <RightArrow fill={"#1286ED"} />
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
        </View>
    );
};

export default Reports;