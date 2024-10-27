import React,{useContext} from 'react';
import { View,Text,TouchableOpacity,StyleSheet } from 'react-native';
import { StyleContext } from '../GlobalStyleProvider';
import { LeftArrow,RightArrow } from '../SvgIcons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const style=StyleSheet.create({
    dateContainer: {
        flexDirection: 'row',
        marginVertical: hp('2%'),
        justifyContent: 'space-between',
        alignItems:'center'
    },
    date: {
        textAlign: 'center',
        flex: 1,
        alignItems: 'center'
    },
})
const DateHeader = () => {
    const globalStyle = useContext(StyleContext);
    return (
        <View>
             <View style={style.headerContainer}>
                    <Text style={globalStyle.headingText}>Merchant name</Text>
                    <Text style={globalStyle.boldText}>Login name</Text>
                </View>

                <View style={style.dateContainer}>
                    <TouchableOpacity style={{marginVertical:hp('1%')}}>
                        <LeftArrow fill={"#FFFFFF"}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={[globalStyle.headingText, style.date]}>Today, 10 Oct, 2024</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <RightArrow fill={"#FFFFFF"} width={"24"} height={"24"} />
                    </TouchableOpacity>
                </View>
        </View>
    );
};

export default DateHeader;