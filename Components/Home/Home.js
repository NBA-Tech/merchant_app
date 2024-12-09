import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
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
import { DataContext } from '../../DataContext';
import { FormatDate, getMerchantSession } from '../../HelperFunctions';
import { useFocusEffect } from '@react-navigation/native';
import { useAutoLogout } from '../../AutoLogoutContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { image_urls } from '../../Config';
import Carousel from 'react-native-reanimated-carousel';
import {
    configureReanimatedLogger,
    ReanimatedLogLevel,
  } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');


const style = StyleSheet.create({
    homeContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    iconContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('0.5%'),
    },
    cardContainer: {
        flexDirection: 'column',
        padding: hp('3%'),
    },
    bodyContainer: {
        flexDirection: 'column',
    },
    settlementContainer: {
        flexDirection: 'column',
    },
    settlement: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    reportContainer: {
        flexDirection: 'column',
    },
    reportData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: hp('1%'),
        alignItems: 'center',
    },
    buttonContainer: {
        marginHorizontal: wp('0%'),
        marginVertical: hp('1%'),
        borderRadius: 10,           // Rounded corners
        borderWidth: 1,             // Border thickness
        borderColor: '#1286ED',     // Border color
    },
    button: {
        paddingHorizontal: wp('2%'),
        paddingVertical: hp('1%'),
    },
    homeBodyContainer: {
        backgroundColor: "#ffffff",
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    home: {
        backgroundColor: "#ffffff",
        flex: 1,
    },
    cardCustomStyle: {
        flex: 1,
        alignSelf: 'center',
    },
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 10,
    },
    text: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },

});

