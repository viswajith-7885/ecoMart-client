import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import { useState } from "react";
import { Authcontext } from "./context/AuthContext";
import { ProductContext } from "./context/ProductContext";
import Myproducts from "./pages/Myproducts";

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  return (
    <Authcontext.Provider value={{ user, setUser }}>
      <ProductContext.Provider value={{ products, setProducts }}>
        <Router>
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/addproduct" element={<AddProduct />} />
              <Route path="/myproducts" element={<Myproducts />} />
            </Routes>
          </div>
        </Router>
      </ProductContext.Provider>
    </Authcontext.Provider>
  );
}

export default App;
