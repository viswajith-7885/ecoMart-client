import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add product (checking by _id)
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        // increment quantity
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // add new with quantity 1
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Remove product
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  // Clear entire cart
  const clearCart = () => setCartItems([]);

  // Debugging: log whenever cartItems changes
  useEffect(() => {
    console.log("Cart updated:", cartItems);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
