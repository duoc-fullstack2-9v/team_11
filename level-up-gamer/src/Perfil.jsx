function Perfil() {
    return (
    <>
        <div className="wrapper">
            <aside>
                <img className="logo-imagen" src="./imgs/imagen_2025-09-05_021420718-removebg-preview.png" alt="Logo de mi tienda"/>
                <header><h1 className="logo">Level Up Gamer</h1></header>

                <nav>
                    <ul className="menu">
                        <li>
                            <a className="boton-menu boton perfil active" href="./perfil.html"><i className="bi bi-person-circle"></i>Perfil</a>
                        </li>
                        <li>
                            <a className="boton-menu boton home" href="./Home.html"><i className="bi bi-hand-index-thumb-fill"></i>Home</a>
                        </li>
                        <li>
                            <a className="boton-menu boton categoria" href="./LevelUpGamer.html"><i className="bi bi-hand-index-thumb-fill"></i>Catalogo</a>
                        </li>
                        <li>
                            <a className="boton-menu boton-carrito" href="./carrito.html">
                                <i className="bi bi-cart-fill"></i>Carrito<span id="numerito" className="numerito">0</span>
                            </a>
                        </li>
                        <li>
                            <a className="boton-menu boton categoria"><i className="bi bi-hand-index-thumb-fill"></i>Soporte</a>
                        </li>
                    </ul>
                </nav>

                <footer>
                    <p className="texto-footer">© 2025</p>
                </footer>
            </aside>

            <main className="perfil-main">
                <div className="contenedor-perfil">
                <section className="perfil-card">
                    <h2>Mi perfil</h2>
                    <div className="perfil-datos">
                        <img className="perfil-foto" src="./imgs/default-profile.png" alt="Foto de perfil" onerror="this.style.display='none'"/>
                        <p><strong>Usuario:</strong> <span id="perfil-usuario">—</span></p>
                        <p><strong>Correo:</strong> <span id="perfil-correo">—</span></p>
                    </div>

                    <div className="perfil-acciones">
                        <a className="boton-primario" href="./LevelUpGamer.html">Ir al catálogo</a>
                        <button id="logoutBtn" className="boton-primario" type="button">Cerrar sesión</button>
                    </div>
                </section>
                </div>
            </main>
        </div>

    </>
    )
}

export default Perfil;