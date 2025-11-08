import { NavLink } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext.jsx";


import logo from "../assets/imgs/imagen_2025-09-05_021420718-removebg-preview.png";

function Header() {
  // Hook del carrito
  const { carrito } = useCarrito();

  // Calcular total de ítems
  const totalItems = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);

  return (
    <aside>
      
      <img className="logo-imagen" src={logo} alt="Logo de mi tienda" />

      <header>
        <h1 className="logo">Level Up Gamer</h1>
      </header>

      <nav>
        <ul className="menu">
          {/* Iniciar sesión */}
          <li>
            <NavLink className="boton-menu boton login" to="/login">
              <i className="bi bi-person-raised-hand"></i> Iniciar sesión
            </NavLink>
          </li>

          {/* Home */}
          <li>
            <NavLink className="boton-menu boton home" to="/">
              <i className="bi bi-hand-index-thumb-fill"></i> Home
            </NavLink>
          </li>

          {/* Catálogo */}
          <li>
            <NavLink className="boton-menu boton categoria" to="/productos">
              <i className="bi bi-hand-index-thumb-fill"></i> Catálogo
            </NavLink>
          </li>

          {/* Carrito */}
          <li>
            <NavLink className="boton-menu boton-carrito" to="/carrito">
              <i className="bi bi-cart-fill"></i> Carrito
              {totalItems > 0 && (
                <span id="numerito" className="numerito">
                  {totalItems}
                </span>
              )}
            </NavLink>
          </li>

          {/* Soporte */}
          <li>
            <a className="boton-menu boton categoria">
              <i className="bi bi-hand-index-thumb-fill"></i> Soporte
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Header;
