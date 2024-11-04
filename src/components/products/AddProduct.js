import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import {addProduct, getProducts, getCategories} from '../../services/api'; // Asegúrate de que la ruta sea correcta
import {Picker} from '@react-native-picker/picker'; // Actualiza la importación del Picker
import styles from './styles';

const AddProduct = ({navigation}) => {
  const [name, setName] = useState('');
  const [idCategory, setIdCategory] = useState('');
  const [price, setPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Traer todos los productos
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  // Traer todas las categorías
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories(); // Llama a la API para obtener categorías
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    const maxIdProduct = products.reduce((max, product) => {
      return Math.max(max, product.idProduct);
    }, 0);
    const newIdProduct = maxIdProduct + 1;

    const newProduct = {
      idProduct: newIdProduct,
      name,
      idCategory: parseInt(idCategory),
      price: parseFloat(price),
      id: newIdProduct.toString(36),
    };

    await addProduct(newProduct); // Llamada a la API para agregar el producto
    navigation.goBack(); // Regresar a la pantalla anterior
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="black"
      />
      <Picker
        selectedValue={idCategory}
        onValueChange={itemValue => setIdCategory(itemValue)}
        style={styles.categoryPicker}>
        <Picker.Item
          label="Seleccionar categoría"
          value=""
          style={{color: 'black'}}
        />
        {categories.map(category => (
          <Picker.Item
            key={category.idCategory}
            label={category.name}
            value={category.idCategory}
            color="#ffffff"
          />
        ))}
      </Picker>
      <TextInput
        placeholder="Precio de Venta"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="black"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddProduct;
