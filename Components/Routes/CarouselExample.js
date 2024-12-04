import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

const data = [
  { title: 'Slide 1', backgroundColor: '#FF5733' },
  { title: 'Slide 2', backgroundColor: '#33C4FF' },
  { title: 'Slide 3', backgroundColor: '#A833FF' },
];

const App = () => {
  return (
    <View style={styles.container}>
      <Carousel
        width={width}
        height={250}
        data={data}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: item.backgroundColor }]}>
            <Text style={styles.text}>{item.title}</Text>
          </View>
        )}
        loop={true}
        autoPlay={true}
        autoPlayInterval={3000}
        pagingEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
