import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import QuantitySelector from './QuantitySelector';
import PlusIcon from '../../assets/icons/plus.svg';
import styles from './styles';

const ProductItem = ({product, addToCart}) => {
  const [quantity, setQuantity] = useState(0);
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  const lastQuantityRef = useRef(quantity); // Referencia para almacenar la última cantidad

  // Efecto que se ejecuta cuando cambia la cantidad
  useEffect(() => {
    // Solo actualiza el carrito si la cantidad ha cambiado
    if (lastQuantityRef.current !== quantity) {
      if (quantity > 0) {
        addToCart({
          idSaleDetail: Date.now(), // Genera un ID único temporalmente
          idProduct: product.id,
          quantity: quantity,
          price: product.price,
        });
      } else {
        // Elimina del carrito si la cantidad es 0
        addToCart({
          idSaleDetail: Date.now(),
          idProduct: product.id,
          quantity: 0, // Indica que se eliminó del carrito
          price: product.price,
        });
      }
      lastQuantityRef.current = quantity; // Actualiza la referencia a la nueva cantidad
    }
    // Este efecto solo depende de `quantity`
  }, [quantity, product.id, product.price]);

  const handlePlusIconPress = () => {
    setShowQuantitySelector(true);
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleQuantityChange = newQuantity => {
    setQuantity(newQuantity);
    if (newQuantity === 0) {
      setShowQuantitySelector(false); // Oculta el selector si la cantidad es 0
    } else {
      setShowQuantitySelector(true); // Muestra el selector si la cantidad es mayor que 0
    }
  };

  const handleMinus = () => {
    setQuantity(prevQuantity => {
      const newQuantity = prevQuantity > 0 ? prevQuantity - 1 : 0;
      if (newQuantity === 0) {
        setShowQuantitySelector(false); // Oculta el selector si la cantidad es 0
      }
      return newQuantity; // Retorna la nueva cantidad
    });
  };

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.productName}>{product.name}</Text>
      <View style={styles.row}>
        <Text style={styles.productPrice}>₲{product.price}</Text>
        {!showQuantitySelector ? (
          <TouchableOpacity onPress={handlePlusIconPress}>
            <PlusIcon width={24} height={24} fill="#f73d58" />
          </TouchableOpacity>
        ) : (
          <QuantitySelector
            quantity={quantity}
            setQuantity={handleQuantityChange} // Maneja la lógica de cantidad
            handleMinus={handleMinus} // Pasamos la función para restar
          />
        )}
      </View>
    </View>
  );
};

export default ProductItem;
