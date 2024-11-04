import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: -15,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchInput: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    color: '#000000',
  },
  itemContainer: {
    margin: 4,
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
  },
  deleteButton: {
    width: 24,
    height: 24,
    fill: '#f73d58',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f73d58',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
