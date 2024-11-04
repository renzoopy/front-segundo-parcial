import React, {useEffect, useState, useCallback} from 'react';
import {View, FlatList, TouchableOpacity, Text, TextInput} from 'react-native';
import {getProducts, getCategoryById} from '../services/api.js';
import ProductItem from '../components/sales/ProductItem';
import CartIcon from '../assets/icons/cart.svg';
import styles from './styles';

const SaleScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Estado para productos filtrados
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        // Añadir el nombre de la categoría a cada producto
        const salesWithCategories = await Promise.all(
          data.map(async product => {
            try {
              const category = await getCategoryById(product.idCategory);
              return {
                ...product,
                categoryName: category
                  ? category.name
                  : 'Categoría desconocida',
              };
            } catch (error) {
              console.error(
                'Error fetching category for product:',
                product,
                error,
              );
              return {
                ...product,
                categoryName: 'Categoría desconocida',
              };
            }
          }),
        );

        setProducts(salesWithCategories);
        setFilteredProducts(salesWithCategories); // Inicializa con todos los productos
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Función para manejar la búsqueda
  const handleSearch = term => {
    setSearchTerm(term);
    console.log(term);
    if (term) {
      const filtered = products.filter(
        product =>
          product.name.toLowerCase().includes(term.toLowerCase()) || // Filtra por nombre
          product.categoryName.toLowerCase().includes(term.toLowerCase()), // Filtra por nombre de categoría
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Si no hay término de búsqueda, muestra todos los productos
    }
  };

  const addToCart = useCallback(
    item => {
      if (item.quantity === 0) {
        setCartItems(prevItems =>
          prevItems.filter(cartItem => cartItem.idProduct !== item.idProduct),
        );
      } else {
        const product = products.find(prod => prod.id === item.idProduct);

        if (product) {
          const cartItem = {
            idSaleDetail: Date.now(),
            idProduct: product.id,
            quantity: item.quantity,
            price: product.price,
            name: product.name,
          };

          const productInCart = cartItems.find(
            cartItem => cartItem.idProduct === item.idProduct,
          );

          if (productInCart) {
            const updatedCartItems = cartItems.map(cartItem =>
              cartItem.idProduct === item.idProduct
                ? {...cartItem, quantity: item.quantity}
                : cartItem,
            );
            setCartItems(updatedCartItems);
          } else {
            setCartItems(prevItems => [...prevItems, cartItem]);
          }
        }
      }
    },
    [cartItems, products],
  );

  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    setTotal(totalPrice);
  }, [cartItems]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart', {items: cartItems})}
          style={{marginRight: 23}}>
          <CartIcon width={20} height={20} fill="#000000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, cartItems]);

  return (
    <View style={{flex: 1}}>
      {/* Campo de búsqueda */}
      <TextInput
        placeholder="Buscar productos por nombre o categoría"
        value={searchTerm}
        onChangeText={handleSearch}
        style={{
          margin: 4,
          marginHorizontal: 25,
          padding: 10,
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 5,
          margin: 10,
        }}
        placeholderTextColor="black"
      />
      <FlatList
        data={filteredProducts} // Usa los productos filtrados
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ProductItem product={item} addToCart={addToCart} />
        )}
        contentContainerStyle={{paddingBottom: 20}}
      />
      <View style={{padding: 10, backgroundColor: '#f8f8f8'}}>
        {cartItems.length > 0 ? (
          <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 15}}>
            Total: ₲{total.toFixed(2)}
          </Text>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default SaleScreen;
