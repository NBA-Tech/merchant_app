import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StyleContext } from '../../GlobalStyleProvider';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { LeftArrow, RightArrow } from '../../SvgIcons';
import Card from '../../Core_ui/Card';
import { StatIcon, RightArrowWhite } from '../../SvgIcons';
import { BulletList } from 'react-content-loader'
import { Circle, Rect } from 'react-native-svg';
import CardLoader from '../../Core_ui/CardLoader';
const style = StyleSheet.create({
    homeContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: hp('2%')
    },
    dateContainer: {
        flexDirection: 'row',
        marginVertical: hp('5%'),
        justifyContent: 'space-between'
    },
    date: {
        textAlign: 'center',
        flex: 1,
        alignItems: 'center'
    },
    iconContainer:{
        flexDirection:'row',
        flex:1,
        justifyContent:'space-between',
        alignItems:'center'

    },
    cardContainer:{
        flexDirection:'column',
        padding:hp('3%')
    },
    bodyContainer:{
        flexDirection:'column',
        marginTop:hp('15%'),
        marginBottom:hp('2%')
    }
  
});

const Home = (props) => {
    const globalStyle = useContext(StyleContext);
    const [loading,setLoading]=useState(true)
    const MyBulletListLoader = () => (
        <ContentLoader
            speed={1}
            width="100%"
            height={100}
            backgroundColor="#ddd"
            foregroundColor="#ecebeb"
        >
            <Rect x="0" y="10" rx="5" ry="5" width="90%" height="10" />
            <Rect x="0" y="30" rx="5" ry="5" width="80%" height="10" />
            <Rect x="0" y="50" rx="5" ry="5" width="85%" height="10" />
            <Rect x="0" y="70" rx="5" ry="5" width="75%" height="10" />
        </ContentLoader>
    );

    useEffect(()=>{
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
                        <RightArrow />
                    </TouchableOpacity>
                </View>

                <View>
                    {loading ?(
                        <CardLoader/>

                    ):(
                        <Card
                        hasBackground={true}
                        backgroundImage={require('../../assets/images/credit_bg.png')}
                        customStyle={style.cardContainer}
                        >
                            <View style={style.iconContainer}>
                                <StatIcon/>
                                <RightArrowWhite/>
    
                            </View>
                            <View style={style.bodyContainer}>
                                <Text style={[globalStyle.headingText,{color:'#FFFFFFD9',fontSize:18}]}>Successful Transactions worth </Text>
                            </View>
    
                        </Card>
                    )

                    }


                </View>


            </View>
        </View>
    );
};

export default Home;
