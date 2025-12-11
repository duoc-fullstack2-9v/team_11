import { NavLink } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext.jsx";
import { useNavigate } from "react-router-dom";
import { getSession, endSession } from "../utils/auth";


import logo from "../assets/imgs/imagen_2025-09-05_021420718-removebg-preview.png";

function Header() {
  // Hook del carrito
  const { carrito } = useCarrito();

  // Hook de navegación
  const navigate = useNavigate();
  const sesion = getSession(); // null si no hay usuario

  const cerrarSesion = () => {
    endSession();
    navigate("/login");
  };

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
          {/* <li>
            <NavLink className="boton-menu boton login" to="/login">
              <i className="bi bi-person-raised-hand"></i> Iniciar sesión
            </NavLink>
          </li> */}

          {/* Iniciar sesión / Cerrar sesión */}
          {!sesion ? (
            // Mostrar "Iniciar sesión" si NO hay sesión
            <li>
              <NavLink className="boton-menu boton login" to="/login">
                <i className="bi bi-person-raised-hand"></i> Iniciar sesión
              </NavLink>
            </li>
          ) : (
            // Mostrar "Cerrar sesión" si SÍ hay sesión
            <li>
              <button
                className="boton-menu boton login"
                onClick={cerrarSesion}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left"
                }}
              >
                <i className="bi bi-box-arrow-right"></i> Cerrar sesión
              </button>
            </li>
          )}

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
