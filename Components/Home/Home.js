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
    const globalStyle = useContext(StyleContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }, []);

    return (
        <View style={style.home}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={[globalStyle.background, { flex: 1 }]}>
                    <View style={style.homeContainer}>
                        <View style={{ margin: hp('2%') }}>
                            <DateHeader />
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
            <Footer active={'home'} />
        </View>
    );
};

export default Home;
