import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import {getCategories, deleteCategory} from '../../services/api'; // Llamada al servicio API
import CategoryItem from './CategoryItem'; // Componente más pequeño que representa cada ítem
import styles from './styles'; // Estilos para la pantalla
import PlusIcon from '../../assets/icons/plus.svg';

const CategoryList = ({navigation}) => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchCategories(); // Cargar categorías cuando la pantalla obtiene el enfoque
    });

    return unsubscribe; // Limpiar el evento al desmontar el componente
  }, [navigation]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories(); // Llamada al API para obtener categorías
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async idCategory => {
    await deleteCategory(idCategory); // Llamada para eliminar categoría
    fetchCategories(); // Recargar lista después de eliminar
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddCategory')}
          style={{marginRight: 23}}>
          <PlusIcon width={20} height={20} fill="#000000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          margin: 4,
          marginHorizontal: 5,
          padding: 10,
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 5,
          margin: 10,
        }}
        placeholder="Buscar categoría"
        value={searchTerm}
        placeholderTextColor="black"
        onChangeText={setSearchTerm}
      />

      <FlatList
        data={filteredCategories}
        keyExtractor={item => item.idCategory.toString()}
        renderItem={({item}) => (
          <CategoryItem
            category={item}
            onEdit={() => navigation.navigate('EditCategory', {id: item.id})}
            onDelete={() => handleDelete(item.idCategory)}
          />
        )}
      />
    </View>
  );
};

export default CategoryList;
