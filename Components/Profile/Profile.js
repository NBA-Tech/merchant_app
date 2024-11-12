import React, { useContext, useState } from 'react';
import { StyleContext } from '../../GlobalStyleProvider';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DateHeader from '../../Core_ui/DateHeader';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

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
        borderBottomLeftRadius: wp('30%'),
        borderBottomRightRadius: wp('30%')
    }

})

const Profile = (props) => {
    const { navigation } = props
    const globalStyle = useContext(StyleContext);
    return (
        <View style={style.profilePage}>
            <View style={{ flexGrow: 1 }}>

                <View style={[globalStyle.backgroundWhite, { flex: 1 }]}>
                    <View style={style.homeContainer}>

                        <View style={style.headerBg}>
                            <DateHeader isBackHeader={true} navHeading={'Profile'} customStyle={{ margin: wp('5%') }} />
                            <View style={style.profilePic}>
                                <Image source={require('../../assets/images/profile.png')} />

                            </View>

                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Profile;