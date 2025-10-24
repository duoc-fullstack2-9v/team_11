import React, { createContext, useState, useContext } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (productoAAgregar) => {
        setCarrito(currentCarrito => {
            const existe = currentCarrito.find(p => p.id === productoAAgregar.id);

            if (existe) {
                // Lógica de agregar: siempre aumenta la cantidad
                return currentCarrito.map(p =>
                    p.id === productoAAgregar.id
                        ? { ...p, cantidad: p.cantidad + 1 }
                        : p
                );
            } else {
                return [...currentCarrito, { ...productoAAgregar, cantidad: 1 }];
            }
        });
    };
    
    // Disminuye la cantidad o elimina el producto 
    const eliminarDelCarrito = (idADisminuir) => {
        setCarrito(currentCarrito => {
            return currentCarrito.flatMap(producto => {
                if (producto.id === idADisminuir) {
                   
                    if (producto.cantidad > 1) {
                        // Devuelve el producto con la cantidad disminuida
                        return { ...producto, cantidad: producto.cantidad - 1 }; 
                    } else {
                        // 2. Si la cantidad es 1, no devuelve el producto (lo elimina del array).
                        return []; 
                    }
                }
                // Mantiene todos los demás productos sin cambios.
                return producto;
            });
        });
    };

    const contextValue = {
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito, 
    };

    return (
        <CarritoContext.Provider value={contextValue}>
            {children}
        </CarritoContext.Provider>
    );
};