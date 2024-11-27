import React, { useContext, useEffect, useState } from 'react';
import { StyleContext } from '../../GlobalStyleProvider';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


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
        alignItems:'center'
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
    const [noTrans,setNoTrans]=useState(false)

    const [cards, setCards] = useState({})

    const transCardsDetails = [
        {
            name: "UPI Collect",
            totalAmount: totalUPIAmount,
            totalTrans: `${totalUPI} Transactions`,
            icon: <UpiIcon width={wp('8%')} height={wp('10%')}/>
        },
        {
            name: 'PG Collect',
            totalAmount: totalPGAmount,
            totalTrans: `${totalPG} Transactions`,
            icon: <CardIcon width={wp('8%')} height={wp('10%')}/>
        }
    ]


    const CardElement = ({ cardDetails }) => (
        cardDetails.map((value, index) => (
            <View style={style.nestedCard} key={index}>
                <TouchableOpacity onPress={value?.onClick}>
                <View style={style.nestedElement}>
                    <Text style={globalStyle.boldTextBlack}>{value?.heading}</Text>
                    <Text style={globalStyle.boldTextBlack}>{value?.amount}</Text>
                    <RightArrow fill={"#1286ED"} width={wp('8%')} height={wp('6.5%')} />
                    

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
            if (transType == "ALL") {
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
                                amount: `${successTransactions.length} Transactions`,
                                onClick:()=>handleFilterTrans('',"SUCCESS")
                            },
                            {
                                heading: 'Failed',
                                amount: `${failTransactions.length} Transactions`,
                                onClick:()=>handleFilterTrans('',"FAILED")
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
        else{
            setTotalPGAmount(0)
            setTotalPG(0)
            setTotalUPIAmount(0)
            setTotalUPI(0)
            setCards({})
            setTotalTransAmount(0)
            setTotalTrans(0)
        }

        setLoading(false)



    }
    const handleFilterTrans=(value,status)=>{
        if(value=='UPI Collect'){
            value='UPI'
        }
        else if(value=='PG Collect'){
            value='PG'

        }
        navigation.navigate('reports',{date_props:transDate,trans_type_props:value,status:status})
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


    return (
        <View style={style.home}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={[globalStyle.background, { flex: 1 }]}>
                    <View style={style.homeContainer}>
                        <DateHeader date={FormatDate(transDate)} dateOnClick={() => { setDateModal(!dateModal) }} isBackHeader={true} navHeading={'Transaction Info'} navigation={navigation} />
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
                                maximumDate={new Date()}
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
                            </View>
                            {loading ? (
                                <CardLoader />
                            ) : (
                                <View style={style.bodyContainer}>
                                    <Text style={[globalStyle.headingText, { color: '#FFFFFFD9', fontSize: 18 }]}>
                                        Successful Transactions 
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
                                <TouchableOpacity onPress={()=>{handleFilterTrans(value?.name,'')}}>
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

                                                    <Text style={[globalStyle.boldTextBlack, { textAlign: 'center' }]}>₹ {value?.totalAmount} </Text>
                                                    <Text style={[globalStyle.boldTextBlack, { textAlign: 'center' }]}>{value?.totalTrans} </Text>
                                                    
                                              </View>
                                                <View style={style.rightContainer}>
                                                    <RightArrow fill={"#1286ED"} width={wp('8%')} height={wp('6.5%')}/>
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
                                                <MenuIcon width={wp('8%')} height={wp('10%')}/>
                                                <Text style={[globalStyle.boldTextBlack,{alignItems:'center'}]}>Transactions Status</Text>

                                                {toggle ? (
                                                    <DropDownIcon />
                                                ) : (
                                                    <RightArrow fill="#1286ED" width={wp('8%')} height={wp('6.5%')}/>
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
            <Footer active={'home'} navigation={navigation}/>
        </View>
    );
}

export default Transactions;
