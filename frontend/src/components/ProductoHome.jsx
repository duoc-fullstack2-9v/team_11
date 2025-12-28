function ProductoHome({ producto, onAgregarClick }) {
  const { id, titulo, imagen, precioAntiguo, oferta } = producto;

  return (
    <div className="producto-home">
      <img className="producto-home-imagen" src={imagen} alt={titulo} />

      <div className="producto-detalles-home">
        <h3 className="producto-titulo-home">{titulo}</h3>

        {/* Precio tachado */}
        <p className="producto-precio-home">
          <s>${precioAntiguo.toLocaleString()}</s>
        </p>

        {/* Precio en oferta */}
        <p className="producto-precio-home-oferta">
          Oferta ${oferta.toLocaleString()}
        </p>

        {/* Agregar al carrito */}
        <button
          className="producto-agregar-home"
          onClick={() => onAgregarClick(producto)}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}

export default ProductoHome;
