import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
import { FormatDate, getMerchantSession } from '../../HelperFunctions';
import { Dropdown } from 'react-native-element-dropdown';


const style = StyleSheet.create({
    reportPage: {
        backgroundColor: "#ffffff",
        flex: 1,
    },
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
        flexDirection: 'column'
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: hp('3%')
    },
    dropdown: {
        height: 40,
        borderRadius: 8,
        paddingHorizontal: 8,
        color: '#000000',
        width: wp('40%')
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
        flex: 1,
        alignSelf: 'center',
    },
    infoContainer: {
        flexDirection: 'column',
    },
    logoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        marginRight: wp('8%')

    },
    rightContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex:1,
        alignItems:'center'

    }

})

const Reports = (props) => {
    const { navigation } = props
    const globalStyle = useContext(StyleContext);
    const { transDate, setTransDate } = useContext(DataContext)
    const [loading, setLoading] = useState(false);
    const [merchantSessionData, setMerchentSessionData] = useState()
    const [dateModal, setDateModal] = useState(false)
    const [transAmount, setTransAmount] = useState(0)
    const [totalTrans, setTotalTrans] = useState(0)
    const [isStatusFocus, setIsStatusFocus] = useState(false)
    const [currStatus, setCurrStatus] = useState(false)
    const [currPaymentMethod, setCurrentPaymentMethod] = useState(false)
    const [isPaymentFocus, setPaymentFocus] = useState(false)
    const status = [
        { label: 'SUCCESS', value: 'success' },
        { label: 'PENDING', value: 'pending' },
        { label: 'FAILED', value: 'failed' },
    ];
    const paymentMethods = [
        { label: 'UPI', value: 'upi' },
        { label: 'PG', value: 'pg' }
    ]

    const toggleDateModal = () => {
        setDateModal(!dateModal)
    }
    const getTransactionDetails=(trans_type,)=>{

    }
    return (
        <View style={style.reportPage}>
            <View style={{ flexGrow: 1 }}>
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
                                        <Text style={[globalStyle.headingText, { color: '#FFFFFFD9', fontSize: 18 }]}>Successful Transactions worth </Text>
                                        <Text style={[globalStyle.headingText, { color: '#FFFFFFD9', fontSize: 18 }]}>₹ {transAmount} </Text>
                                        <Text style={[globalStyle.headingText, { color: '#FFFFFFD9', fontSize: 18 }]}>{totalTrans} Transactions</Text>
                                    </View>
                                )}
                            </Card>
                        </View>
                    </View>

                    <View style={style.homeBodyContainer}>
                        <View style={style.filterContainer}>
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

                                <Dropdown
                                    style={[
                                        style.dropdown,
                                        isPaymentFocus && { borderColor: 'blue' },
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
                                    placeholder={!isPaymentFocus ? 'Payment Method' : '...'}
                                    onFocus={() => setPaymentFocus(true)}
                                    onBlur={() => setPaymentFocus(false)}
                                    data={paymentMethods}
                                    value={currPaymentMethod}
                                    onChange={(item) => setCurrentPaymentMethod(item?.value)}

                                />

                            </View>

                        </View>
                         <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                        <View style={style.transactionContainer}>

                            <Card customStyle={style.cardCustomStyle} >
                                <TouchableOpacity>
                                    <View style={style.settlementContainer}>
                                        {loading ? (
                                            <CardLoader />
                                        ) : (
                                            <View style={style.cardData}>
                                                <View style={style.logoContainer}>
                                                    <BankIcon />


                                                </View>
                                                <View style={style.infoContainer}>
                                                    <Text style={[globalStyle.boldTextBlack, { textAlign: 'center' }]}>0 Transactions</Text>
                                                    <Text style={[globalStyle.blackSubText, { textAlign: 'center' }]}>0 Transactions</Text>
                                                    <Text style={[globalStyle.blackSubText, { textAlign: 'center' }]}>0 Transactions</Text>
                                                </View>

                                                <View style={style.rightContainer}>
                                                    <RightArrow fill={"#1286ED"} />

                                                </View>

                                            </View>

                                        )

                                        }

                                    </View>
                                </TouchableOpacity>

                            </Card>
                            



                        </View>
                        </ScrollView>

                    </View>



                </View>

            </View>
            <Footer active={'transfer'} navigation={navigation} />
        </View>
    );
};

export default Reports;