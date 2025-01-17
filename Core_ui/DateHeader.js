import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StyleContext } from '../GlobalStyleProvider';
import { LeftArrow, RightArrow, BackIcon } from '../SvgIcons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../Config';
import { DataContext } from '../DataContext';
import { useRoute } from '@react-navigation/native';

const style = StyleSheet.create({
    dateContainer: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical: hp('2%'),
     

    },
    date: {
        textAlign: 'center',
        flex: 1,
        alignItems: 'center'
    },
    navContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
})
const DateHeader = ({ date, dateOnClick, leftOnClick, rightOnClick, navHeading, customStyle, isBackHeader = false, navigation, isDate = true }) => {
    const route = useRoute();
    const { transDate, setTransDate } = useContext(DataContext)

    const globalStyle = useContext(StyleContext);
    const [merchantData, setMerchantData] = useState()
    const [blurArrow,setBlurArrow]=useState(false)


    const getMerchantData = async () => {
        let merchant_session = await AsyncStorage.getItem('merchant_status_data')
        merchant_session = JSON.parse(merchant_session)

        let payload = {
            merchantId: merchant_session?.id,
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
        setMerchantData(merchant_basic_info_response)

    }

    const handleLeftClick = () => {
        const date = new Date(transDate);
        date.setDate(date.getDate() - 1);
        setTransDate(date)

    }

    const handleRightClick = () => {
        const currentDate = new Date();

        // Check if the transDate is the same as the current date (ignoring the time)
        if (transDate.toDateString() !== currentDate.toDateString()) {
            const date = new Date(transDate);
            date.setDate(date.getDate() + 1); // Move to the next day
            setTransDate(date);
            

        }
    };

    useEffect(() => {
        if (!isBackHeader) {
            getMerchantData()

        }

    }, [])
    useEffect(()=>{
        const date=new Date(transDate)
        const currentDate = new Date();

        if(date.toDateString() == currentDate.toDateString()){
            setBlurArrow(true)

        }
        else{
            setBlurArrow(false)
        }

    },[transDate])
    return (
        <View>
            {!isBackHeader ? (
                <View>
                    <View style={style.headerContainer}>
                        <Text style={[globalStyle.headingText, { fontSize: 15 }]}>{merchantData?.obj?.bName ?? 'Loading...'}</Text>
                        <Text style={globalStyle.boldText}>{merchantData?.obj?.name ?? 'Loading...'}</Text>
                    </View>
                </View>
            ) :
                (
                    <View style={[style.navContainer, customStyle]}>
                        <TouchableOpacity onPress={() => { navigation.goBack()}}>
                            <BackIcon size={hp('4.2%')} />
                        </TouchableOpacity>
                        <Text style={[globalStyle.headingText, { color: '#ffffff', marginBottom: 10, marginHorizontal: 10 }]}>{navHeading}</Text>

                    </View>

                )

            }

            {isDate && (
                <View style={style.dateContainer}>
                    <View>
                        <TouchableOpacity onPress={handleLeftClick}>
                            <LeftArrow fill={"#FFFFFF"} width={wp('6%')} height={hp('6.5%')} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={dateOnClick}>
                            <Text style={[globalStyle.headingText, style.date]}>{date}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={handleRightClick} disabled={blurArrow?true:false}>
                            <RightArrow fill={blurArrow?"#808080":"#FFFFFF"} width={wp('6%')} height={hp('6.5%')} />
                        </TouchableOpacity>
                    </View>

                </View>

            )

            }


        </View>





    );
};

export default DateHeader;