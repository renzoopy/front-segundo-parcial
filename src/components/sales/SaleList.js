import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {getSales, getClient} from '../../services/api';
import DatePickerModal from './DatePickerModal'; // Importa el nuevo componente

const SaleList = ({navigation}) => {
  const [sales, setSales] = useState([]); // Aquí almacenarás las ventas
  const [filteredSales, setFilteredSales] = useState([]); // Ventas filtradas
  const [searchTerm, setSearchTerm] = useState(''); // Para el filtro de clientes
  const [filterDate, setFilterDate] = useState(''); // Para el filtro por fecha
  const [showCalendar, setShowCalendar] = useState(false); // Para mostrar/ocultar el calendario

  useEffect(() => {
    const fetchSalesAndClients = async () => {
      try {
        const salesData = await getSales();

        const salesWithClients = await Promise.all(
          salesData.map(async sale => {
            try {
              const client = await getClient(sale.idClient);

              return {
                ...sale,
                clientName: client
                  ? `${client.firstName} ${client.lastName}`
                  : 'Cliente desconocido',
                clientGovId: client ? client.govId : null, // Agrega el govId del cliente
              };
            } catch (error) {
              console.error('Error fetching client for sale:', sale, error);
              return {
                ...sale,
                clientName: 'Cliente desconocido',
                clientGovId: null, // En caso de error, establece govId como null
              };
            }
          }),
        );

        setSales(salesWithClients);
        setFilteredSales(salesWithClients);
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    };

    fetchSalesAndClients();
  }, []);

  useEffect(() => {
    // Filtros de búsqueda por cliente, govId y fecha
    const results = sales.filter(sale => {
      const matchesClient = sale.clientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesGovId = sale.clientGovId
        ? sale.clientGovId.toString().includes(searchTerm.toLowerCase())
        : false; // Verifica si el govId coincide
      const matchesDate = filterDate ? sale.date === filterDate : true;

      return (matchesClient || matchesGovId) && matchesDate; // Modificado para buscar también por govId
    });

    setFilteredSales(results);
  }, [searchTerm, filterDate, sales]);

  const handleSaleClick = sale => {
    // Navega a la pantalla de detalles de la venta y pasa la venta seleccionada
    navigation.navigate('SaleDetails', {sale});
  };

  const onSelectDate = date => {
    setFilterDate(date);
  };

  // Función para borrar el filtro de fecha
  const onClearDate = () => {
    setFilterDate(''); // Restablece el filtro de fecha
  };

  return (
    <View style={styles.container}>
      {/* Campo de filtro por cliente */}
      <TextInput
        style={styles.input}
        placeholder="Buscar por cliente"
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholderTextColor="black"
      />

      {/* Botón para mostrar el calendario */}
      <TouchableOpacity
        style={styles.calendarButton}
        onPress={() => setShowCalendar(true)}>
        <Text style={styles.aaaaa}>
          {filterDate
            ? `Fecha seleccionada: ${filterDate}`
            : 'Seleccionar Fecha'}
        </Text>
      </TouchableOpacity>

      {/* Componente del calendario como modal */}
      <DatePickerModal
        visible={showCalendar}
        onClose={() => setShowCalendar(false)}
        onSelectDate={onSelectDate}
        selectedDate={filterDate}
        onClearDate={onClearDate} // Pasar la función para borrar el filtro
      />

      <FlatList
        data={filteredSales}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleSaleClick(item)}>
            <View style={styles.saleItem}>
              <Text style={styles.saleText}>Fecha: {item.date}</Text>
              <Text style={styles.saleText}>Cliente: {item.clientName}</Text>
              <Text style={styles.saleText}>Total: ₲{item.total}</Text>
            </View>
          </TouchableOpacity>
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
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  calendarButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginBottom: 15,
  },
  calendarButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  saleItem: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saleText: {
    fontSize: 16,
    color: '#555',
  },
});

export default SaleList;
