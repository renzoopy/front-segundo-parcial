import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {CartProvider} from './src/context/CartContext';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  CategoryStack,
  ProductStack,
  MainStack,
  SaleStack,
} from './src/navigation/AppNavigator';
import TagsIcon from './src/assets/icons/tags.svg';
import BoxesIcon from './src/assets/icons/boxes.svg';
import FileIcon from './src/assets/icons/file.svg';

const Drawer = createDrawerNavigator();

// Contenido personalizado del Drawer
const CustomDrawerContent = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: '#f73d58', padding: 20}}>
        <Text style={{color: 'white', fontSize: 20}}>Carrito de compras</Text>
      </View>

      <TouchableOpacity
        style={{
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('CategoryStack')}>
        <TagsIcon width={24} height={24} marginRight={20} />
        <Text>Categorías</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('ProductStack')}>
        <BoxesIcon width={24} height={24} marginRight={20} />
        <Text>Productos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('SaleStack')}>
        <FileIcon width={24} height={24} marginRight={20} />
        <Text>Ventas</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <CartProvider>
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={props => <CustomDrawerContent {...props} />}
            screenOptions={{
              drawerStyle: {width: '90%'}, // El Drawer ocupará el 90% de la pantalla
            }}>
            {/* Pantalla principal */}
            {/* Navegación para Ventas */}
            <Drawer.Screen
              name="MainStack"
              component={MainStack}
              options={{headerShown: false}} // El header lo gestiona el stack
            />

            {/* Navegación para Categorías */}
            <Drawer.Screen
              name="CategoryStack"
              component={CategoryStack}
              options={{headerShown: false}} // El header lo gestiona el stack
            />
            {/* Navegación para Productos */}
            <Drawer.Screen
              name="ProductStack"
              component={ProductStack}
              options={{headerShown: false}} // El header lo gestiona el stack
            />
            {/* Navegación para Ventas */}
            <Drawer.Screen
              name="SaleStack"
              component={SaleStack}
              options={{headerShown: false}} // El header lo gestiona el stack
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </CartProvider>
    </GestureHandlerRootView>
  );
}
