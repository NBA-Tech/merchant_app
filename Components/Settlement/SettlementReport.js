
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import { StyleContext } from '../../GlobalStyleProvider';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Card from '../../Core_ui/Card';
import DateHeader from '../../Core_ui/DateHeader';
import Footer from '../Footer';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';
import { BankIcon, CardIcon, RightArrow, StatIcon, UpiIcon } from '../../SvgIcons';
import Button from '../../Core_ui/Button';
import { FormatDate, getMerchantSession } from '../../HelperFunctions';
import { DataContext } from '../../DataContext';
import CardLoader from '../../Core_ui/CardLoader';
import { BASE_URL } from '../../Config';
const style = StyleSheet.create({
    home: {
        backgroundColor: "#ffffff",
        flex: 1,
    },
    homeContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    text: {
        color: '#000000',
        fontSize: 15,
        fontWeight: '400',
    },
    leftDetails: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: wp('2%'),
        justifyContent: 'center',


    },
    cardDetails: {
        color: '#000000',
        fontSize: 15,
        fontWeight: '400',
        paddingHorizontal: wp('2%'),

    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp('0.5%'),
    },
    cardContent: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffffff",
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

    },
    buttonContainer: {
        marginHorizontal: wp('5%'),
        marginVertical: hp('1%'),
        borderRadius: 20,


    },
    button: {
        paddingHorizontal: wp('2%'),
        paddingVertical: hp('1%'),
        backgroundColor: '#1286ED',
        borderRadius: 20
    },
    download: {
        fontSize: wp('4%'),
        fontWeight: '500',
    },
    settlementAmount: {
        paddingVertical: wp('2%'),
        paddingHorizontal: wp('2%'),

    },
    cardCustomStyle: {
        flex: 1,
        alignSelf: 'center',
    },
    cardContainer: {
        flexDirection: 'column',
        padding: hp('1%'),
    },



})
function SettlementReport(props) {
    const { navigation } = props
    const globalStyle = useContext(StyleContext);
    const { transDate, setTransDate } = useContext(DataContext);
    const [merchantSessionData, setMerchentSessionData] = useState();
    const [dateModal, setDateModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const [settlementAmount, setSettlementAmount] = useState(0)
    const [totalUPIAmount, setTotalUPIAmount] = useState(0)
    const [totalPGAmount, setTotalPGAmount] = useState(0)
    const [totalUPI, setTotalUPI] = useState(0)
    const [totalPG, setTotalPG] = useState(0)



    const toggleDateModal = () => {
        setDateModal(!dateModal)
    }
    const getSettlement = async (trans_type, date) => {
        let payload = {
            paymentMethod: [
                trans_type
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
            if (trans_type == "ALL") {
                const total_amount = get_settlement_data_res?.obj?.reduce(
                    (sum, { summaryDetails }) => sum + 
                    parseFloat(summaryDetails?.totalSuccessAmount || 0)+
                    parseFloat(summaryDetails?.totalFailureAmount || 0),
                    0
                ).toFixed(2);

                setSettlementAmount(total_amount)
            }

            else if (trans_type == "UPI") {
                setTotalUPIAmount(parseFloat(get_settlement_data_res?.obj?.[0]?.summaryDetails?.totalSuccessAmount ?? 0)+parseFloat(get_settlement_data_res?.obj?.[0]?.summaryDetails?.totalFailureAmount ?? 0))
                // setTotalUPI(get_settlement_data_res?.obj?.[0]?.settlementDetails.length)

            }
            else if (trans_type == "PG") {
                setTotalPGAmount(parseFloat(get_settlement_data_res?.obj?.[0]?.summaryDetails?.totalSuccessAmount ?? 0)+parseFloat(get_settlement_data_res?.obj?.[0]?.summaryDetails?.totalFailureAmount ?? 0))
                // setTotalPG(get_settlement_data_res?.obj?.[0]?.settlementDetails.length)
            }


        }


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
                    // const endOfDay = new Date(Date.UTC(transDate.getFullYear(), transDate.getMonth(), transDate.getDate(), 23, 59, 59, 999));
                    await getSettlement(value, startOfDay.toISOString());
                })
            );
            setLoading(false)
        })();
    }, [transDate, merchantSessionData]);

    return (
        <View style={style.home}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={[globalStyle.background, { flex: 1 }]}>
                    <View style={style.homeContainer}>
                        <View style={{ margin: hp('2%') }}>
                            <DateHeader date={FormatDate(transDate)} dateOnClick={toggleDateModal} isBackHeader={true} navHeading={'Settlements'} navigation={navigation} />
                            {dateModal && (
                                <DateTimePicker
                                    value={transDate}
                                    mode="date"
                                    display="spinner"
                                    onChange={(event, selectedDate) => {
                                        if (selectedDate) {
                                            setTransDate(selectedDate);
                                            setDateModal(false)
                                        }
                                    }}
                                    maximumDate={new Date()}
                                />
                            )

                            }
                            <Card hasBackground={true}
                                backgroundImage={require('../../assets/images/credit_bg.png')}  >
                                {loading ? (
                                    <CardLoader />
                                ) : (
                                    <View style={style.cardContainer}>
                                        <StatIcon width={wp('8%')} height={hp('5%')} />
                                        <Text style={globalStyle.headingText}>
                                            Total Transaction Worth
                                        </Text>

                                        <Text style={globalStyle.headingText}>
                                            ₹ {settlementAmount ?? 0}
                                        </Text>
                                    </View>

                                )}


                            </Card>
                        </View>
                    </View>
                    <View style={style.cardContent}>
                        <Card>
                            {loading ? (
                                <CardLoader />
                            ) : (
                                <View>
                                    <View style={style.cardRow}>
                                        <View style={style.leftDetails}>
                                            <CardIcon  width={wp('8%')} height={hp('6.5%')}/>


                                            <Text style={[globalStyle.boldBlackText, { marginHorizontal: wp('1%') }]}>PG</Text>
                                        </View>
                                        <View>
                                            <Text style={globalStyle.mediumText}>
                                                ₹{totalPGAmount ?? 0}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={style.cardRow}>
                                        <View style={style.leftDetails}>
                                            <UpiIcon  width={wp('8%')} height={hp('6.5%')}/>

                                            <Text style={[globalStyle.boldBlackText, { marginHorizontal: wp('1%') }]}>UPI</Text>
                                        </View>
                                        <View>
                                            <Text style={globalStyle.mediumText}>
                                                ₹{totalUPIAmount ?? 0}
                                            </Text>
                                        </View>
                                    </View>
                                    
                                </View>
                            )}
                        </Card>

                    </View>

                </View>

            </ScrollView>

            <Footer active={'settlement_report'} navigation={navigation} />
        </View>
    );
};
export default SettlementReport;