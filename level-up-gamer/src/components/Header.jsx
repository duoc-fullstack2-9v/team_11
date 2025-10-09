import{ link } from react-router-dom;

function Header(){
    return(
        <aside> 
            <img class="logo-imagen" src="./imgs/imagen_2025-09-05_021420718-removebg-preview.png"
            alt="Logo de mi tienda"/>
          <header>
            <h1 className="logo">Level Up Gamer</h1>
          </header>
          <nav>
            <ul className="menu">
                <li>
                    
                    <Link className="boton-menu boton login active" to="/login">
                        <i className="bi bi-person-raised-hand"></i>Iniciar sesion
                    </Link>
                </li>
                 <li>
                    <Link className="boton-menu boton home" to="/">
                        <i className="bi bi-hand-index-thumb-fill"></i>Home
                    </Link>
                </li>
                <li>
                    <Link className="boton-menu boton categoria" to="/productos">
                        <i className="bi bi-hand-index-thumb-fill"></i>Catalogo
                    </Link>
                </li>
                <li>
                    <Link className="boton-menu boton-carrito" to="/carrito">
                        <i className="bi bi-cart-fill"></i>Carrito
                        {/* Muestra la Prop recibida */}
                        <span id="numerito" className="numerito">{cantidadCarrito}</span>
                    </Link>
                </li>
                <li>
                    <a className="boton-menu boton categoria"><i className="bi bi-hand-index-thumb-fill"></i>Soporte</a>
                </li>
            </ul>
        </nav>
        
        </aside>
    );

}
export default Header;