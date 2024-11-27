import React, { useContext, useEffect, useState } from 'react';
import { StyleContext } from '../../GlobalStyleProvider';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image, SafeAreaView, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DateHeader from '../../Core_ui/DateHeader';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Card from '../../Core_ui/Card'
import { DeviceDetailsIcon, HelpIcon, LogoutIcon, ProfileUserIcon, QrIcon, RightArrow, SettingsIcon, StaffIcon } from '../../SvgIcons';
import Footer from '../Footer';
import { getMerchantSession } from '../../HelperFunctions';
import { BASE_URL } from '../../Config';
import { AuthContext } from '../../AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider, useAuth } from '../../AuthProvider';
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
        justifyContent: 'space-between',
        paddingVertical:hp('2.3%'),
        marginVertical:hp('0.7%')

    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalText: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Regular',
        color: "#0C1421"
    },


})

const Profile = (props) => {
    const { navigation } = props
    const globalStyle = useContext(StyleContext);
    const [myQr, setMyQr] = useState()
    const [merchantSessionData, setMerchentSessionData] = useState()
    const [isQrModal, setIsQrModal] = useState(false)
    const [userData, setUserData] = useState(undefined)
    const { isAuthenticated, setIsAuthenticated } = useAuth()


    const getUserQr = async () => {
        if (merchantSessionData) {
            const get_qr_api = await fetch(`${BASE_URL}/app/createQR`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    merchantId: merchantSessionData?.id,
                    profile: true
                })
            })
            const get_qr_api_res = await get_qr_api.json()
            if (get_qr_api_res?.sttusCode == 200) {
                setMyQr(get_qr_api_res?.obj)
            }

        }
    }

    const getUserData = async () => {
        let payload = {
            merchantId: merchantSessionData?.id,
            status: "ACTIVE"
        }

        const merchant_basic_info_api = await fetch(`${BASE_URL}/app/merchant/getMerchantData`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const merchant_basic_info_response = await merchant_basic_info_api.json()
        if (merchant_basic_info_response?.statusCode == 200) {
            setUserData(merchant_basic_info_response?.obj)
        }


    }
    const handleLogout=async ()=>{
        
        await AsyncStorage.removeItem('merchant_status_data');
        setIsAuthenticated(false)
        navigation.navigate('login')

    }

    useEffect(() => {
        (async () => {
            await getUserQr()
            await getUserData()
        })()

    }, [merchantSessionData])

    useEffect(() => {
        const getSession = async () => {
            setMerchentSessionData(await getMerchantSession())

        }
        getSession()


    }, [])
    return (
        <SafeAreaView style={style.profilePage}>

            <View style={[globalStyle.backgroundWhite]}>

                <Modal
                    visible={isQrModal}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => { setIsQrModal(false) }}
                >
                    <TouchableWithoutFeedback onPress={() => { setIsQrModal(false) }}>
                        <View style={style.centeredView}>
                            <View style={style.modalView}>
                                <Text style={[globalStyle.boldTextBlack,{fontSize:wp('5%')}]}>{userData?.name ?? 'Loading...'}</Text>
                                <Text style={[globalStyle.boldTextBlack,{fontSize:wp('5%')}]}>{userData?.bName ?? 'Loading...'}</Text>
                                <Image
                                    source={require('../../assets/images/logo.png')}
                                    style={{ width: wp('80%'), height: hp('10%') }}
                                />
                                <Image
                                    source={{ uri: `data:image/png;base64,${myQr}` }}
                                    style={{ width: wp('80%'), height: hp('40%') }}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>


                <View style={style.homeContainer}>

                    <View style={style.headerBg}>
                        <DateHeader isBackHeader={true} navHeading={'Profile'} customStyle={{ marginLeft: hp('5%') }} navigation={navigation} isDate={false} />
                        <View style={style.profilePic}>
                            <ProfileUserIcon/>
                            <Text style={globalStyle.mediumText}>{userData?.bName ?? 'Loading...'}</Text>
                            <View style={style.detailsContainer}>
                                <Text style={[globalStyle.mediumText,{fontSize:wp('4%')}]}>
                                    {userData?.name ?? 'Loading...'}
                                </Text>
                                <Text style={style.separateBar}>
                                    |
                                </Text>
                                <Text style={[globalStyle.mediumText,{fontSize:wp('4%')}]}>
                                    {userData?.email ?? 'Loading...'}
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
                                    <Card customStyle={style.cardContent} onClick={() => { setIsQrModal(!isQrModal) }}>
                                        <View style={style.leftDetails}>
                                            <QrIcon fill='#1286ED' />
                                            <Text style={[globalStyle.mediumText, { marginHorizontal: wp('3%') }]}>My QR</Text>
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
                                    <Card customStyle={style.cardContent} onClick={handleLogout}>
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