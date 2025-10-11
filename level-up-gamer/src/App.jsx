import { Routes, Route } from "react-router-dom";

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Productos from './pages/Productos.jsx';
import Carrito from './pages/Carrito.jsx';
import Perfil from './pages/Perfil.jsx';

import "./styles/main.css";

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productos" element={<Productos/>}/>
        <Route path="/carrito" element={<Carrito/>}/>
        <Route path="/perfil" element={<Perfil/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;