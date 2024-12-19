import React, { useContext, useEffect, useState, useCallback } from 'react';
import { StyleContext } from '../../GlobalStyleProvider';
import { useFocusEffect } from '@react-navigation/native';

import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateHeader from '../../Core_ui/DateHeader';
import Card from '../../Core_ui/Card';
import { BankIcon, RightArrow, StatIcon, UpiIcon, DropDownIcon, MenuIcon, CardIcon } from '../../SvgIcons';
import Footer from '../Footer';
import * as Animatable from 'react-native-animatable';
import { DataContext } from '../../DataContext';
import { FormatDate, getMerchantSession } from '../../HelperFunctions';
import { BASE_URL } from '../../Config';
import CardLoader from '../../Core_ui/CardLoader';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const style = StyleSheet.create({
    homeContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: hp('2%'),
    },
    cardContainer: {
        flexDirection: 'column',
        padding: hp('3%'),
    },
    bodyContainer: {
        flexDirection: 'column',
        marginBottom: hp('2%'),
    },
    settlementContainer: {
        flexDirection: 'column',

    },
    settlement: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: hp('1%'),
        alignItems: 'center'
    },
    home: {
        backgroundColor: "#ffffff",
        flex: 1,
    },
    transbodyContainer: {
        backgroundColor: "#ffffff",
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    cardCustomStyle: {
        alignSelf: 'center',
    },
    footerContainer: {
        justifyContent: 'flex-end',
        backgroundColor: '#F9F9F9',
        elevation: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    nestedCard: {
        flexDirection: 'column',
        flex: 1,
        marginVertical: hp('3%')

    },
    nestedElement: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
    iconContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('0.5%'),
    },
    cardData: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flex: 1
    },
    infoContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    rightContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
        alignItems: 'center'

    },
    logoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        marginRight: wp('8%')

    },


});

