import { useCarrito } from "../context/CarritoContext.jsx"; 
import { Link } from "react-router-dom";

function Carrito() {
    const { carrito, eliminarDelCarrito } = useCarrito(); 

    // Calcula el total a pagar
    const totalPagar = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);

    // Formatea precios con separador de miles en formato chileno
    const formatPrecio = (precio) => new Intl.NumberFormat('es-CL').format(precio);

    return (
        <main>
            <h2 className="titulo-principal">Tu carrito de compras</h2>

            {carrito.length === 0 ? (
                <p className="carrito-vacio">
                    El carrito está vacío. <Link to="/productos">¡Ir a comprar!</Link>
                </p>
            ) : (
                <div className="contenedor-carrito">
                    {/*  Lista de productos en el carrito */}
                    <div className="carrito-productos">
                        {carrito.map((producto) => (
                            <div className="carrito-producto" key={producto.id}>
                                {/*  Imagen directa desde el import */}
                                <img 
                                    className="carrito-producto-imagen" 
                                    src={producto.imagen} 
                                    alt={producto.titulo} 
                                />

                                <div className="carrito-producto-titulo">
                                    <small>Título</small>
                                    <h3>{producto.titulo}</h3>
                                </div>

                                <div className="carrito-producto-cantidad">
                                    <small>Cantidad</small>
                                    <p>{producto.cantidad}</p>
                                </div>

                                <div className="carrito-producto-precio">
                                    <small>Precio</small>
                                    <p>${formatPrecio(producto.precio)}</p>
                                </div>

                                <div className="carrito-producto-subtotal">
                                    <small>Subtotal</small>
                                    <p>${formatPrecio(producto.precio * producto.cantidad)}</p>
                                </div>

                                <button 
                                    className="carrito-producto-eliminar"
                                    onClick={() => eliminarDelCarrito(producto.id)}
                                    title="Eliminar del carrito"
                                > 
                                    <i className="bi bi-trash-fill"></i>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Sección de total y acciones */}
                    <div className="carrito-acciones">
                        <div className="carrito-acciones-derecha">
                            <div className="carrito-acciones-total">
                                <p className="total-pagar">Total a pagar:</p>
                                <p id="total">${formatPrecio(totalPagar)}</p>
                            </div>

                            <button className="carrito-acciones-comprar">
                                Paga de forma segura
                            </button>

                            <p className="carrito-comprado disabled">
                                ¡Gracias por tu compra! <i className="bi bi-emoji-laughing-fill"></i>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Carrito;
