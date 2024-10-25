import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

const CardLoader = (props) => {
  const { backgroundImage, noOfImage, noOfText } = props;

  return (
    <View style={styles.card}>
      {backgroundImage ? (
        <ImageBackground
          source={{ uri: backgroundImage }} // Use your image URL or require statement for local images
          style={styles.card}
          imageStyle={styles.backgroundImage} // Additional styles for the image
        >
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            style={styles.image}
            autoRun={true}
          />
          <View style={styles.textContainer}>
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              style={styles.title}
              autoRun={true}
            />
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              style={styles.subtitle}
              autoRun={true}
            />
          </View>
        </ImageBackground>
      ) : (
        <>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            style={styles.image}
            autoRun={true}
          />
          <View style={styles.textContainer}>
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              style={styles.title}
              autoRun={true}
            />
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              style={styles.subtitle}
              autoRun={true}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 3,
    overflow: 'hidden', // Ensure children respect border radius
  },
  backgroundImage: {
    borderRadius: 8, // Match border radius of the card
    resizeMode: 'cover', // Cover the entire area
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    width: '60%',
    height: 20,
    borderRadius: 4,
    marginBottom: 8,
  },
  subtitle: {
    width: '40%',
    height: 16,
    borderRadius: 4,
  },
});

export default CardLoader;
