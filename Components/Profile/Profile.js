import React, { useContext, useState } from 'react';
import { StyleContext } from '../../GlobalStyleProvider';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DateHeader from '../../Core_ui/DateHeader';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Card from '../../Core_ui/Card'
import {DeviceDetailsIcon, HelpIcon, LogoutIcon, RightArrow, SettingsIcon, StaffIcon } from '../../SvgIcons';
import Footer from '../Footer';
const style = StyleSheet.create({
    profilePage: {
        backgroundColor: "#ffffff",
        flex: 1,

    },
    homeContainer: {
        flexDirection: 'column',
    },
    headerBg: {
        backgroundColor: '#073761',
        height: hp('20%'),
        borderBottomLeftRadius: 300,
        borderBottomRightRadius: 300,
        position: 'absolute',
        right: '-10%',
        left: '-10%',


    },
    profilePic: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:hp('10%')
    },
    profileName: {
        color: '#000000',
        fontSize: 18,
        fontWeight: '500'
    },
    userDetails: {
        color: '#000000',
        fontSize: 13,
        fontWeight: '400'

    },
    detailsContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: wp('2%'),
    },
    separateBar: {
        color: '#000000',
        paddingHorizontal: wp('2%'),
    },
    cardDetails: {
        color: '#323232',
        fontSize: 14,
        fontWeight: '500',
        paddingHorizontal: wp('2%'),

    },
    cardSubDetails: {
        alignItems: 'center',
    },
    leftDetails: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: wp('2%'),



    },
    cardContent: {
        flexDirection: 'row',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'space-between'

    }


})

const Profile = (props) => {
    const { navigation } = props
    const globalStyle = useContext(StyleContext);
    return (
        <SafeAreaView style={style.profilePage}>

            <View style={[globalStyle.backgroundWhite, { flex: 1 }]}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                    <View style={style.homeContainer}>

                        <View style={style.headerBg}>
                            <DateHeader isBackHeader={true} navHeading={'Profile'} customStyle={{ marginLeft: hp('5%') }} navigation={navigation} isDate={false}/>
                            <View style={style.profilePic}>
                                <Image source={require('../../assets/images/profile.png')} />
                                <Text style={style.profileName}>Ray John</Text>
                                <View style={style.detailsContainer}>
                                    <Text style={style.userDetails}>
                                        +91 8647614545
                                    </Text>
                                    <Text style={style.separateBar}>
                                        |
                                    </Text>
                                    <Text style={style.userDetails}>
                                        example@gmail.com
                                    </Text>
                                </View>

                            </View>
                            <View style={style.cardSubDetails}>
                                <View>
                                    <Card customStyle={style.cardContent}>
                                        <View style={style.leftDetails}>
                                            <DeviceDetailsIcon/>
                                            <Text style={style.cardDetails}>Device Details</Text>
                                        </View>
                                        <View>
                                            <RightArrow fill={'#002D57'} />
                                        </View>
                                    </Card>
                                </View>
                                <View>
                                    <Card customStyle={style.cardContent}>
                                        <View style={style.leftDetails}>
                                            <StaffIcon/>
                                            <Text style={style.cardDetails}>Add Staff</Text>
                                        </View>
                                        <View>
                                            <RightArrow fill={'#002D57'} />
                                        </View>
                                    </Card>
                                </View>
                                <View>
                                    <Card customStyle={style.cardContent}>
                                        <View style={style.leftDetails}>
                                            <SettingsIcon/>
                                            <Text style={style.cardDetails}>Settings</Text>
                                        </View>
                                        <View>
                                            <RightArrow fill={'#002D57'} />
                                        </View>
                                    </Card>
                                </View>
                                <View>
                                    <Card customStyle={style.cardContent}>
                                        <View style={style.leftDetails}>
                                            <HelpIcon/>
                                            <Text style={style.cardDetails}>Help & Support</Text>
                                        </View>
                                        <View>
                                            <RightArrow fill={'#002D57'} />
                                        </View>
                                    </Card>
                                </View>
                                <View>
                                    <Card customStyle={style.cardContent}>
                                        <View style={style.leftDetails}>
                                            <LogoutIcon/>
                                            <Text style={style.cardDetails}>Logout</Text>
                                        </View>
                                        <View>
                                            <RightArrow fill={'#002D57'} />
                                        </View>
                                    </Card>
                                </View>
                              

                            </View>
                        </View>

                    </View>
                </ScrollView>

            </View>
            <Footer active='profile' navigation={navigation}/>


        </SafeAreaView>
    );
};

export default Profile;