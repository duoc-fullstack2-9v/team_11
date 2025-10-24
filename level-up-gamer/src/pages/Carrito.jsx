// Carrito.jsx

import { Link } from "react-router-dom";
// 💥 1. Importa useCarrito (Ajusta la ruta si es necesario)
import { useCarrito } from '../context/CarritoContext.jsx'; 
// Asegúrate de que tu Contexto exponga 'useCarrito'

function Carrito() {
    // 💥 2. Obtiene el estado 'carrito' y la función de eliminación
    const { carrito, eliminarDelCarrito } = useCarrito(); 
    
    // Calcula el total (simple suma, asumiendo precio es un número)
    const totalPagar = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);

    // Función para formatear el precio (opcional, pero ayuda)
    const formatPrecio = (precio) => new Intl.NumberFormat('es-CL').format(precio);

    return (
        <>
            <main>
                <h2 className="titulo-principal">Tu carrito de compras</h2>
                
                {carrito.length === 0 ? (
                    <p className="carrito-vacio">El carrito está vacío. ¡A comprar!</p>
                ) : (
                    <div className="contenedor-carrito">
                        <div className="carrito-productos">
                            
                            {/* 💥 3. Itera sobre la lista REAL de productos */}
                            {carrito.map((producto) => (
                                <div className="carrito-producto" key={producto.id}>
                                    <img className="carrito-producto-imagen" src={producto.imagen} alt={producto.titulo} />
                                    
                                    <div className="carrito-producto-titulo">
                                        <small>Titulo</small>
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
                                    
                                    {/* 💥 4. Llama a la función de eliminación con el ID */}
                                    <button 
                                        className="carrito-producto-eliminar"
                                        onClick={() => eliminarDelCarrito(producto.id)}
                                    > 
                                        <i className="bi bi-trash-fill"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                        
                        <div className="carrito-acciones">
                            <div className="carrito-acciones-derecha">
                                <div className="carrito-acciones-total">
                                    <p className="total-pagar">Total a pagar:</p>
                                    <p id="total">${formatPrecio(totalPagar)}</p>
                                </div>
                                <button className="carrito-acciones-comprar">Paga de forma segura</button>
                                <p className="carrito-comprado disabled">¡Gracias por tu compra!<i className="bi bi-emoji-laughing-fill"></i></p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}

export default Carrito;