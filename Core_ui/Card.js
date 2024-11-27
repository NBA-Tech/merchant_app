import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
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
    const { hasBackground, customStyle, children, backgroundImage, onClick } = props;


    if (!children) {
        return null; // or return an empty fragment
    }

    return hasBackground ? (
        <TouchableOpacity onPress={onClick}>
            <ImageBackground
                source={backgroundImage} // Ensure backgroundImage is defined
                style={[style.DefaultCardContainer, customStyle]}
                imageStyle={{ borderRadius: 22 }}
            >
                {children}
            </ImageBackground>
        </TouchableOpacity>
    ) : (
        (onClick ? (
            <TouchableOpacity onPress={onClick}>
                <View style={[style.DefaultCardContainer, customStyle]}>
                    {children}
                </View>
            </TouchableOpacity>

        ) : (
            <View>
                <View style={[style.DefaultCardContainer, customStyle]}>
                    {children}
                </View>
            </View>
        )

        )

    );
}


export default Card;
