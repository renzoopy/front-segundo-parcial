import React from 'react';
import {View, StyleSheet, Modal, TouchableOpacity, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';

const DatePickerModal = ({
  visible,
  onClose,
  onSelectDate,
  selectedDate,
  onClearDate,
}) => {
  const onDayPress = day => {
    const formattedDate = `${day.day}/${day.month}/${day.year}`; // Cambiar a formato dd-mm-aaaa
    onSelectDate(formattedDate);
    onClose(); // Cerrar modal después de seleccionar la fecha
  };

  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Calendar
            onDayPress={onDayPress}
            markedDates={{
              [selectedDate]: {
                selected: true,
                marked: true,
                selectedColor: 'blue',
              },
            }}
            theme={{
              selectedDayBackgroundColor: 'blue',
              todayTextColor: 'red',
              dayTextColor: 'black',
              monthTextColor: 'black',
              textDisabledColor: '#d9e1e8',
              textSectionTitleColor: 'black',
            }}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>

          {/* Botón para borrar el filtro de fecha */}
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              onClearDate();
              onClose();
            }}>
            <Text style={styles.clearButtonText}>Borrar Filtro</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Fondo semitransparente
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  clearButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FF4136', // Color para el botón de borrar
    borderRadius: 5,
  },
  clearButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default DatePickerModal;