const Home = (props) => {
    const { navigation } = props
    const globalStyle = useContext(StyleContext);
    const { transDate, setTransDate } = useContext(DataContext)
    const [loading, setLoading] = useState(false);
    const [merchantSessionData, setMerchentSessionData] = useState()
    const [dateModal, setDateModal] = useState(false)
    const [transAmount, setTransAmount] = useState(0)
    const [totalTrans, setTotalTrans] = useState(0)
    const [settlementAmount, setSettlementAmount] = useState(0)
    const [settlementCount, setSettlementCount] = useState(0)
    const { resetTimer } = useAutoLogout();
    configureReanimatedLogger({
        level: ReanimatedLogLevel.warn,
        strict: false, // Reanimated runs in strict mode by default
      });
    const data = [
        { src: image_urls?.image_url_1},
        { src:  image_urls?.image_url_2},
        { src:  image_urls?.image_url_3},
    ];



    const get_transaction_data = async (from_date, to_date) => {
        let payload = {
            paymentMethods: [
                "ALL"
            ],
            transactionDate: {
                from: from_date,
                to: to_date
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
            const total_amount = get_transaction_data_res?.obj.reduce(
                (sum, { transactionSummary }) =>
                    sum +
                    parseFloat(transactionSummary?.totalSuccessAmount || 0) +
                    parseFloat(transactionSummary?.totalFailureAmount || 0),
                0
            ).toFixed(2);


            const total_transaction_count = get_transaction_data_res?.obj.reduce(
                (sum, { transactionSummary }) =>
                    sum +
                    parseInt(transactionSummary?.totalSuccessTransactions || 0) +
                    parseInt(transactionSummary?.totalFailureTransactions || 0),
                0
            )

            setTransAmount(total_amount)
            setTotalTrans(total_transaction_count)
        }
        else {
            setTransAmount(0)
            setTotalTrans(0)

        }
        // setLoading(false);
    }

    const getSettlement = async (date) => {
        let payload = {
            paymentMethod: [
                "ALL"
            ],
            settlementDate: date.split("T")[0]

        }

        let headers = {
            'content-type': 'application/json',
            'x-client-id': merchantSessionData?.clientDetails?.id,
            'x-client-secret': merchantSessionData?.clientDetails?.secret

        }

        const get_settlement_data_api = await fetch(`${BASE_URL}/app/txn/getAllSettlementDetails`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        })

        const get_settlement_data_res = await get_settlement_data_api.json()

        if (get_settlement_data_res?.statusCode == 200) {
            const total_amount = get_settlement_data_res?.obj?.reduce(
                (sum, { summaryDetails }) => 
                    sum + 
                parseFloat(summaryDetails?.totalSuccessAmount || 0)+
                parseFloat(summaryDetails?.totalFailureAmount || 0),
                0
            ).toFixed(2);

            const total_settlement_count = get_settlement_data_res?.obj?.reduce(
                (count, { summaryDetails }) => count + 
                parseInt(summaryDetails?.totalSuccessTransactions || 0)+
                parseInt(summaryDetails?.totalFailureTransactions || 0),
                0
            );

            setSettlementAmount(total_amount)
            setSettlementCount(total_settlement_count)

        }

    }



    const toggleDateModal = () => {
        setDateModal(!dateModal)
    }
    useEffect(() => {
        const getSession = async () => {
            setMerchentSessionData(await getMerchantSession())

        }
        getSession()


    }, [])
    const adjustDatesAndFetchData = async () => {
        await AsyncStorage.setItem('is_mpin_set', "true")
        resetTimer()
        setDateModal(false);
        setLoading(true);

        const startOfDay = new Date(Date.UTC(transDate.getFullYear(), transDate.getMonth(), transDate.getDate(), 0, 0, 0, 0));
        const endOfDay = new Date(Date.UTC(transDate.getFullYear(), transDate.getMonth(), transDate.getDate(), 23, 59, 59, 999));

        await get_transaction_data(startOfDay.toISOString(), endOfDay.toISOString());
        await getSettlement(startOfDay.toISOString())
        setLoading(false)
    };


    // useEffect(() => {
    //     adjustDatesAndFetchData();
    // }, [transDate, merchantSessionData]);

    useFocusEffect(
        React.useCallback(() => {
            adjustDatesAndFetchData();
        }, [transDate, merchantSessionData])
    );



    return (
        <SafeAreaView style={style.home}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={[globalStyle.background, { flex: 1 }]}>
                    <View style={style.homeContainer}>
                        <View style={{ margin: hp('2%') }}>
                            <DateHeader date={FormatDate(transDate)} dateOnClick={toggleDateModal} />
                            {dateModal && (
                                <DateTimePicker
                                    value={transDate}
                                    mode="date"
                                    display="spinner"
                                    onChange={(event, selectedDate) => {
                                        if (selectedDate) {
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
                                onClick={() => { navigation.navigate('trans') }}
                            >
                                <View style={style.iconContainer}>
                                    <StatIcon width={wp('8%')} height={hp('5%')} />

                                    <RightArrow width={wp('6%')} height={hp('6.5%')} />
                                </View>
                                {loading ? (
                                    <CardLoader />
                                ) : (
                                    <View style={style.bodyContainer}>
                                        <Text style={[globalStyle.headingText, { color: '#FFFFFFD9' }]}>Total Transactions worth </Text>
                                        <Text style={[globalStyle.headingText, { color: '#FFFFFFD9' }]}>₹ {transAmount} </Text>
                                        <Text style={[globalStyle.headingText, { color: '#FFFFFFD9', fontSize: wp('4.5%') }]}>{totalTrans} Transactions</Text>
                                    </View>
                                )}
                            </Card>
                        </View>
                    </View>
                    <View style={style.homeBodyContainer}>
                        <Card customStyle={style.cardCustomStyle} onClick={() => { navigation.navigate('settlementTab') }}>
                            <View style={style.settlementContainer}>
                                {loading ? (
                                    <CardLoader />
                                ) : (
                                    <View>
                                        <View style={style.settlementHeader}>
                                            <Text style={[globalStyle.boldTextBlack, { textAlign: 'center' }]}>Settlement amount</Text>
                                        </View>
                                        <View style={style.settlement}>
                                            <BankIcon width={wp('8%')} height={hp('8%')} />
                                            <Text style={[globalStyle.boldTextBlack, { textAlign: 'center' }]}>₹ {settlementAmount ?? 0} </Text>
                                            <RightArrow fill={"#1286ED"} width={wp('6%')} height={hp('6.5%')} />
                                        </View>
                                        <View style={style.settlementHeader}>
                                            <Text style={[globalStyle.boldTextBlack, { textAlign: 'center' }]}>{settlementCount ?? 0} Settlements</Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </Card>
                        <Carousel
                            width={width}
                            height={hp('30%')}
                            style={{marginLeft:'0.5%',marginBottom:hp('2%')}}
                            data={data}
                            renderItem={({ item }) => (
                                <View style={style.card}>
                                    <Image source={{uri:item?.src}} style={{width:wp('90%'),height:hp('50%')}}/>
                                </View>
                            )}
                            loop={true}
                            autoPlay={true}
                            autoPlayInterval={3000}
                            pagingEnabled={true}
                        />
                    </View>
                </View>
            </ScrollView>
            <Footer active={'home'} navigation={navigation} />
        </SafeAreaView>
    );
};

export default Home;
