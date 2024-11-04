import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import {addCategory, getCategories} from '../../services/api';
import styles from './styles';

const AddCategory = ({navigation}) => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);

  // Traer todas las categorías
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    // Obtener el siguiente idCategory
    const maxIdCategory = categories.reduce((max, category) => {
      return Math.max(max, category.idCategory);
    }, 0);
    const newIdCategory = maxIdCategory + 1;

    const newCategory = {
      idCategory: newIdCategory,
      name,
      id: newIdCategory.toString(36), // Convertir a base 36 para obtener un id alfanumérico
    };

    await addCategory(newCategory);
    navigation.goBack(); // Volver al listado después de agregar
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nombre"
        placeholderTextColor="black"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddCategory;
