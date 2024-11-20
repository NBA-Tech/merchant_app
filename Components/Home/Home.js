import React, { useEffect, useState, useContext } from 'react';
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
import { FormatDate,getMerchantSession } from '../../HelperFunctions';
import { useFocusEffect } from '@react-navigation/native';
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
        marginBottom: hp('3%'),
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
        marginVertical: hp('1%'),
    },
    reportContainer: {
        flexDirection: 'column',
    },
    reportData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: hp('1%'),
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
});

const Home = (props) => {
    const {navigation}=props
    const globalStyle = useContext(StyleContext);
    const { transDate, setTransDate } = useContext(DataContext)
    const [loading, setLoading] = useState(false);
    const [merchantSessionData, setMerchentSessionData] = useState()
    const [dateModal, setDateModal] = useState(false)
    const [transAmount, setTransAmount] = useState(0)
    const [totalTrans, setTotalTrans] = useState(0)


    
    const get_transaction_data = async (from_date, to_date) => {
        console.log(from_date)
        let payload = {
            paymentMethods: [
                "ALL"
            ],
            settlementDate

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
                (sum, { transactionSummary }) => sum + parseFloat(transactionSummary?.totalAmount || 0),
                0
            ).toFixed(2);

            const total_transaction_count = get_transaction_data_res?.obj.reduce(
                (count, { transactionDetailPojo }) => count + (transactionDetailPojo?.length || 0),
                0
            );

            setTransAmount(total_amount)
            setTotalTrans(total_transaction_count)
        }
        else {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'OOPS !',
                textBody: 'No Transaction Found',
                duration:1
            });
            setTimeout(() => {
                Toast.hide();
              }, 1000);
              setTransAmount(0)
              setTotalTrans(0)

        }
        setLoading(false);
    }

    const getSettlement=async(from_date,to_date)=>{
        let payload = {
            paymentMethods: [
                "ALL"
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

        const get_settlement_data_api = await fetch(`${BASE_URL}/app/txn/getAllSettlementDetails`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        })

        const get_settlement_data_res = await get_settlement_data_api.json()

    }



    const toggleDateModal = () => {
        setDateModal(!dateModal)
    }
    useEffect(()=>{
        const getSession=async()=>{
            setMerchentSessionData(await getMerchantSession())

        }
        getSession()
        

    },[])
    const adjustDatesAndFetchData = async () => {
        setDateModal(false);
        setLoading(true);

        const startOfDay = new Date(Date.UTC(transDate.getFullYear(), transDate.getMonth(), transDate.getDate(), 0, 0, 0, 0));
        const endOfDay = new Date(Date.UTC(transDate.getFullYear(), transDate.getMonth(), transDate.getDate(), 23, 59, 59, 999));

        await get_transaction_data(startOfDay.toISOString(), endOfDay.toISOString());
    };


    useEffect(() => {
        adjustDatesAndFetchData();
    }, [transDate, merchantSessionData]);

    useFocusEffect(
        React.useCallback(() => {
            adjustDatesAndFetchData();
        }, [])
    );



    return (
        <View style={style.home}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={[globalStyle.background, { flex: 1 }]}>
                    <View style={style.homeContainer}>
                        <View style={{ margin: hp('2%') }}>
                            <DateHeader date={FormatDate(transDate)} dateOnClick={toggleDateModal}  />
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
                                onClick={()=>{navigation.navigate('trans')}}
                            >
                                <View style={style.iconContainer}>
                                    <StatIcon />
                                    <RightArrow />
                                </View>
                                {loading ? (
                                    <CardLoader />
                                ) : (
                                    <View style={style.bodyContainer}>
                                        <Text style={[globalStyle.headingText, { color: '#FFFFFFD9', fontSize: 18 }]}>Successful Transactions worth </Text>
                                        <Text style={[globalStyle.headingText, { color: '#FFFFFFD9', fontSize: 18 }]}>₹ {transAmount} </Text>
                                        <Text style={[globalStyle.headingText, { color: '#FFFFFFD9', fontSize: 18 }]}>{totalTrans} Transactions</Text>
                                    </View>
                                )}
                            </Card>
                        </View>
                    </View>
                    <View style={style.homeBodyContainer}>
                        <Card customStyle={style.cardCustomStyle}>
                            <View style={style.settlementContainer}>
                                {loading ? (
                                    <CardLoader />
                                ) : (
                                    <View>
                                        <View style={style.settlementHeader}>
                                            <Text style={[globalStyle.boldTextBlack, { textAlign: 'center' }]}>Settlement amount</Text>
                                        </View>
                                        <View style={style.settlement}>
                                            <BankIcon />
                                            <Text style={[globalStyle.boldTextBlack, { textAlign: 'center' }]}>₹ 1000.00 </Text>
                                            <RightArrow fill={"#1286ED"} />
                                        </View>
                                        <View style={style.settlementHeader}>
                                            <Text style={[globalStyle.boldTextBlack, { textAlign: 'center' }]}>0 Transactions</Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </Card>
                        <Card customStyle={style.cardCustomStyle}>
                            <View style={style.settlementContainer}>
                                {loading ? (
                                    <CardLoader />
                                ) : (
                                    <View>
                                        <View style={style.reportContainer}>
                                            <View style={style.reportData}>
                                                <Text style={[globalStyle.boldTextBlack, { textAlign: 'flex-start' }]}>Reports</Text>
                                            </View>
                                            <View style={style.reportData}>
                                                <Text style={[globalStyle.boldTextBlack, { textAlign: 'flex-start' }]}>Download Monthly Reports</Text>
                                                <RightArrow fill={"#1286ED"} />
                                            </View>
                                            <View style={style.reportData}>
                                                <Button
                                                    customeStyleContainer={style.buttonContainer}
                                                    customeStyleButton={style.button}
                                                >
                                                    <View style={style.reportData}>
                                                        <DownloadIcon />
                                                        <Text style={[globalStyle.boldTextBlack, { textAlign: 'flex-start' }]}>Transaction</Text>
                                                    </View>
                                                </Button>
                                                <Button
                                                    customeStyleContainer={style.buttonContainer}
                                                    customeStyleButton={style.button}
                                                >
                                                    <View style={style.reportData}>
                                                        <DownloadIcon />
                                                        <Text style={[globalStyle.boldTextBlack, { textAlign: 'flex-start' }]}>Settlement</Text>
                                                    </View>
                                                </Button>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </Card>
                    </View>
                </View>
            </ScrollView>
            <Footer active={'home'} navigation={navigation}/>
        </View>
    );
};

export default Home;
