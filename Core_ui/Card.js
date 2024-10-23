import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const style = StyleSheet.create({
    cardContainer: {
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#D4D7E3',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        height: 'max-content',
        width: wp('80%'),
        marginHorizontal: wp('10%'),
        marginVertical: hp('5%'),
        padding: 10,
    },
});
function Card(props) {
    const { hasBackground, customStyle, children } = props;

    console.log('Children:', children); // Log children to debug

    if (!children) {
        return null; // or return an empty fragment
    }

    return hasBackground ? (
        <ImageBackground
            source={backgroundImage} // Ensure backgroundImage is defined
            style={[style.cardContainer, customStyle]}
            imageStyle={{ borderRadius: 22 }}
        >
            {children}
        </ImageBackground>
    ) : (
        <View style={[style.cardContainer, customStyle]}>
            {children}
        </View>
    );
}


export default Card;
