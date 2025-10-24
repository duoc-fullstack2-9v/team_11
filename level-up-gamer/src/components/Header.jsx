import { NavLink, Link } from "react-router-dom";
// 💥 1. Importar el hook useCarrito
import { useCarrito } from "../context/CarritoContext.jsx";
// Asegúrate de que esta ruta sea correcta, si Header está en 'components', la ruta podría ser:
// import { useCarrito } from '../context/CarritoContext.jsx'; 

// Ya no necesitamos recibir la prop cantidadCarrito
function Header() {
    
    // 💥 2. Usar el hook para obtener el estado del carrito
    const { carrito } = useCarrito();

    // 💥 3. Calcular la cantidad total de ítems
    // Suma la propiedad 'cantidad' de cada producto en el carrito
    const totalItems = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);

    return (
        <aside>
            <img className="logo-imagen" src="/imgs/imagen_2025-09-05_021420718-removebg-preview.png"
                alt="Logo de mi tienda" />
            
            <header>
                <h1 className="logo">Level Up Gamer</h1>
            </header>
            
            <nav>
                <ul className="menu">
                    {/* Iniciar sesión */}
                    <li>
                        <NavLink className="boton-menu boton login " to="/login">
                            <i className="bi bi-person-raised-hand"></i>Iniciar sesion
                        </NavLink>
                    </li>

                    {/* Home */}
                    <li>
                        <NavLink className="boton-menu boton home" to="/">
                            <i className="bi bi-hand-index-thumb-fill"></i>Home
                        </NavLink>
                    </li>

                    {/* Catálogo */}
                    <li>
                        <NavLink className="boton-menu boton categoria" to="/productos">
                            <i className="bi bi-hand-index-thumb-fill"></i>Catalogo
                        </NavLink>
                    </li>

                    {/* Carrito */}
                    <li>
                        <NavLink className="boton-menu boton-carrito" to="/carrito">
                            <i className="bi bi-cart-fill"></i>Carrito
                            
                            {/* 💥 4. Mostrar el total de ítems si es mayor que 0 */}
                            {totalItems > 0 && (
                                <span id="numerito" className="numerito">
                                    {totalItems}
                                </span>
                            )}
                            
                            {/* Si totalItems es 0, no se muestra el span, que es el comportamiento deseado. */}
                        </NavLink>
                    </li>

                    {/* Soporte */}
                    <li>
                        <a className="boton-menu boton categoria"><i className="bi bi-hand-index-thumb-fill"></i>Soporte</a>
                    </li>
                </ul>
            </nav>
            <footer><p className="texto-footer">© 2025</p></footer>
        </aside>
    );
}
export default Header;