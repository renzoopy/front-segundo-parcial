import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  itemContainer: {
    margin: 4,
    marginHorizontal: 25,
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  productPrice: {
    fontSize: 16,
    color: '#666',
  },
  footer: {
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    color: '#666',
    marginBottom: 10,
  },
  calendarButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f73d58',
    borderRadius: 5,
    alignItems: 'center',
  },
  calendarButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
