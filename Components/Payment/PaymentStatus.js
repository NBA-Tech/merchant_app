import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { PaymentFailIcon, PaymentSuccssIcon } from '../../SvgIcons';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import Button from '../../Core_ui/Button';
import Sound from 'react-native-sound'; // Import the Sound library

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 20,
  },
  logoIcon: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  mainCircle: {
    borderRadius: 350,
    justifyContent: 'center',
    alignItems: 'center',
    padding:heightPercentageToDP('15%')
  },
  innerCircle: {
    borderRadius: 350,
    justifyContent: 'center',
    alignItems: 'center',
    padding:heightPercentageToDP('15%')
  },

  statusText:{
    fontSize:20,
    fontFamily:'IBMPlexSans-Bold',
    textAlign:'center',
    marginVertical:heightPercentageToDP('5%')
  }
});

const PaymentStatus = (props) => {
  const {navigation}=props
  const { status = undefined, amount = undefined } = props?.route?.params || {};

  const mainCircleScale = useRef(new Animated.Value(0)).current; // Starts at 0 scale
  const innerCircleScale = useRef(new Animated.Value(0)).current; // Starts at 0 scale

  const playSuccessSound = () => {
    const sound = new Sound(status=='SUCCESS'?'success.mp3':'failure.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      sound.play((success) => {
        if (!success) {
          console.log('Sound playback failed.');
        }
        sound.release(); // Release the sound resource after playback
      });
    });
  };

  useEffect(() => {
    // Animate main circle scale
    Animated.timing(mainCircleScale, {
      toValue: 1, // Final scale (original size)
      duration: 1500, // Duration for the animation
      useNativeDriver: true, // Use native driver for performance
    }).start(()=>{
        playSuccessSound();

    });

    // Animate inner circle scale
    Animated.timing(innerCircleScale, {
      toValue: 1, // Final scale (original size)
      duration: 2000, // Duration for the animation
      useNativeDriver: true, // Use native driver for performance
    }).start(()=>{
    });
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.logoIcon}>
        <Animated.View
          style={[
            styles.mainCircle,
            { transform: [{ scale: mainCircleScale }],backgroundColor:status=="SUCCESS"?"#CBF8A4":"#FFB5B6" }, // Scale animation for main circle
          ]}
        >
          <Animated.View
            style={[
              styles.innerCircle,
              { transform: [{ scale: innerCircleScale }],backgroundColor:status=="SUCCESS"?"#b2f578":"#fa7375" }, // Scale animation for inner circle
            ]}
          >
            {status=="SUCCESS"?(
            <PaymentSuccssIcon />


            ):(
              <PaymentFailIcon/>
            )

            }
          </Animated.View>
        </Animated.View>
      </View>
      <Text style={[styles.statusText,{color:status=="SUCCESS"?"#079B0C":"#FF0E12"}]}>{status=="SUCCESS"?`PAYMENT SUCCESSFUL FOR RS.${amount}`:`PAYMENT FAILED FOR RS.${amount}`}</Text>

      <Button buttonText={'Done'} customeStyleButton={{backgroundColor:status=="SUCCESS"?"#03B80C":"#B80306"}} onClick={()=>{navigation.navigate('paymentTab')}}/>
    </View>
  );
};

export default PaymentStatus;
