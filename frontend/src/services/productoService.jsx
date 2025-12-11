import axios from "axios";

const API_URL = "http://ec2-3-212-50-160.compute-1.amazonaws.com/productos"; // REEMPLAZAR CON LA URL DE NUESTRA API
//const API_URL = "http://localhost:8080/productos"; // PARA PROBAR LOCALMENTE

const urlConId = (id) => `${API_URL}/${id}`;

// Listar todos los productos
export const listarProductos = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (e) {
        console.error("Error al listar productos: ", e);
        throw e;
    }
};

// Obtener un producto por Id
export const obtenerProductoPorId = async (id) => {
    try {
        const response = await axios.get(urlConId(id));
        return response.data;        
    } catch (e) {
        console.error("Erros al obtener producto por id: " + id, ": ", e);
        throw e;
    }
};

// Crear un producto
export const crearProducto = async (producto) => {
    try {
        const response = await axios.post(API_URL, producto);
        return response.data;
    } catch (e) {
        console.error("Error al crear el producto: ", e);
        throw e;        
    }
};

// Axtualizar producto
export const actualizarProducto = async (id, producto) => {
    try {
        const response = await axios.put(urlConId(id), producto);
        return response.data;    
    } catch (e) {
        console.error("Error al actualizar el producto con id " + id, ": ", e);
        throw e;        
    }
};

// Eliminar un producto
export const eliminarProducto = async (id) => {
    try {
        const response = await axios.delete(urlConId(id));
        return response.data;
    } catch (e) {
        console.error("Error al eliminar el producto con id " + id, ": ", e);
        throw e;        
    }
}