import React, { createContext, useState, useContext } from 'react';

// 1. Crear el Contexto
const CarritoContext = createContext();

// 2. Hook personalizado para usar el carrito fácilmente
export const useCarrito = () => useContext(CarritoContext);

// 3. Proveedor del Contexto (Componente que envuelve la App)
export const CarritoProvider = ({ children }) => {
    // Estado donde se guarda la lista de productos
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (productoAAgregar) => {
        setCarrito(currentCarrito => {
            // Lógica para verificar si el producto ya existe y actualizar la cantidad, o añadirlo
            const existe = currentCarrito.find(p => p.id === productoAAgregar.id);

            if (existe) {
                // Si existe, aumenta la cantidad
                return currentCarrito.map(p =>
                    p.id === productoAAgregar.id
                        ? { ...p, cantidad: p.cantidad + 1 }
                        : p
                );
            } else {
                // Si no existe, añade el producto con cantidad 1
                return [...currentCarrito, { ...productoAAgregar, cantidad: 1 }];
            }
        });
    };
    
    // 💥 FUNCIÓN PARA ELIMINAR 💥
    const eliminarDelCarrito = (idAEliminar) => {
        setCarrito(currentCarrito => 
            // Crea un nuevo array excluyendo el producto con el ID proporcionado
            currentCarrito.filter(producto => producto.id !== idAEliminar)
        );
    };

    const contextValue = {
        carrito,
        agregarAlCarrito,
        // 💥 EXPOSICIÓN DE LA FUNCIÓN DE ELIMINAR 💥
        eliminarDelCarrito,
    };

    return (
        <CarritoContext.Provider value={contextValue}>
            {children}
        </CarritoContext.Provider>
    );
};