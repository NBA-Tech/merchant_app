
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import { StyleContext } from '../../GlobalStyleProvider';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Card from '../../Core_ui/Card';
import DateHeader from '../../Core_ui/DateHeader';
import Footer from '../Footer';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';
import { BankIcon, CardIcon, RightArrow, UpiIcon } from '../../SvgIcons';
import Button from '../../Core_ui/Button';
import { FormatDate, getMerchantSession } from '../../HelperFunctions';
import { DataContext } from '../../DataContext';
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
        justifyContent:'center',


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
        fontSize: 18,
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



})
function SettlementReport(props) {
    const { navigation } = props
    const globalStyle = useContext(StyleContext);
    const { transDate, setTransDate } = useContext(DataContext);
    const [merchantSessionData, setMerchentSessionData] = useState();
    const [dateModal, setDateModal] = useState(false);
    const [loading, setLoading] = useState(false)



    const toggleDateModal = () => {
        setDateModal(!dateModal)
    }
    useEffect(() => {
        const getSession = async () => {
            setMerchentSessionData(await getMerchantSession())

        }
        getSession()


    }, [])

    useEffect(() => {
        const adjustDatesAndFetchData = async () => {
            setDateModal(false)
            setLoading(true);

            // Create startOfDay and endOfDay in UTC
            const startOfDay = new Date(Date.UTC(transDate.getFullYear(), transDate.getMonth(), transDate.getDate(), 0, 0, 0, 0));
            const endOfDay = new Date(Date.UTC(transDate.getFullYear(), transDate.getMonth(), transDate.getDate(), 23, 59, 59, 999));

            // await get_transaction_data(startOfDay.toISOString(), endOfDay.toISOString());


        };

        adjustDatesAndFetchData();
    }, [transDate, merchantSessionData]);

    return (
        <View style={style.home}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={[globalStyle.background, { flex: 1 }]}>
                    <View style={style.homeContainer}>
                        <View style={{ margin: hp('2%') }}>
                            <DateHeader date={FormatDate(transDate)} dateOnClick={toggleDateModal}  isBackHeader={true} navHeading={'Settlements'}  navigation={navigation}/>
                            <Card hasBackground={true}
                                backgroundImage={require('../../assets/images/credit_bg.png')}  >
                                <View style={style.cardRow}>
                                    <Text style={globalStyle.headingText}>
                                        Total: ₹1000
                                    </Text>
                                    <RightArrow fill={'#002D57'} />
                                </View>

                            </Card>
                        </View>
                    </View>
                    <View style={style.cardContent}>
                        <Card>
                            <View style={style.cardRow}>
                                <View style={style.leftDetails}>
                                    <CardIcon />


                                    <Text style={[globalStyle.boldBlackText,{marginHorizontal:wp('1%')}]}>Card</Text>
                                </View>
                                <View>
                                    <Text style={globalStyle.mediumText}>
                                    ₹500
                                    </Text>
                                </View>
                            </View>

                            <View style={style.cardRow}>
                                <View style={style.leftDetails}>
                                    <UpiIcon/>

                                    <Text style={[globalStyle.boldBlackText,{marginHorizontal:wp('1%')}]}>UPI</Text>
                                </View>
                                <View>
                                    <Text style={globalStyle.mediumText}>
                                    ₹500
                                    </Text>
                                </View>
                            </View>
                            <View style={style.cardRow}>
                                <View style={style.leftDetails}>
                                    <BankIcon/>

                                    <Text style={[globalStyle.boldBlackText,{marginHorizontal:wp('1%')}]}>Net Banking</Text>
                                </View>
                                <View>
                                    <Text style={globalStyle.mediumText}>
                                    ₹0
                                    </Text>
                                </View>
                            </View>
                        </Card>

                    </View>

                </View>

                <View>
                    <Button customeStyleContainer={style.buttonContainer}
                        customeStyleButton={style.button}>
                        <Text style={style.download}>Download</Text>
                    </Button>
                </View>
            </ScrollView>

            <Footer active={'settlement_report'} navigation={navigation} />
        </View>
    );
};
export default SettlementReport;