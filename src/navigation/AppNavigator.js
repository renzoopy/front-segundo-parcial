import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CategoryList from '../components/categories/CategoryList';
import AddCategory from '../components/categories/AddCategory';
import EditCategory from '../components/categories/EditCategory';
import ProductList from '../components/products/ProductList';
import AddProduct from '../components/products/AddProduct';
import EditProduct from '../components/products/EditProduct';
import {TouchableOpacity} from 'react-native';
import ArrowBackIcon from '../assets/icons/arrow-back.svg';
import BarsIcon from '../assets/icons/bars.svg';

import SaleScreen from '../screens/SaleScreen';
import CartScreen from '../screens/CartScreen';
import Client from '../components/clients/Client';
import SaleList from '../components/sales/SaleList';
import SaleDetails from '../components/sales/SaleDetails';

const Stack = createStackNavigator();

// Stack para Categorías
export const CategoryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CategoryList"
        component={CategoryList}
        options={({navigation}) => ({
          title: 'Categorías',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginLeft: 15}}>
              <ArrowBackIcon width={24} height={24} fill="#000000" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="AddCategory"
        component={AddCategory}
        options={{title: 'Agregar Categoría'}}
      />
      <Stack.Screen
        name="EditCategory"
        component={EditCategory}
        options={{title: 'Editar Categoría'}}
      />
    </Stack.Navigator>
  );
};

// Stack para Productos
export const ProductStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductList}
        options={({navigation}) => ({
          title: 'Productos',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginLeft: 15}}>
              <ArrowBackIcon width={24} height={24} fill="#000000" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={{title: 'Agregar Producto'}}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProduct}
        options={{title: 'Editar Producto'}}
      />
    </Stack.Navigator>
  );
};

// Stack principal
export const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={SaleScreen}
        options={({navigation}) => ({
          title: 'Home',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{marginLeft: 20}}>
              <BarsIcon width={20} height={20} fill="#000000" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{title: 'Carrito'}}
      />
      <Stack.Screen
        name="Client"
        component={Client}
        options={{title: 'Cliente'}}
      />
    </Stack.Navigator>
  );
};

// Stack para ventas
export const SaleStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SaleList"
        component={SaleList}
        options={({navigation}) => ({
          title: 'Ventas',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginLeft: 15}}>
              <ArrowBackIcon width={24} height={24} fill="#000000" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="SaleDetails"
        component={SaleDetails}
        options={{title: 'Detalles de Venta'}}
      />
    </Stack.Navigator>
  );
};
