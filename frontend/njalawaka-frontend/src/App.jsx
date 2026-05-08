import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Equipment from "./pages/Equipment";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Animals from "./pages/Animals";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/equipment" element={<Equipment />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<Admin />} />  
      <Route path="/login" element={<Login />} />  
      <Route path="/animals" element={<Animals/>}/>
      <Route path="/register" element={<Register />} />	
    </Routes>
  );
}

export default App;