import { useState } from "react";
import { CartContext } from "./cartcontext";




export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);


  const addToCart = (product,id) => {
    setCartItems((prev) => {
      // check if product already in cart
      const exists = prev.find(item => item.id === id);
      if (exists) {
        // increment quantity if already in cart
        return prev.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // add new product with quantity 1
      return [...prev, { ...product, quantity: 1 }];
    });
    console.log(cartItems);
    
  };

  const removeFromCart = (id) => {
    console.log(id);
    // const filterCart=cartItems.filter((e)=>e._id!==id)
    // console.log(filterCart);
    
    // setCartItems(filterCart)
    setCartItems((prev) => prev.filter(item => item._id !== id));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
