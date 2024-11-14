import React, { useContext, useEffect, useState } from 'react';
import { StyleContext } from '../../GlobalStyleProvider';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DateHeader from '../../Core_ui/DateHeader';
import Card from '../../Core_ui/Card';
import { BankIcon, RightArrow, StatIcon, UpiIcon, DropDownIcon, MenuIcon, CardIcon } from '../../SvgIcons';
import Footer from '../Footer';
import * as Animatable from 'react-native-animatable';
import { DataContext } from '../../DataContext';
import { FormatDate, getMerchantSession } from '../../HelperFunctions';
import { BASE_URL } from '../../Config';
import DateTimePicker from '@react-native-community/datetimepicker';
import CardLoader from '../../Core_ui/CardLoader';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

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
        marginBottom: hp('3%'),
    },


});

function Transactions(props) {
    const {navigation}=props
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

    const [cards, setCards] = useState({})

    const transCardsDetails = [
        {
            name: "UPI Collect",
            totalAmount: totalUPIAmount,
            totalTrans: `${totalUPI} Transactions`,
            icon: <UpiIcon />
        },
        {
            name: 'PG Collect',
            totalAmount: totalPGAmount,
            totalTrans: `${totalPG} Transactions`,
            icon: <CardIcon />
        }
    ]


    const CardElement = ({ cardDetails }) => (
        cardDetails.map((value, index) => (
            <View style={style.nestedCard} key={index}>
                <View style={style.nestedElement}>
                    <Text style={globalStyle.boldTextBlack}>{value?.heading}</Text>
                    <Text style={globalStyle.boldTextBlack}>{value?.amount}</Text>
                    <RightArrow fill={"#1286ED"} />

                </View>

            </View>

        )

        )

    )


    const toggleExpand = (index) => {
        setToggle(!toggle)

    }
    const getTransaction = async (transType, from_date, to_date) => {
        let payload = {
            paymentMethods: [
                transType
            ],
            transactionDate: {
                from: from_date,
                to: to_date
            },
            transactionAmount: {
                from: 0,
                to: 100000
            }

        }
        console.log(payload)

        let headers = {
            'content-type': 'application/json',
            'x-client-id': merchantSessionData?.clientDetails?.id,
            'x-client-secret': merchantSessionData?.clientDetails?.secret

        }
        console.log(headers)

        const get_transaction_data_api = await fetch(`${BASE_URL}/app/txn/getTransactionDetails`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        })

        const get_transaction_data_res = await get_transaction_data_api.json()
        if (get_transaction_data_res?.msg == "Success") {
            if (transType == "ALL") {
                console.log("comming")
                const total_amount = get_transaction_data_res?.obj.reduce(
                    (sum, { transactionSummary }) => sum + parseFloat(transactionSummary?.totalAmount || 0),
                    0
                ).toFixed(2);

                const total_transaction_count = get_transaction_data_res?.obj.reduce(
                    (count, { transactionDetailPojo }) => count + (transactionDetailPojo?.length || 0),
                    0
                );
                const pendingTransactions = get_transaction_data_res?.obj.flatMap(obj =>
                    obj.transactionDetailPojo.filter(transaction => transaction.status === "PENDING")
                );


                const successTransactions = get_transaction_data_res?.obj.flatMap(obj =>
                    obj.transactionDetailPojo.filter(transaction => transaction.status === "SUCCESS")
                );


                const failTransactions = get_transaction_data_res?.obj.flatMap(obj =>
                    obj.transactionDetailPojo.filter(transaction => transaction.status === "FAILED")
                );

                setCards(
                    {
                        name: 'Success Transaction',
                        cardDetails: <CardElement cardDetails={[
                            {
                                heading: 'Success',
                                amount: `${successTransactions.length} Transactions`
                            }, {
                                heading: 'Pending ',
                                amount: `${pendingTransactions.length} Transactions`
                            },
                            {
                                heading: 'Failed',
                                amount: `${failTransactions.length} Transactions`
                            }
                        ]} />
                    },
                )



                setTotalTransAmount(total_amount)
                setTotalTrans(total_transaction_count)

            }
            else if (transType == "UPI") {
                setTotalUPIAmount(get_transaction_data_res?.obj?.[0]?.transactionSummary?.totalAmount)
                setTotalUPI(get_transaction_data_res?.obj?.[0]?.transactionDetailPojo.length)

            }
            else if (transType == "PG") {
                setTotalPGAmount(get_transaction_data_res?.obj?.[0]?.transactionSummary?.totalAmount)
                setTotalPG(get_transaction_data_res?.obj?.[0]?.transactionDetailPojo.length)
            }
        }

        setLoading(false) 



    }

    useEffect(() => {
        const getSession = async () => {
            setMerchentSessionData(await getMerchantSession())

        }
        getSession()


    }, [])


    useEffect(() => {
        (async () => {
            setLoading(true)

            await Promise.all(
                ["PG", "UPI", "ALL"].map(async (value) => {
                    const startOfDay = new Date(Date.UTC(transDate.getFullYear(), transDate.getMonth(), transDate.getDate(), 0, 0, 0, 0));
                    const endOfDay = new Date(Date.UTC(transDate.getFullYear(), transDate.getMonth(), transDate.getDate(), 23, 59, 59, 999));
                    await getTransaction(value, startOfDay.toISOString(), endOfDay.toISOString());
                })
            );
        })();
    }, [transDate, merchantSessionData]);

    useEffect(() => {
        console.log(cards)
    }, [cards])

    return (
        <View style={style.home}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={[globalStyle.background, { flex: 1 }]}>
                    <View style={style.homeContainer}>
                        <DateHeader date={FormatDate(transDate)} dateOnClick={() => { setDateModal(!dateModal) }} isBackHeader={true} navHeading={'Transaction Info'} navigation={navigation}/>
                        {dateModal && (
                            <DateTimePicker
                                value={transDate}
                                mode="date"
                                display="spinner"
                                onChange={(event, selectedDate) => {
                                    if (selectedDate) {
                                        setDateModal(false)
                                        setTransDate(selectedDate);
                                    }
                                }}
                            />
                        )

                        }
                        <Card
                            hasBackground={true}
                            backgroundImage={require('../../assets/images/credit_bg.png')}
                            customStyle={style.cardContainer}
                        >
                            <View style={style.iconContainer}>
                                <StatIcon />
                                <RightArrow />
                            </View>
                            {loading ? (
                                <CardLoader />
                            ) : (
                                <View style={style.bodyContainer}>
                                    <Text style={[globalStyle.headingText, { color: '#FFFFFFD9', fontSize: 18 }]}>
                                        Successful Transactions worth
                                    </Text>
                                    <Text style={[globalStyle.headingText, { color: '#FFFFFFD9', fontSize: 18 }]}>
                                        ₹ {totalTransAmount}
                                    </Text>
                                    <Text style={[globalStyle.headingText, { color: '#FFFFFFD9', fontSize: 18 }]}>
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
                                <TouchableOpacity>
                                    <View style={style.settlementContainer}>
                                        {loading ? (
                                            <CardLoader />
                                        ) : (
                                            <View>
                                                <View style={style.settlementHeader}>
                                                    <Text style={[globalStyle.boldTextBlack, { textAlign: 'center' }]}>{value?.name}</Text>
                                                </View>
                                                <View style={style.settlement}>
                                                    {value?.icon}
                                                    <Text style={[globalStyle.boldTextBlack, { textAlign: 'center' }]}>₹ {value?.totalAmount} </Text>

                                                    <RightArrow fill={"#1286ED"} />

                                                </View>
                                                <View style={style.settlementHeader}>
                                                    <Text style={[globalStyle.boldTextBlack, { textAlign: 'center' }]}>{value?.totalTrans}</Text>
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
                                                <MenuIcon />
                                                <Text style={[globalStyle.boldTextBlack, { textAlign: 'center' }]}>Transactions Status</Text>

                                                {toggle ? (
                                                    <DropDownIcon />
                                                ) : (
                                                    <RightArrow fill="#1286ED" />
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
            <Footer active={'home'} />
        </View>
    );
}

export default Transactions;
