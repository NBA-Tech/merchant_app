import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const style = StyleSheet.create({
    DefaultCardContainer: {
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#D4D7E3',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        height: 'max-content',
        width: wp('90%'),
        marginVertical: hp('2%'),
        padding: 10,
    },
});
function Card(props) {
    const { hasBackground, customStyle, children,backgroundImage } = props;


    if (!children) {
        return null; // or return an empty fragment
    }

    return hasBackground ? (
        <ImageBackground
            source={backgroundImage} // Ensure backgroundImage is defined
            style={[style.DefaultCardContainer, customStyle]}
            imageStyle={{ borderRadius: 22 }}
        >
            {children}
        </ImageBackground>
    ) : (
        <View style={[style.DefaultCardContainer, customStyle]}>
            {children}
        </View>
    );
}


export default Card;
