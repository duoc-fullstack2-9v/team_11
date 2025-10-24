// ProductoAgregar.jsx

import React from 'react';
// 💥 1. Importa el hook real desde tu archivo de Contexto
import { useCarrito } from './context/CarritoContext'; // <-- AJUSTA ESTA RUTA si es necesario

function ProductoAgregar({ producto }) {
  // 💥 2. Usa el hook real para obtener la función
  const { agregarAlCarrito } = useCarrito();

  const handleClick = () => {
    agregarAlCarrito(producto);
    alert(`¡${producto.titulo} agregado al carrito!`);
  };

  return (
    <button
      className="producto-agregar-home"
      onClick={handleClick}
    >
      Agregar
    </button>
  );
}

export default ProductoAgregar;