import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import {getCategoryById, updateCategory} from '../../services/api'; // Llamada al servicio API
import styles from './styles';

const EditCategory = ({route, navigation}) => {
  const {id} = route.params; // Obtener el ID de la categoría desde los parámetros de la ruta
  const [name, setName] = useState('');

  useEffect(() => {
    fetchCategory(); // Cargar la categoría al inicio
  }, []);

  const fetchCategory = async () => {
    try {
      const category = await getCategoryById(id); // Obtener la categoría por ID
      setName(category.name); // Establecer el nombre actual en el estado
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const updatedCategory = {id: id, idCategory: Number(id), name}; // Crear el objeto con el nombre actualizado
      await updateCategory(id, updatedCategory); // Llamada para actualizar categoría
      navigation.goBack(); // Volver al listado después de actualizar
    } catch (error) {
      console.error('Error updating category:', error);
    }
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
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditCategory;
