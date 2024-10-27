import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function TransactionCard(props) {
  const { children } = props;
  const [expanded, setExpanded] = useState(false);
  
  const transactions = [
    { id: '1', detail: 'Transaction 1: $20' },
    { id: '2', detail: 'Transaction 2: $35' },
    { id: '3', detail: 'Transaction 3: $50' },
  ];

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <TouchableOpacity onPress={toggleExpand}>
      {children}
      {expanded && (
        <Animatable.View animation="fadeInDown" duration={300}>
          <View>
            {transactions.map((item) => (
              <View key={item.id} >
                <Text>{item.detail}</Text>
              </View>
            ))}
          </View>
        </Animatable.View>
      )}
    </TouchableOpacity>
  );
}
