import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// This component shows the loading text with animated dots
const DotsLoader = () => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => (prev.length < 3 ? prev + '.' : '')); // Add dots until there are 3, then reset
        }, 500); // Update every 500ms

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, []);

    return (
        <View style={styles.centeredView}>
            <Text style={styles.loaderText}>{dots}</Text>
        </View>

    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,                  // Ensures the view takes the full space of its container
        justifyContent: 'center',  // Centers the content vertically
        alignItems: 'center',      // Centers the content horizontally
    },
    loaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
});


export default DotsLoader;
