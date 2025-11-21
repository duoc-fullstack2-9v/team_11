import { Routes, Route } from "react-router-dom";

//  Importar el Proveedor del Contexto del Carrito
import { CarritoProvider } from './context/CarritoContext.jsx'; 

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Productos from './pages/Productos.jsx';
import Carrito from './pages/Carrito.jsx';
import Perfil from './pages/Perfil.jsx';

import "./styles/main.css";
import { Administracion } from "./pages/Administracion.jsx";

function App() {
  return (
    //  Envolver toda la aplicación con el CarritoProvider
    <CarritoProvider> 
      <div className="wrapper">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/administracion" element={<Administracion />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CarritoProvider>
  );
}

export default App;