import { NavLink, Link } from "react-router-dom";

function Header({ cantidadCarrito = 0 }) {
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
                        <NavLink className="boton-menu boton login active" to="/login">
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
                            {/* Muestra la Prop recibida */}
                            <span id="numerito" className="numerito">{cantidadCarrito}</span>
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