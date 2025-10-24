import { Link } from "react-router-dom";

function Carrito() {
    return (
        <>
            <main>
                <h2 className="titulo-principal">Tu carrito de compras</h2>
                <ul className="acciones-carrito-local">
                   

                   
                </ul>

                <div className="contenedor-carrito">
                    
                    <div className="carrito-productos disabled">
                        <div className="carrito-producto">
                            <img className="carrito-producto-imagen" src="/imgs/skyrim.webp" alt="" />
                            <div className="carrito-producto-titulo">
                                <small>Titulo</small>
                                <h3>Skyrim</h3>
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
                            <img className="carrito-producto-imagen" src="/imgs/resident-evil-4-hd-proyect-generacionxbox.jpg" alt="" />
                            <div className="carrito-producto-titulo">
                                <small>Titulo</small>
                                <h3>Resident evil 4</h3>
                            </div>
                            <div clss="carrito-producto-cantidad">
                                <small>Cantidad 1</small>
                                <p>1</p>
                            </div>
                            <div className="carrito-producto-precio">
                                <small>Precio</small>
                                <p>$39.990</p>
                            </div>
                            <div className="carrito-producto-subtotal">
                                <small>Subtotal</small>
                                <p>$24.000</p>
                            </div>
                            <button className="carrito-producto-eliminar"><i className="bi bi-trash-fill"></i></button>
                        </div>
                    </div>
                    <div className="carrito-acciones disabled">
                       
                        <div className="carrito-aciciones-derecha">
                            <div className="carrito-acciones-total">
                                <p className="total-pagar">Total a pagar:</p>
                                <p id="total">3.000</p>
                            </div>
                            <button className="carrito-acciones-comprar">Paga de forma segura </button>
                            <p className="carrito-comprado disabled">¡Gracias por tu compra!<i className="bi bi-emoji-laughing-fill"></i></p>

                        </div>

                    </div>
                </div>

            </main>


        </>
    )
}

export default Carrito;