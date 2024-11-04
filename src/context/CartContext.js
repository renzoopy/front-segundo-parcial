import React, {createContext, useState, useContext, useEffect} from 'react';

// Crea el contexto del carrito
const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const addToCart = product => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.idProduct === product.idProduct,
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.idProduct === product.idProduct
            ? {...item, quantity: product.quantity}
            : item,
        );
      } else {
        return [...prevItems, product];
      }
    });
  };

  const removeFromCart = idProduct => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.idProduct !== idProduct),
    );
  };

  // Actualiza el total cada vez que cambia el carrito
  useEffect(() => {
    const newTotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    setTotal(newTotal);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{cartItems, total, addToCart, removeFromCart}}>
      {children}
    </CartContext.Provider>
  );
};
