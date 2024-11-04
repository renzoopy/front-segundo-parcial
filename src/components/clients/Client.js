import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, Alert, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Importar useNavigation
import {
  addSale,
  addClient,
  getClientByGovId,
  getSales,
} from '../../services/api'; // Asegúrate de tener estas funciones en tu api.js

const Client = ({route}) => {
  const {total, items} = route.params; // Recibir el total y items desde CartScreen
  const [govId, setGovId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [clientId, setClientId] = useState(null); // Guardar el ID del cliente si se encuentra

  const [govIdError, setGovIdError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);

  const navigation = useNavigation(); // Obtener la instancia de navegación

  useEffect(() => {
    const fetchClient = async () => {
      if (govId) {
        try {
          const existingClient = await getClientByGovId(govId);
          if (existingClient) {
            setFirstName(existingClient.firstName);
            setLastName(existingClient.lastName);
            setClientId(existingClient.idClient);
          } else {
            // Si no existe, resetear el idClient y los nombres
            setClientId(null);
            setFirstName('');
            setLastName('');
          }
        } catch (error) {
          console.error('Error al buscar el cliente:', error);
        }
      } else {
        // Resetear si el govId está vacío
        setClientId(null);
        setFirstName('');
        setLastName('');
      }
    };

    fetchClient();
  }, [govId]);

  const handleSubmit = async () => {
    // Resetear errores
    setGovIdError(false);
    setFirstNameError(false);
    setLastNameError(false);

    // Validar campos requeridos
    let hasError = false;
    if (!govId) {
      setGovIdError(true);
      hasError = true;
    }
    if (!firstName) {
      setFirstNameError(true);
      hasError = true;
    }
    if (!lastName) {
      setLastNameError(true);
      hasError = true;
    }

    if (hasError) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    try {
      // Si el cliente ya existe, usar su ID
      if (clientId) {
        await createSale(clientId);
      } else {
        // Si no existe, crear un nuevo cliente
        const newClient = {govId, firstName, lastName};
        const createdClient = await addClient(newClient);
        setClientId(createdClient.idClient);
        await createSale(createdClient.idClient);
      }
    } catch (error) {
      console.error('Error al procesar la venta:', error);
      Alert.alert('Error', 'Ocurrió un error al procesar la venta.');
    }
  };

  const createSale = async idClient => {
    try {
      // Obtener el último idSale
      const sales = await getSales();
      const lastIdSale =
        sales.length > 0 ? Math.max(...sales.map(sale => sale.idSale)) : 0;
      const newIdSale = lastIdSale + 1; // Incrementar el último idSale

      // Aquí puedes definir los detalles de la venta basados en los items del carrito
      const saleDetails = items.map((item, index) => ({
        idSaleDetail: index + 1, // Generar un ID para el detalle de la venta
        idProduct: item.idProduct, // Suponiendo que 'item' tiene una propiedad idProduct
        quantity: item.quantity, // Suponiendo que 'item' tiene una propiedad quantity
        price: item.price, // Suponiendo que 'item' tiene una propiedad price
      }));

      // Crear el objeto de la venta
      const saleData = {
        id: String(newIdSale),
        idSale: newIdSale, // Asignar el nuevo idSale
        date: new Date().toLocaleDateString(), // Formato de fecha
        idClient,
        total: total, // El total del carrito
        saleDetails: saleDetails, // Detalles de la venta
      };

      // Llama a la función addSale para registrar la compra
      await addSale(saleData);
      Alert.alert('Éxito', 'La venta se ha registrado correctamente.');

      // Navegar a la pantalla Home después de finalizar la orden
      navigation.navigate('Home'); // Cambiar 'Home' al nombre correcto de tu ruta
    } catch (error) {
      console.error('Error al crear la venta:', error);
      Alert.alert('Error', 'Ocurrió un error al crear la venta.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Ingrese el número de cédula"
        value={govId}
        onChangeText={setGovId}
        keyboardType="numeric"
        placeholderTextColor="black"
        style={[styles.input, govIdError && styles.inputError]}
      />
      <TextInput
        placeholder="Nombre"
        value={firstName}
        onChangeText={setFirstName}
        placeholderTextColor="black"
        style={[styles.input, firstNameError && styles.inputError]}
      />
      <TextInput
        placeholder="Apellido"
        value={lastName}
        onChangeText={setLastName}
        placeholderTextColor="black"
        style={[styles.input, lastNameError && styles.inputError]}
      />
      <Button title="Finalizar Orden" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginBottom: 12,
    padding: 8,
  },
  inputError: {
    borderColor: 'red', // Cambiar el color del borde a rojo si hay error
  },
});

export default Client;
