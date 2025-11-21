import { useState } from "react";
import { crearProducto } from "../services/productoService";

export function Administracion() {

    const [datosProducto, setDatosProducto] = useState({
        nombre: '',
        precio: ''
    });

    const handleNombreChange = (e) => {
        setDatosProducto({
            ...datosProducto,
            nombre: e.target.value
        });

        console.log(datosProducto);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        crearProducto(datosProducto);
    }

    return <div>

        <h1>Administración</h1>

        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="nombreProducto">Nombre del Producto:</label>
                <input type="text" id="nombreProducto" name="nombreProducto" onChange={handleNombreChange} />
            </div>

            <div>
                <label htmlFor="precioProducto">Precio del Producto:</label>
                <input type="number" id="precioProducto" name="precioProducto" />
            </div>

            <button type="submit">Agregar Producto</button>
        </form>
    </div>;
}