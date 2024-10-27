import React, { useContext } from 'react';
import { StyleContext } from '../../GlobalStyleProvider';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DateHeader from '../../Core_ui/DateHeader';
import Card from '../../Core_ui/Card';
import { BankIcon, RightArrow,StatIcon,UpiIcon } from '../../SvgIcons';
import Footer from '../Footer';
import TransactionCard from './TransactionCard';
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
        flex: 1,
        alignSelf: 'center',
    },
    footerContainer: {
        justifyContent: 'flex-end',
        backgroundColor: '#F9F9F9',
        elevation: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    
    
});

function Transactions(props) {
    const globalStyle = useContext(StyleContext);
    return (
        <View style={style.home}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={[globalStyle.background, { flex: 1 }]}>
                    <View style={style.homeContainer}>
                        <DateHeader />
                        <Card
                            hasBackground={true}
                            backgroundImage={require('../../assets/images/credit_bg.png')}
                            customStyle={style.cardContainer}
                        >
                            <View style={style.iconContainer}>
                                <StatIcon fill={'#1A4163'}/>
                                <RightArrow />
                            </View>
                            <View style={style.bodyContainer}>
                                <Text style={[globalStyle.headingText, { color: '#FFFFFFD9', fontSize: 18 }]}>
                                    Successful Transactions worth
                                </Text>
                                <Text style={[globalStyle.headingText, { color: '#FFFFFFD9', fontSize: 18 }]}>
                                    ₹ 1000.00
                                </Text>
                                <Text style={[globalStyle.headingText, { color: '#FFFFFFD9', fontSize: 18 }]}>
                                    10 Transactions
                                </Text>
                            </View>
                        </Card>
                    </View>

                    <View style={style.transbodyContainer}>
                        <TransactionCard>
                        <Card customStyle={style.cardCustomStyle}>
                            <View style={style.settlementContainer}>
                                <View>
                                    <View style={style.settlementHeader}>
                                        <Text style={[globalStyle.boldTextBlack, { textAlign: 'center' }]}>Settlement amount</Text>
                                    </View>
                                    <View style={style.settlement}>
                                        <UpiIcon />
                                        <Text style={[globalStyle.boldTextBlack, { textAlign: 'center' }]}>₹ 1000.00 </Text>
                                        <RightArrow fill={"#1286ED"} />
                                    </View>
                                    <View style={style.settlementHeader}>
                                        <Text style={[globalStyle.boldTextBlack, { textAlign: 'center' }]}>0 Transactions</Text>
                                    </View>
                                </View>
                            </View>
                        </Card>
                        </TransactionCard>
                    </View>
                </View>
            </ScrollView>
            <Footer active={'home'} />
        </View>
    );
}

export default Transactions;
