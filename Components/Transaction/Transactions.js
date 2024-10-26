import React, { useContext } from 'react';
import { StyleContext } from '../../GlobalStyleProvider';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DateHeader from '../../Core_ui/DateHeader';
import Card from '../../Core_ui/Card';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';

const style = StyleSheet.create({
    homeContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: hp('2%')
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

})
function Transactions(props) {
    const globalStyle = useContext(StyleContext);
    return (
        <ScrollView style={[globalStyle.background, { flex: 1 }]}>
            <View style={style.homeContainer}>
                <DateHeader />
                <Card
                    hasBackground={true}
                    backgroundImage={require('../../assets/images/credit_bg.png')}
                    customStyle={style.cardContainer}
                >
                    <View style={style.bodyContainer}>
                        <Text style={[globalStyle.headingText, { color: '#FFFFFFD9', fontSize: 18 }]}>Successful Transactions worth </Text>
                        <Text style={[globalStyle.headingText, { color: '#FFFFFFD9', fontSize: 18 }]}>₹ 1000.00 </Text>
                        <Text style={[globalStyle.headingText, { color: '#FFFFFFD9', fontSize: 18 }]}>10 Transactions</Text>
                    </View>

                </Card>

                <Card>
                        <View style={style.settlementContainer}>
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
                        </View>

                    </Card>

            </View>
        </ScrollView>
    );
}

export default Transactions;