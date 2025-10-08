function Productos() {
    return (
    <>
        <div className="wrapper">
            <aside>
                <img className="logo-imagen" src="./imgs/imagen_2025-09-05_021420718-removebg-preview.png" alt="Logo de mi tienda"/>
            
            
                <header>
                    <h1 className="logo">Level Up Gamer</h1>
                </header>
                <nav>
                    <ul className="menu">
                        <li>
                            <a className="boton-menu boton login active" href="./Login.html"><i
                                    className="bi bi-person-raised-hand"></i>Iniciar sesion</a>
                        </li>
                        <li>
                            <a className="boton-menu boton home" href="./Home.html"><i
                                    className="bi bi-hand-index-thumb-fill"></i>Home</a>
                        </li>
                        <li>
                            <a className="boton-menu boton categoria" href="./LevelUpGamer.html"><i
                                    className="bi bi-hand-index-thumb-fill"></i>Catalogo</a>
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
            <main>
                <h2 className="titulo-principal">Compra los mejores productos al mejor precio!</h2>
                <div className="contenedor-producto">
                    <div className="producto">
                        <img className="producto-imagen" src="./imgs/street x tekken.webp" alt=""/>
                        <div className="producto-detalles">
                            <h3 className="producto-titulo">Street Figther vs Tekken</h3>
                            <p className="producto-precio">$29.990</p>
                            <button className="producto-agregar">Agregar</button>
                        </div>
                    </div>
                    <div className="producto">
                        <img className="producto-imagen" src="./imgs/elden-ring-portada.jpg" alt=""/>
                        <div className="producto-detalles">
                            <h3 className="producto-titulo">Elden Ring</h3>
                            <p className="producto-precio">$29.990</p>
                            <button className="producto-agregar">Agregar</button>
                        </div>
                    </div>
                    <div className="producto">
                        <img className="producto-imagen" src="./imgs/skyrim.webp" alt=""/>
                        <div className="producto-detalles">
                            <h3 className="producto-titulo">Skyrim </h3>
                            <p className="producto-precio">$29.990</p>
                            <button className="producto-agregar">Agregar</button>
                        </div>
                    </div>
                    <div className="producto">
                        <img className="producto-imagen" src="./imgs/redDead.avif" alt=""/>
                        <div className="producto-detalles">
                            <h3 className="producto-titulo">Red dead redemption ll</h3>
                            <p className="producto-precio">$29.990</p>
                            <button className="producto-agregar">Agregar</button>
                        </div>
                    </div>
                    <div className="producto">
                        <img className="producto-imagen" src="./imgs/silenciogill.png" alt=""/>
                        <div className="producto-detalles">
                            <h3 className="producto-titulo">Sillent hill F</h3>
                            <p className="producto-precio">$29.990</p>
                            <button className="producto-agregar">Agregar</button>
                        </div>
                    </div>
                    <div className="producto">
                        <img className="producto-imagen" src="./imgs/resident-evil-4-hd-proyect-generacionxbox.jpg" alt=""/>
                        <div className="producto-detalles">
                            <h3 className="producto-titulo">Resident evil 4</h3>
                            <p className="producto-precio">$29.990</p>
                            <button className="producto-agregar">Agregar</button>
                        </div>
                    </div>
                    <div className="producto">
                        <img className="producto-imagen" src="./imgs/resident7.avif" alt=""/>
                        <div className="producto-detalles">
                            <h3 className="producto-titulo">Resident evil 7</h3>
                            <p className="producto-precio">$29.990</p>
                            <button className="producto-agregar">Agregar</button>
                        </div>
                    </div>
                    <div className="producto">
                        <img className="producto-imagen" src="./imgs/BioShock_cover.jpg" alt=""/>
                        <div className="producto-detalles">
                            <h3 className="producto-titulo">Bioshock </h3>
                            <p className="producto-precio">$29.990</p>
                            <button className="producto-agregar">Agregar</button>
                        </div>
                    </div>
                    <div className="producto">
                        <img className="producto-imagen" src="./imgs/devilmycry.jpg" alt=""/>
                        <div className="producto-detalles">
                            <h3 className="producto-titulo">Devil my cry 5</h3>
                            <p className="producto-precio">$29.990</p>
                            <button className="producto-agregar">Agregar</button>
                        </div>
                    </div>
                    <div className="producto">
                        <img className="producto-imagen" src="./imgs/lamamu.jpg" alt=""/>
                        <div className="producto-detalles">
                            <h3 className="producto-titulo">Bayonetta'</h3>
                            <p className="producto-precio">$29.990</p>
                            <button className="producto-agregar">Agregar</button>
                        </div>
                    </div>


                </div>

            </main>

        </div>

    </>
    )
}

export default Productos;