import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import {getProducts, deleteProduct, getCategories} from '../../services/api';
import ProductItem from './ProductItem';
import {Picker} from '@react-native-picker/picker';
import styles from './styles';
import PlusIcon from '../../assets/icons/plus.svg';

const ProductList = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProducts();
      fetchCategories();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async idProduct => {
    await deleteProduct(idProduct);
    fetchProducts();
  };

  const filteredProducts = products.filter(product => {
    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Si selectedCategory es una cadena vacía, solo se retorna matchesSearchTerm
    if (selectedCategory === '' || selectedCategory === '0') {
      return matchesSearchTerm;
    }

    // Si hay una categoría seleccionada, se retorna ambos
    const matchesCategory = product.idCategory.toString() === selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddProduct')}
          style={{marginRight: 23}}>
          <PlusIcon width={20} height={20} fill="#000000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar producto"
        value={searchTerm}
        placeholderTextColor="black"
        onChangeText={setSearchTerm}
      />
      <Text>Filtrar por categoría:</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={itemValue => setSelectedCategory(itemValue)}
        style={styles.categoryPicker}>
        <Picker.Item
          label="Todas las categorías"
          value="0"
          style={{color: 'black'}}
        />
        {categories.map(category => (
          <Picker.Item
            key={category.idCategory}
            label={category.name}
            value={category.idCategory.toString()}
            color="#000000"
          />
        ))}
      </Picker>
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.idProduct.toString()}
        renderItem={({item}) => (
          <ProductItem
            product={item}
            onEdit={() => navigation.navigate('EditProduct', {id: item.id})}
            onDelete={() => handleDelete(item.idProduct)}
          />
        )}
      />
    </View>
  );
};

export default ProductList;