function Transactions(props) {
    const { navigation } = props
    const globalStyle = useContext(StyleContext);
    const [toggleIndex, setToggleIndex] = useState(-1)
    const [toggle, setToggle] = useState(false)
    const { transDate, setTransDate } = useContext(DataContext)
    const [merchantSessionData, setMerchentSessionData] = useState()
    const [dateModal, setDateModal] = useState(false)
    const [totalTransAmount, setTotalTransAmount] = useState(0)
    const [totalTrans, setTotalTrans] = useState(0)
    const [totalUPIAmount, setTotalUPIAmount] = useState(0)
    const [totalPGAmount, setTotalPGAmount] = useState(0)
    const [totalUPI, setTotalUPI] = useState(0)
    const [totalPG, setTotalPG] = useState(0)
    const [loading, setLoading] = useState(false)
    const [noTrans, setNoTrans] = useState(false)

    const [cards, setCards] = useState({})

    const transCardsDetails = [
        {
            name: "UPI Collect",
            totalAmount: totalUPIAmount,
            totalTrans: `${totalUPI} Transactions`,
            icon: <UpiIcon width={wp('8%')} height={hp('10%')} />
        },
        {
            name: 'PG Collect',
            totalAmount: totalPGAmount,
            totalTrans: `${totalPG} Transactions`,
            icon: <CardIcon width={wp('8%')} height={hp('10%')} />
        }
    ]


    const CardElement = ({ cardDetails }) => (
        cardDetails.map((value, index) => (
            <View style={style.nestedCard} key={index}>
                <TouchableOpacity onPress={value?.onClick}>
                    <View style={style.nestedElement}>
                        <Text style={globalStyle.boldTextBlack}>{value?.heading}</Text>
                        <Text style={globalStyle.boldTextBlack}>{value?.amount}</Text>
                        <RightArrow fill={"#1286ED"} width={wp('4%')} height={hp('4.5%')} />


                    </View>
                </TouchableOpacity>

            </View>

        )

        )

    )


    const toggleExpand = (index) => {
        setToggle(!toggle)

    }
    const getTransaction = async (transType, from_date, to_date) => {
        let payload = {
            paymentMethods: [transType],
            transactionDate: { from: from_date, to: to_date }
        };

        let headers = {
            'content-type': 'application/json',
            'x-client-id': merchantSessionData?.clientDetails?.id,
            'x-client-secret': merchantSessionData?.clientDetails?.secret
        };

        try {
            const response = await fetch(`${BASE_URL}/app/txn/getAllTransactionDetails`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result?.msg === "Success") {
                const { obj } = result;
                console.log(obj?.[0]?.transactionDetailPojo)

                if (transType === "ALL") {
                    const totalAmount = obj.reduce(
                        (sum, { transactionSummary }) =>
                            sum +
                            parseFloat(transactionSummary?.totalSuccessAmount || 0) +
                            parseFloat(transactionSummary?.totalFailureAmount || 0),
                        0
                    ).toFixed(2);

                    const totalTransactionCount = obj.reduce(
                        (sum, { transactionSummary }) =>
                            sum +
                            parseInt(transactionSummary?.totalSuccessTransactions || 0) +
                            parseInt(transactionSummary?.totalFailureTransactions || 0),
                        0
                    );

                    const successTransactions = obj.flatMap(({ transactionDetailPojo }) =>
                        transactionDetailPojo.filter(transaction => transaction.status === "SUCCESS")
                    );

                    const failTransactions = obj.flatMap(({ transactionDetailPojo }) =>
                        transactionDetailPojo.filter(transaction => ["FAILURE", "FAILED"].includes(transaction?.status))
                    );

                    setCards(({
                        name: 'Success Transaction',
                        cardDetails: <CardElement cardDetails={[
                            {
                                heading: 'Success',
                                amount: `${successTransactions.length} Transactions`,
                                onClick: () => handleFilterTrans('', "SUCCESS")
                            },
                            {
                                heading: 'Failed',
                                amount: `${failTransactions.length} Transactions`,
                                onClick: () => handleFilterTrans('', "FAILED")
                            }
                        ]} />
                    }));

                    setTotalTransAmount(parseFloat(totalAmount || 0).toFixed(2));

                    setTotalTrans(totalTransactionCount);

                } else if (transType === "UPI") {
                    const upiAmount =
                        parseFloat(obj?.[0]?.transactionSummary?.totalSuccessAmount || 0) +
                        parseFloat(obj?.[0]?.transactionSummary?.totalFailureAmount || 0);

                    const upiCount =
                        parseInt(obj?.[0]?.transactionSummary?.totalFailureTransactions || 0) +
                        parseInt(obj?.[0]?.transactionSummary?.totalSuccessTransactions || 0);

                    setTotalUPIAmount(upiAmount.toFixed(2));
                    setTotalUPI(upiCount);

                } else if (transType === "PG") {
                    const pgAmount =
                        parseFloat(obj?.[0]?.transactionSummary?.totalSuccessAmount || 0) +
                        parseFloat(obj?.[0]?.transactionSummary?.totalFailureAmount || 0);

                    const pgCount =
                        parseInt(obj?.[0]?.transactionSummary?.totalFailureTransactions || 0) +
                        parseInt(obj?.[0]?.transactionSummary?.totalSuccessTransactions || 0);

                    setTotalPGAmount(pgAmount.toFixed(2));
                    setTotalPG(pgCount);
                }
            } else {
                handleEmptyState(transType);
            }
        } catch (error) {
            console.error("Error fetching transaction data:", error);
            handleEmptyState(transType);
        }
    };

    const handleEmptyState = (transType) => {
        if (transType === "ALL") {
            setCards({});
            setTotalTransAmount(0);
            setTotalTrans(0);
        } else if (transType === "PG") {
            setTotalPGAmount(0);
            setTotalPG(0);
        } else if (transType === "UPI") {
            setTotalUPIAmount(0);
            setTotalUPI(0);
        }
    };

    const handleFilterTrans = (value, status) => {
        if (value == 'UPI Collect') {
            value = 'UPI'
        }
        else if (value == 'PG Collect') {
            value = 'PG'

        }
        navigation.navigate('reportsStack', { date_props: { fromDate: transDate, toDate: transDate }, trans_type_props: value, status: status })
    }

    useEffect(() => {
        const getSession = async () => {
            setMerchentSessionData(await getMerchantSession())

        }
        getSession()


    }, [])



    useFocusEffect(
        useCallback(() => {

            const fetchData = async () => {
                setLoading(true);

                try {
                    if (merchantSessionData) {


                        await Promise.all(
                            ["PG", "UPI", "ALL"].map(async (value) => {
                                const startOfDay = transDate.toISOString().slice(0, 10);
                                const endOfDay = transDate.toISOString().slice(0, 10);
                                await getTransaction(value, startOfDay, endOfDay);

                            })
                        );
                    }
                } catch (error) {
                    console.error("Error fetching transactions:", error);
                } finally {
                    if (merchantSessionData) {
                        setLoading(false)

                    }
                }
            };

            fetchData();
        }, [transDate, merchantSessionData]) // Dependencies to re-run the effect
    );


    return (
        <SafeAreaView style={style.home}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={[globalStyle.background, { flex: 1 }]}>
                    <View style={style.homeContainer}>
                        <DateHeader date={FormatDate(transDate)} dateOnClick={() => { setDateModal(!dateModal) }} isBackHeader={true} navHeading={'Transaction Info'} navigation={navigation} />
                        <DateTimePickerModal
                            isVisible={dateModal}
                            mode="date"
                            display="spinner"
                            onConfirm={(selectedDate) => {
                                if (selectedDate) {
                                    setTransDate(selectedDate);
                                }
                                setDateModal(false);
                            }}
                            onCancel={() => setDateModal(false)}
                            maximumDate={new Date()}
                            date={transDate}
                        />
                        <Card
                            hasBackground={true}
                            backgroundImage={require('../../assets/images/credit_bg.png')}
                            customStyle={style.cardContainer}
                        >
                            <View style={style.iconContainer}>
                                <StatIcon width={wp('8%')} height={hp('5%')} />
                            </View>
                            {loading ? (
                                <CardLoader />
                            ) : (
                                <View style={style.bodyContainer}>
                                    <Text style={[globalStyle.headingText, { color: '#FFFFFFD9' }]}>
                                        Total Transactions worth
                                    </Text>
                                    <Text style={[globalStyle.headingText, { color: '#FFFFFFD9' }]}>
                                        ₹ {totalTransAmount}
                                    </Text>
                                    <Text style={[globalStyle.headingText, { color: '#FFFFFFD9', fontSize: wp('4.5%') }]}>
                                        {totalTrans} Transactions
                                    </Text>
                                </View>

                            )

                            }

                        </Card>
                    </View>



                    <View style={style.transbodyContainer}>
                        {transCardsDetails && transCardsDetails.map((value, index) => (
                            <Card customStyle={style.cardCustomStyle} key={index}>
                                <TouchableOpacity onPress={() => { handleFilterTrans(value?.name, '') }}>
                                    <View style={style.settlementContainer}>
                                        {loading ? (
                                            <CardLoader />
                                        ) : (

                                            <View style={style.cardData}>
                                                <View style={style.logoContainer}>
                                                    {value?.icon}
                                                </View>
                                                <View style={style.infoContainer}>
                                                    <Text style={[globalStyle.boldTextBlack, { textAlign: 'center' }]}>{value?.name}</Text>

                                                    <Text style={[globalStyle.blackSubText, { textAlign: 'center', paddingVertical: hp('1%'), }]}>₹ {value?.totalAmount} </Text>
                                                    <Text style={[globalStyle.blackSubText, { textAlign: 'center' }]}>{value?.totalTrans} </Text>

                                                </View>
                                                <View style={style.rightContainer}>
                                                    <RightArrow fill={"#1286ED"} width={wp('6%')} height={hp('6.5%')} />
                                                </View>
                                            </View>

                                        )

                                        }

                                    </View>
                                </TouchableOpacity>

                            </Card>

                        ))

                        }




                        <Card customStyle={style.cardCustomStyle}>
                            <TouchableOpacity onPress={toggleExpand}>
                                <View style={style.settlementContainer}>
                                    <View>
                                        {loading ? (
                                            <CardLoader />
                                        ) : (
                                            <View style={style.settlement}>
                                                <MenuIcon width={wp('7%')} height={hp('6%')} />
                                                <Text style={[globalStyle.boldTextBlack, { alignItems: 'center' }]}>Transactions Status</Text>

                                                {toggle ? (
                                                    <DropDownIcon width={wp('6%')} height={hp('6.5%')} />
                                                ) : (
                                                    <RightArrow fill="#1286ED" width={wp('6%')} height={hp('6.5%')} />
                                                )}
                                            </View>

                                        )

                                        }

                                    </View>
                                </View>
                            </TouchableOpacity>
                            {toggle && (

                                <Animatable.View animation="fadeInDown" duration={300}>
                                    <View>
                                        {cards?.cardDetails && cards?.cardDetails}
                                    </View>
                                </Animatable.View>

                            )

                            }

                        </Card>

                    </View>
                </View>
            </ScrollView>
            <Footer active={'home'} navigation={navigation} />
        </SafeAreaView>
    );
}

export default Transactions;
