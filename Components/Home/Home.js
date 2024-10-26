import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StyleContext } from '../../GlobalStyleProvider';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { LeftArrow, RightArrow } from '../../SvgIcons';
import Card from '../../Core_ui/Card';
import { StatIcon, RightArrowWhite, BankIcon, DownloadIcon } from '../../SvgIcons';
import CardLoader from '../../Core_ui/CardLoader';
import Button from '../../Core_ui/Button';
const style = StyleSheet.create({
    homeContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: hp('2%')
    },
    dateContainer: {
        flexDirection: 'row',
        marginVertical: hp('2%'),
        justifyContent: 'space-between'
    },
    date: {
        textAlign: 'center',
        flex: 1,
        alignItems: 'center'
    },
    iconContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('15%')

    },
    cardContainer: {
        flexDirection: 'column',
        padding: hp('3%')
    },
    bodyContainer: {
        flexDirection: 'column',
        marginBottom: hp('2%')
    },
    settlementContainer: {
        flexDirection: 'column'
    },
    settlement: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical:hp('1%')

    },
    reportContainer: {
        flexDirection: 'column'
    },
    reportData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical:hp('1%')
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
    }

});

const Home = (props) => {
    const globalStyle = useContext(StyleContext);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 5000);
    })

    return (
        <View style={globalStyle.background}>
            <View style={style.homeContainer}>
                <View style={style.headerContainer}>
                    <Text style={globalStyle.headingText}>Merchant name</Text>
                    <Text style={globalStyle.boldText}>Login name</Text>
                </View>

                <View style={style.dateContainer}>
                    <TouchableOpacity>
                        <LeftArrow />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={[globalStyle.headingText, style.date]}>Today, 10 Oct, 2024</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <RightArrow fill={"#1D3039"} width={"36"} height={"34"} />
                    </TouchableOpacity>
                </View>

                <View>

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
                                <Text style={[globalStyle.headingText, { color: '#FFFFFFD9', fontSize: 18 }]}>₹ 1000.00 </Text>
                                <Text style={[globalStyle.headingText, { color: '#FFFFFFD9', fontSize: 18 }]}>10 Transactions</Text>
                            </View>

                        )

                        }


                    </Card>

                    <Card>
                        <View style={style.settlementContainer}>
                            {loading ? (
                                <CardLoader />

                            ) : (
                                <View>
                                    <View style={style.settlementHeader}>
                                        <Text style={[globalStyle.boldText, { textAlign: 'center' }]}>Settlement amount</Text>

                                    </View>
                                    <View style={style.settlement}>
                                        <BankIcon />
                                        <Text style={[globalStyle.boldText, { textAlign: 'center' }]}>₹ 1000.00 </Text>
                                        <RightArrow fill={"#1286ED"} />

                                    </View>
                                    <View style={style.settlementHeader}>
                                        <Text style={[globalStyle.boldText, { textAlign: 'center' }]}>0 Transactions</Text>

                                    </View>
                                </View>
                            )

                            }


                        </View>

                    </Card>

                    <Card>
                        <View style={style.settlementContainer}>
                            {loading ? (
                                <CardLoader />

                            ) : (
                                <View>
                                    <View style={style.reportContainer}>
                                        <View style={style.reportData}>
                                            <Text style={[globalStyle.boldText, { textAlign: 'flex-start' }]}>Reports</Text>
                                        </View>

                                        <View style={style.reportData}>
                                            <Text style={[globalStyle.boldText, { textAlign: 'flex-start' }]}>Download Monthly Reports</Text>
                                            <RightArrow fill={"#1286ED"} />
                                        </View>

                                        <View style={style.reportData}>
                                            <Button
                                                customeStyleContainer={style.buttonContainer}
                                                customeStyleButton={style.button}
                                            >
                                                <View style={style.reportData}>
                                                    <DownloadIcon />
                                                    <Text style={[globalStyle.boldText, { textAlign: 'flex-start' }]}>Transaction</Text>



                                                </View>
                                            </Button>
                                            <Button
                                                customeStyleContainer={style.buttonContainer}
                                                customeStyleButton={style.button}
                                            >
                                                <View style={style.reportData}>
                                                    <DownloadIcon />
                                                    <Text style={[globalStyle.boldText, { textAlign: 'flex-start' }]}>Settlement</Text>



                                                </View>
                                            </Button>
                                        </View>


                                    </View>

                                </View>
                            )

                            }


                        </View>

                    </Card>


                </View>


            </View>
        </View>
    );
};

export default Home;
