import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import styles from './styles';
import DeleteIcon from '../../assets/icons/delete.svg';

const ProductItem = ({product, onEdit, onDelete}) => {
  const handleDelete = () => {
    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que deseas eliminar esta categoría?',
      [
        {
          style: 'cancel',
          text: 'Cancelar',
        },
        {
          text: 'Eliminar',
          onPress: () => onDelete(product.idProduct),
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{product.name}</Text>
      <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
        <View style={styles.iconContainer}>
          <Text style={styles.itemTextInfo}>₲{product.price}</Text>
          <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
            <DeleteIcon width={24} height={24} fill="#f73d58" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProductItem;
