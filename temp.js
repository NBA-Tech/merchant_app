import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function TransactionCard() {
  const [expanded, setExpanded] = useState(false);
  const transactions = [
    { id: '1', detail: 'Transaction 1: $20' },
    { id: '2', detail: 'Transaction 2: $35' },
    { id: '3', detail: 'Transaction 3: $50' },
  ];

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <TouchableOpacity style={styles.card} onPress={toggleExpand}>
      <Text style={styles.title}>Transactions: {transactions.length}</Text>
      {expanded && (
        <Animatable.View animation="fadeInDown" duration={300}>
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.transactionDetail}>
                <Text>{item.detail}</Text>
              </View>
            )}
          />
        </Animatable.View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 8,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  transactionDetail: {
    paddingVertical: 5,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
});
