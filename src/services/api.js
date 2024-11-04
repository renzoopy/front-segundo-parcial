import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.6:3000', // URL del JSON server
});

//------------------------------------------------------------------ CATEGORÍAS
// Obtener todas las categorías
export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

// Obtener una categoría por ID
export const getCategoryById = async id => {
  const response = await api.get(`/categories/${id}`);
  return response.data;
};

// Agregar una nueva categoría
export const addCategory = async category => {
  const response = await api.post('/categories', category);
  return response.data;
};

// Actualizar una categoría existente
export const updateCategory = async (id, category) => {
  const response = await api.put(`/categories/${id}`, category);
  return response.data;
};

// Eliminar una categoría
export const deleteCategory = async id => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};

//------------------------------------------------------------------ PRODUCTOS
// Obtener todos los productos
export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

// Obtener un producto por ID
export const getProductById = async id => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Agregar un nuevo producto
export const addProduct = async product => {
  const response = await api.post('/products', product);
  return response.data;
};

// Actualizar un producto existente
export const updateProduct = async (id, product) => {
  const response = await api.put(`/products/${id}`, product);
  return response.data;
};

// Eliminar un producto
export const deleteProduct = async id => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

//------------------------------------------------------------------ VENTAS
// Obtener todos las ventas
export const getSales = async () => {
  const response = await api.get('/sales');
  return response.data;
};

// Agregar la función para registrar una venta
export const addSale = async sale => {
  const response = await api.post('/sales', sale);
  return response.data;
};

//------------------------------------------------------------------ CLIENTES
// Obtener todos los clientes
export const getClients = async () => {
  const response = await api.get('/clients');
  return response.data;
};

// Consultar cliente por id
export const getClient = async idClient => {
  const response = await api.get(`/clients/${idClient}`);
  return response.data; // Devuelve el cliente encontrado o null
};

// Agregar un nuevo cliente
export const addClient = async client => {
  const response = await api.post('/clients', client);
  return response.data;
};

// Consultar cliente por número de cédula
export const getClientByGovId = async govId => {
  const response = await api.get(`/clients?govId=${govId}`);
  return response.data.length > 0 ? response.data[0] : null; // Devuelve el cliente encontrado o null
};

// Consultar cliente por nombre
export const getClientByFirstName = async firstName => {
  const response = await api.get(`/clients?firstName=${firstName}`);
  return response.data; // Devuelve el cliente encontrado o null
};

// Consultar cliente por apellido
export const getClientByLastName = async LastName => {
  const response = await api.get(`/clients?lastName=${LastName}`);
  return response.data; // Devuelve el cliente encontrado o null
};
