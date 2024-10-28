import React, { useContext, useState } from 'react';
import { StyleContext } from '../../GlobalStyleProvider';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DateHeader from '../../Core_ui/DateHeader';
import Card from '../../Core_ui/Card';
import { BankIcon, RightArrow, StatIcon, UpiIcon,DropDownIcon } from '../../SvgIcons';
import Footer from '../Footer';
import * as Animatable from 'react-native-animatable';
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
        marginVertical: hp('5%')

    },
    nestedElement: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        marginTop: hp('2%')
    }


});

function Transactions(props) {
    const globalStyle = useContext(StyleContext);
    const [toggleIndex, setToggleIndex] = useState(-1)
    const [toggle, setToggle] = useState(false)

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

    const cards = [
        {
            name: 'Settlement report',
            amount: '$100',
            transactions: '0',
            cardDetails: <CardElement cardDetails={[
                {
                    heading: 'SEttle report',
                    amount: '$100'
                }
            ]} />

        },
        {
            name: 'Temp report',
            amount: '$1000',
            transactions: '0',
            cardDetails: <CardElement cardDetails={[
                {
                    heading: 'Tempr report',
                    amount: '$100'
                }
            ]} />

        }
    ]
    const toggleExpand = (index) => {
        setToggleIndex(index)
        setToggle(!toggle)

    }
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
                                <StatIcon fill={'#1A4163'} />
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
                        {cards && cards.map((value, index) => (

                            <Card customStyle={style.cardCustomStyle} key={index}>
                                <TouchableOpacity onPress={() => { toggleExpand(index) }}>
                                    <View style={style.settlementContainer}>
                                        <View>
                                            <View style={style.settlementHeader}>
                                                <Text style={[globalStyle.boldTextBlack, { textAlign: 'center' }]}>Settlement amount</Text>
                                            </View>
                                            <View style={style.settlement}>
                                                <UpiIcon />
                                                <Text style={[globalStyle.boldTextBlack, { textAlign: 'center' }]}>₹ 1000.00 </Text>
                                                {(toggleIndex == index && toggle)?
                                                (
                                                <DropDownIcon />

                                                ):(
                                                <RightArrow fill={"#1286ED"} />
                                                )

                                                }

                                            </View>
                                            <View style={style.settlementHeader}>
                                                <Text style={[globalStyle.boldTextBlack, { textAlign: 'center' }]}>0 Transactions</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                {toggleIndex == index && toggle && (

                                    <Animatable.View animation="fadeInDown" duration={300}>
                                        <View>
                                            {value?.cardDetails && value?.cardDetails}
                                        </View>
                                    </Animatable.View>

                                )

                                }

                            </Card>
                        ))

                        }

                    </View>
                </View>
            </ScrollView>
            <Footer active={'home'} />
        </View>
    );
}

export default Transactions;
