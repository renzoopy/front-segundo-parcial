import React, {useEffect, useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {getProductById, updateProduct, getCategories} from '../../services/api';
import styles from './styles';

const EditProduct = ({route, navigation}) => {
  const {id} = route.params; // id del producto a editar
  const [name, setName] = useState('');
  const [idCategory, setIdCategory] = useState('');
  const [price, setPrice] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductById(id);
      setName(product.name);
      setIdCategory(product.idCategory.toString());
      setPrice(product.price.toString());
    };

    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleSubmit = async () => {
    const updatedProduct = {
      id: idCategory,
      idProduct: Number(idCategory),
      name,
      idCategory: Number(idCategory),
      price: parseFloat(price),
    };
    await updateProduct(id, updatedProduct);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Picker
        selectedValue={idCategory}
        onValueChange={itemValue => setIdCategory(itemValue)}
        style={styles.categoryPicker}>
        <Picker.Item label="Seleccionar Categoría" value="" />
        {categories.map(category => (
          <Picker.Item
            key={category.id}
            label={category.name}
            value={category.idCategory.toString()}
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
      />
      <Button title="Actualizar Producto" onPress={handleSubmit} />
    </View>
  );
};

export default EditProduct;
