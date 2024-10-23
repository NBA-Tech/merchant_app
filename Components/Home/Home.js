import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StyleContext } from '../../GlobalStyleProvider';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { LeftArrow, RightArrow } from '../../SvgIcons';
import Card from '../../Core_ui/Card';

const style = StyleSheet.create({
    homeContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: hp('2%')
    },
    dateContainer: {
        flexDirection: 'row',
        marginVertical: hp('5%'),
        justifyContent:'space-between'
    },
    date: {
        textAlign: 'center',
        flex: 1,
        alignItems:'center'
    }
})

const Home = (props) => {
    const globalStyle = useContext(StyleContext);
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
                        <RightArrow />
                    </TouchableOpacity>

                </View>
                

            </View>
        </View>


    );
};

export default Home;