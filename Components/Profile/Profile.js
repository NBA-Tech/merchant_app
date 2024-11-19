import React, { useContext, useState } from 'react';
import { StyleContext } from '../../GlobalStyleProvider';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DateHeader from '../../Core_ui/DateHeader';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Card from '../../Core_ui/Card'
import { DeviceDetailsIcon, HelpIcon, LogoutIcon, RightArrow, SettingsIcon, StaffIcon } from '../../SvgIcons';
import Footer from '../Footer';
const style = StyleSheet.create({
    profilePage: {
        backgroundColor: "#ffffff",
        flex: 1,

    },
    homeContainer: {
        flexDirection: 'column',
        flex: 1
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
        marginTop: hp('10%')
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
        marginTop: hp('2%'),
        marginHorizontal: wp('5%'),
        height: hp('60%'), // Ensure the section is scrollable with a fixed height
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

            <View style={[globalStyle.backgroundWhite]}>

                <View style={style.homeContainer}>

                    <View style={style.headerBg}>
                        <DateHeader isBackHeader={true} navHeading={'Profile'} customStyle={{ marginLeft: hp('5%') }} navigation={navigation} isDate={false} />
                        <View style={style.profilePic}>
                            <Image source={require('../../assets/images/profile.png')} />
                            <Text style={globalStyle.mediumText}>Ray John</Text>
                            <View style={style.detailsContainer}>
                                <Text style={globalStyle.mediumText}>
                                    +91 8647614545
                                </Text>
                                <Text style={style.separateBar}>
                                    |
                                </Text>
                                <Text style={globalStyle.mediumText}>
                                    example@gmail.com
                                </Text>
                            </View>

                        </View>
                        <View style={style.cardSubDetails}>
                            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                <View>
                                    <Card customStyle={style.cardContent}>
                                        <View style={style.leftDetails}>
                                            <DeviceDetailsIcon />
                                            <Text style={[globalStyle.mediumText, { marginHorizontal: wp('3%') }]}>Device Details</Text>
                                        </View>
                                        <View>
                                            <RightArrow fill={'#002D57'} />
                                        </View>
                                    </Card>
                                </View>
                                <View>
                                    <Card customStyle={style.cardContent}>
                                        <View style={style.leftDetails}>
                                            <StaffIcon />
                                            <Text style={[globalStyle.mediumText, { marginHorizontal: wp('3%') }]}>Add Staff</Text>
                                        </View>
                                        <View>
                                            <RightArrow fill={'#002D57'} />
                                        </View>
                                    </Card>
                                </View>
                                <View>
                                    <Card customStyle={style.cardContent}>
                                        <View style={style.leftDetails}>
                                            <SettingsIcon />
                                            <Text style={[globalStyle.mediumText, { marginHorizontal: wp('3%') }]}>Settings</Text>
                                        </View>
                                        <View>
                                            <RightArrow fill={'#002D57'} />
                                        </View>
                                    </Card>
                                </View>
                                <View>
                                    <Card customStyle={style.cardContent}>
                                        <View style={style.leftDetails}>
                                            <HelpIcon />
                                            <Text style={[globalStyle.mediumText, { marginHorizontal: wp('3%') }]}>Help & Support</Text>
                                        </View>
                                        <View>
                                            <RightArrow fill={'#002D57'} />
                                        </View>
                                    </Card>
                                </View>
                                <View>
                                    <Card customStyle={style.cardContent}>
                                        <View style={style.leftDetails}>
                                            <LogoutIcon />
                                            <Text style={[globalStyle.mediumText, { marginHorizontal: wp('3%') }]}>Logout</Text>
                                        </View>
                                        <View>
                                            <RightArrow fill={'#002D57'} />
                                        </View>
                                    </Card>
                                </View>

                                
                            </ScrollView>


                        </View>
                    </View>

                </View>

            </View>
            <Footer active='profile' navigation={navigation} />


        </SafeAreaView>
    );
};

export default Profile;