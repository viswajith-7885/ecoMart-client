import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import {  useState } from "react";
import { Authcontext } from "./context/AuthContext";
import { ProductContext } from "./context/ProductContext";
import Myproducts from "./pages/Myproducts";
import UpdateProduct from "./pages/UpdateProduct";
import ProductView from "./pages/ProductView";
import ChatUI from "./pages/Chatpage";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartProvider";

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [updatepro, setUpdatepro] = useState([]);
 

  return (
    <Authcontext.Provider value={{ user, setUser }}>
      <ProductContext.Provider
        value={{ products, setProducts, updatepro, setUpdatepro }}
      >
      <CartProvider>
      
        <Router>
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/addproduct" element={<AddProduct />} />
              <Route path="/myproducts" element={<Myproducts />} />
              <Route path="/updatepro/:id" element={<UpdateProduct />} />
              <Route path="/productview/:id" element={<ProductView />} />
              <Route path="/chat" element={<ChatUI />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </Router>
        </CartProvider>
      </ProductContext.Provider>
    </Authcontext.Provider>
  );
}

export default App;
