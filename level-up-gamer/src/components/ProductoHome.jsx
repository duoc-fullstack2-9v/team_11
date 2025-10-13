function ProductoHome({ producto, onAgregarClick }) {
    // 'producto' es la Prop que contiene { titulo, imagen, oferta, ... }
    const { id, titulo, imagen, precioAntiguo, oferta } = producto;

    return (
        <div className="producto-home">
            <img className="producto-home-imagen" src={imagen} alt={titulo} />
            <div className="producto-detalles-home">
                <h3 className="producto-titulo-home">{titulo}</h3>
                <p className="producto-precio-home">${precioAntiguo.toLocaleString()}</p>
                <p className="producto-precio-home-oferta">Oferta ${oferta.toLocaleString()}</p>
                {/* Llama a la función (Prop) al hacer click */}
                <button 
                    className="producto-agregar-home"
                    onClick={() => onAgregarClick(id)}
                >
                    Agregar
                </button>
            </div>
        </div>
    );
}

export default ProductoHome;