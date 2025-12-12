import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  listarProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../services/productoService";
import { getSession } from "../utils/auth";

const ADMIN_EMAILS = ["admin@levelupgamer.com"];

export function Administracion() {
  const navigate = useNavigate();

  useEffect(() => {
    const sesion = getSession();
    if (!sesion) {
      navigate("/login");
      return;
    }

    // Normalizamos el correo (por si viene con mayúsculas o espacios)
    const correo = (sesion.correo || sesion.email || "").trim().toLowerCase();

    console.log("SESION:", sesion);
    console.log("CORREO USADO PARA VALIDAR:", correo);
    console.log("¿ES ADMIN?", ADMIN_EMAILS.includes(correo));

    if (!ADMIN_EMAILS.includes(correo)) {
      navigate("/");
    }
  }, [navigate]);

  const [datosProducto, setDatosProducto] = useState({
    nombre: "",
    precio: "",
    imagen: "",
  });

  // Nueva lista de productos
  const [productos, setProductos] = useState([]);

  // Edición de un producto
  const [editandoId, setEditandoId] = useState(null);

  const [errorForm, setErrorForm] = useState("");
  const [mensajeOk, setMensajeOk] = useState("");

  // Handler para el cambio en el campo de nombre
  const handleNombreChange = (e) => {
    setDatosProducto({
      ...datosProducto,
      nombre: e.target.value,
    });

    console.log(datosProducto);
  };

  // Handler para el cambio en el campo de precio
  const handlePrecioChange = (e) => {
    setDatosProducto({
      ...datosProducto,
      precio: e.target.value,
    });
  };

  // Handler para imagen del producto
  const handleImagenChange = (e) => {
    setDatosProducto({
      ...datosProducto,
      imagen: e.target.value,
    });
  };

  // Cargar productos desde API mockable.io
  const cargarProductos = async () => {
    try {
      const data = await listarProductos();
      setProductos(data);
    } catch (e) {
      console.error("Error al listar productos: ", e);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const validarFormulario = () => {
    if (!datosProducto.nombre.trim()) {
      setErrorForm("El nombre del producto es obligatorio.");
      return false;
    }
    if (!datosProducto.precio || Number(datosProducto.precio) <= 0) {
      setErrorForm("El precio debe ser un número mayor a 0.");
      return false;
    }
    if (!datosProducto.imagen.trim()) {
      setErrorForm("La URL de la imagen es obligatoria.");
      return false;
    }
    if (
      !datosProducto.imagen.startsWith("http://") &&
      !datosProducto.imagen.startsWith("https://")
    ) {
      setErrorForm("La URL de la imagen debe comenzar con http:// o https://");
      return false;
    }

    return true;
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorForm("");
    setMensajeOk("");
    if (!validarFormulario()) {
      return;
    }

    // armado del producto
    const producto = {
      titulo: datosProducto.nombre,
      precio: Number(datosProducto.precio),
      imagen: datosProducto.imagen,
    };

    try {
      if (editandoId) {
        // Actualizar producto existente
        await actualizarProducto(editandoId, producto);
        setEditandoId(null);
        setMensajeOk("Producto actualizado correctamente.");
      } else {
        // Crear nuevo producto
        await crearProducto(producto);
        setMensajeOk("Producto creado correctamente.");
      }

      // Limpiar el formulario
      setDatosProducto({ nombre: "", precio: "", imagen: "" });

      // Volver a cargar los productos
      await cargarProductos();
    } catch (e) {
      console.error("Error al guardar el producto: ", e);
    }

    //crearProducto(datosProducto);
  };

  // Botón editar (carga datos en el formulario)
  // handler
  const handleEditar = (prod) => {
    setDatosProducto({
      nombre: prod.titulo,
      precio: prod.precio,
      imagen: prod.imagen,
    });

    setEditandoId(prod.id);
  };

  // Botón eliminar
  // handler
  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que desea eliminar este producto?")) return;

    try {
      await eliminarProducto(id);
      // hay que volver a cargar los productos
      await cargarProductos();
    } catch (e) {
      console.error("Error al eliminar el producto: ", e);
    }
  };

  return (
    <div>
      <h1>Administración</h1>

      {/* FORMULARIO */}

      {errorForm && <p className="mensaje-error">{errorForm}</p>}
      {mensajeOk && <p className="mensaje-ok">{mensajeOk}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombreProducto">Nombre del Producto:</label>
          <input
            type="text"
            id="nombreProducto"
            name="nombreProducto"
            value={datosProducto.nombre}
            onChange={handleNombreChange}
          />
        </div>

        <div>
          <label htmlFor="precioProducto">Precio del Producto:</label>
          <input
            type="number"
            id="precioProducto"
            name="precioProducto"
            value={datosProducto.precio}
            onChange={handlePrecioChange}
          />
        </div>

        <div>
          <label htmlFor="imagenProducto">URL de Imagen</label>
          <input
            type="text"
            id="imagenProducto"
            name="imagen"
            placeholder="https://ejemplo.com/imagen.jpg"
            value={datosProducto.imagen}
            onChange={handleImagenChange}
          />
        </div>

        <button type="submit">
          {editandoId ? "Guardar Cambios" : "Agregar Producto"}
        </button>

        {editandoId && (
          <button
            type="button"
            onClick={() => {
              setEditandoId(null);
              setDatosProducto({ nombre: "", precio: "", imagen: "" });
            }}
          >
            Cancelar Edición
          </button>
        )}
      </form>

      {/* Listado de Productos */}
      <h2>Productos registrados</h2>

      {productos.length === 0 && <p>No hay productos registrados.</p>}

      <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Título</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>
                {p.imagen && (
                  <img
                    src={p.imagen}
                    alt={p.titulo}
                    width="60"
                    height="60"
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                  />
                )}
              </td>
              <td>{p.titulo}</td>
              <td>${p.precio.toLocaleString("es-CL")}</td>
              <td>
                <button onClick={() => handleEditar(p)}>Editar</button>
                <button onClick={() => handleEliminar(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
