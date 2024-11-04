import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PlusIcon from '../../assets/icons/plus.svg';
import MinusIcon from '../../assets/icons/minus.svg';

const QuantitySelector = ({quantity, setQuantity, handleMinus}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleMinus}>
        <MinusIcon width={24} height={24} fill="#f73d58" />
      </TouchableOpacity>
      <Text style={styles.quantity}>{quantity}</Text>
      <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
        <PlusIcon width={24} height={24} fill="#f73d58" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 18,
  },
});

export default QuantitySelector;
