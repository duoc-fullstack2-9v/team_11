function Carrito() {
    return (
    <>  
        <div className="wrapper">
            <aside>
                <header>
                    <h1 className="logo">Level Up Gamer</h1>
                </header>
                <nav>
                    <ul>
                        <li>
                            <a className="boton-volver" href="./LevelUpGamer.html">
                                <i className="bi bi-arrow-left-circle-fill"></i>Seguir comprando
                            </a>
                        </li>
                        
                        <li>
                            <a className="boton-carrito active" href="./carrito.html">
                                <i className="bi bi-cart-fill"></i>Carrito
                            </a>
                        </li>
                    
                    </ul>
                
                </nav>
                <footer>
                    <p className="texto-footer">© 2025</p>
                </footer>


            </aside>
            <main>
                <h2 className="titulo-principal">Todos los productos</h2>
                <div className="contenedor-carrito">
                    <p className="carrito-vacio">Tu carrito esta vacio. <i className="bi bi-emoji-frown"></i></p>
                    <div className="carrito-productos disabled">
                        <div className="carrito-producto">
                            <img className= "carrito-producto-imagen" src="./imgs/catan900x1200.w610.h610.backdrop.webp" alt=""/>
                            <div className="carrito-producto-titulo">
                                <small>Titulo</small>
                                <h3>Catan</h3>
                            </div>
                            <div clss="carrito-producto-cantidad">
                                <small>Cantidad</small>
                                <p>1</p>
                            </div>
                            <div className="carrito-producto-precio">
                                <small>Precio</small>
                                <p>$29.990</p>
                            </div>
                            <div className="carrito-producto-subtotal">
                                <small>Subtotal</small>
                                <p>$29.990</p> 
                            </div>
                            <button className="carrito-producto-eliminar">Eliminar <i className="bi bi-trash-fill"></i></button>
                        </div>
                        <div className="carrito-producto">
                            <img className= "carrito-producto-imagen" src="./imgs/2000370634407-1.jpg" alt=""/>
                            <div className="carrito-producto-titulo">
                                <small>Titulo</small>
                                <h3>Carcassonne</h3>
                            </div>
                            <div clss="carrito-producto-cantidad">
                                <small>Cantidad 2</small>
                                <p>1</p>
                            </div>
                            <div className="carrito-producto-precio">
                                <small>Precio</small>
                                <p>$12.000</p>
                            </div>
                            <div className="carrito-producto-subtotal">
                                <small>Subtotal</small>
                                <p>$24.000</p> 
                            </div>
                            <button className="carrito-producto-eliminar">Eliminar<i className="bi bi-trash-fill"></i></button>
                        </div>
                    </div>
                    <div className="carrito-acciones disabled">
                        <div className="carrito-acciones-izquierda">
                            <button className="carrito-acciones-vaciar">Vaciar carrito</button>

                        </div>
                        <div className="carrito-aciciones-derecha">
                            <div className="carrito-acciones-total">
                                <p>Total a pagar:</p>
                                <p id="total">3.000</p>
                            </div>
                            <button className="carrito-acciones-comprar">Comprar </button>
                            <p className="carrito-comprado disabled">¡Gracias por tu compra!<i className="bi bi-emoji-laughing-fill"></i></p>

                        </div>

                    </div>
                </div>

            </main>

        </div>

    </>
    )
}

export default Carrito;