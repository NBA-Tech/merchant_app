import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Create a scaling function for font size that uses the smaller of width or height scaling
const scaleFont = (size) => {
  const scaledWidth = wp(size);
  const scaledHeight = hp(size);
  return scaledWidth > scaledHeight ? scaledWidth : scaledHeight;
};

export const globalStyle = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#073761", // Dark blue background
  },
  backgroundWhite: {
    flex: 1,
    backgroundColor: "#F8F9FA", // Light gray background
  },
  boldText: {
    fontSize: scaleFont('3%'),  // Scaled font size
    fontStyle: 'normal',
    fontFamily: 'IBMPlexSans-Bold',
    marginTop: hp('1%'),  // Responsive margin
    color: "#FFFFFF",  // White color
  },
  boldBlackText: {
    fontSize: scaleFont('2.5%'),  // Scaled font size
    fontStyle: 'normal',
    fontFamily: 'IBMPlexSans-Bold',
    color: "#000000",  // Black color
  },
  blueMediumText: {
    color: "#1286ED",  // Blue color
    fontSize: scaleFont('2%'),  // Scaled font size
    fontFamily: 'IBMPlexSans-SemiBold',
  },
  boldTextBlack: {
    color: "#323232",  // Dark gray color
    fontSize: scaleFont('2.5%'),  // Scaled font size
    fontStyle: 'normal',
    fontFamily: 'IBMPlexSans-Bold',
  },
  headingText: {
    fontSize: scaleFont('2.5%'), 
    fontStyle: 'normal',
    fontFamily: 'IBMPlexSans-Bold',
    marginTop: hp('1%'),  // Responsive margin
    color: "#FFFFFF",  // White color
  },
  blackSubText: {
    fontSize: scaleFont('2%'),  // Scaled font size
    fontStyle: 'normal',
    fontFamily: 'IBMPlexSans-Light',
    color: "#323232",  
  },
  mediumText: {
    color: "#323232",  
    fontSize: scaleFont('2%'),  
    fontFamily: 'IBMPlexSans-Medium',
  },
  normalText: {
    color: "#1D3039",  // Dark text color
    fontSize: scaleFont('4%'),  // Scaled font size for smaller text
    fontFamily: 'IBMPlexSans-Light',
    fontWeight: 'bold',
  },
  blueCircleBorder: {
    backgroundColor: "#D9EDFF",  // Light blue background
    width: wp('10%'),  // Responsive width
    height: wp('10%'),  // Responsive height
    borderRadius: wp('5%'),  // Rounded corners
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('0.5%'),  // Responsive padding
  },
});
