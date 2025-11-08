import React, { createContext, useState, useContext } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (productoAAgregar) => {
    //Normalizar la URL de la imagen (clave para que se muestre bien)
    const imagenNormalizada = productoAAgregar.imagen?.startsWith("http")
      ? productoAAgregar.imagen
      : `${window.location.origin}${productoAAgregar.imagen}`;

    setCarrito((currentCarrito) => {
      const existe = currentCarrito.find((p) => p.id === productoAAgregar.id);

      if (existe) {
        // Si ya existe, aumenta la cantidad
        return currentCarrito.map((p) =>
          p.id === productoAAgregar.id
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      } else {
        // Si es nuevo, lo agrega con cantidad inicial 1
        return [
          ...currentCarrito,
          { ...productoAAgregar, imagen: imagenNormalizada, cantidad: 1 },
        ];
      }
    });
  };

  // Disminuir cantidad o eliminar
  const eliminarDelCarrito = (idADisminuir) => {
    setCarrito((currentCarrito) => {
      return currentCarrito.flatMap((producto) => {
        if (producto.id === idADisminuir) {
          if (producto.cantidad > 1) {
            return { ...producto, cantidad: producto.cantidad - 1 };
          } else {
            return []; // elimina el producto si llega a 0
          }
        }
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
