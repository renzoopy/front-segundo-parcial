import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {getProductById} from '../../services/api';

const SaleDetails = ({route}) => {
  const {sale} = route.params; // Recibe la venta desde la pantalla anterior
  const [productsWithNames, setProductsWithNames] = useState([]); // Estado para almacenar los detalles de la venta con los nombres de los productos

  useEffect(() => {
    const fetchProductNames = async () => {
      try {
        // Usamos Promise.all para hacer múltiples llamadas a la API al mismo tiempo
        const productsWithNamesPromises = sale.saleDetails.map(async item => {
          const product = await getProductById(item.idProduct); // Traemos el producto por id
          return {
            ...item,
            productName: product ? product.name : 'Producto desconocido', // Añadimos el nombre del producto
          };
        });

        // Esperamos que todas las promesas se resuelvan
        const updatedProducts = await Promise.all(productsWithNamesPromises);
        setProductsWithNames(updatedProducts); // Actualizamos el estado con los productos que tienen nombres
      } catch (error) {
        console.error('Error fetching product names:', error);
      }
    };

    fetchProductNames();
  }, [sale.saleDetails]); // Ejecuta el efecto cuando los detalles de la venta cambian

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles de la Venta</Text>
      <Text style={styles.clientInfo}>Cliente: {sale.clientName}</Text>
      <Text style={styles.dateInfo}>Fecha: {sale.date}</Text>
      <Text style={styles.totalInfo}>Total: ₲{sale.total}</Text>

      <FlatList
        data={productsWithNames}
        keyExtractor={item => item.idSaleDetail.toString()}
        renderItem={({item}) => (
          <View style={styles.productItem}>
            <Text style={styles.productName}>
              {item.productName} {/* Aquí mostramos el nombre del producto */}
            </Text>
            <Text style={styles.productPrice}>Precio: ₲{item.price}</Text>
            <Text style={styles.productQuantity}>
              Cantidad: {item.quantity}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  clientInfo: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  dateInfo: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  totalInfo: {
    fontSize: 16,
    marginBottom: 15,
    color: '#555',
  },
  productItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    color: '#555',
  },
  productQuantity: {
    fontSize: 16,
    color: '#555',
  },
});

export default SaleDetails;
