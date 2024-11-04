import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import styles from './styles';
import DeleteIcon from '../../assets/icons/delete.svg';

const CategoryItem = ({category, onEdit, onDelete}) => {
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
          onPress: () => onDelete(category.idCategory),
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{category.name}</Text>
      <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
            <DeleteIcon width={24} height={24} fill="#f73d58" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryItem;
