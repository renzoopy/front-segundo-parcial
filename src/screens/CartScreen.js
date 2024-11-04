import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Alert, TouchableOpacity} from 'react-native';
import QuantitySelector from '../components/sales/QuantitySelector';
import styles from './styles';

const CartScreen = ({navigation, route}) => {
  const initialItems = route.params?.items || [];

  const [cartItems, setCartItems] = useState(initialItems);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Establecer cartItems si initialItems cambia
    setCartItems(initialItems);
  }, [initialItems]);

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    setTotal(newTotal);
  }, [cartItems]);

  const handleQuantityChange = (idProduct, newQuantity) => {
    if (newQuantity < 0) {
      // No permitir cantidades negativas
      return;
    }

    if (newQuantity === 0) {
      Alert.alert(
        'Eliminar Producto',
        `¿Estás seguro de que quieres eliminar el producto?`,
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Eliminar',
            onPress: () => handleRemoveFromCart(idProduct),
          },
        ],
      );
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.idProduct === idProduct
            ? {...item, quantity: newQuantity}
            : item,
        ),
      );
    }
  };

  const handleRemoveFromCart = idProduct => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.idProduct !== idProduct),
    );
  };

  const handleMinus = (idProduct, currentQuantity) => {
    const newQuantity = currentQuantity - 1;
    handleQuantityChange(idProduct, newQuantity);
  };

  const handlePayment = () => {
    navigation.navigate('Client', {items: cartItems, total: total}); // Envía cartItems a Client
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      {cartItems.length === 0 ? (
        <Text>El carrito está vacío.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={item => item.idProduct.toString()}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <Text style={styles.productName}>{item.name}</Text>
              <View style={styles.row}>
                <Text style={styles.productPrice}>₲{item.price}</Text>
                <QuantitySelector
                  quantity={item.quantity}
                  setQuantity={newQuantity =>
                    handleQuantityChange(item.idProduct, newQuantity)
                  }
                  handleMinus={() => handleMinus(item.idProduct, item.quantity)}
                />
              </View>
            </View>
          )}
        />
      )}
      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalText}>Total: ₲{total}</Text>
          <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
            <Text style={styles.payButtonText}>Pagar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CartScreen;
