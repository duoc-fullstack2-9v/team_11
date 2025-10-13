import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSession, endSession } from "../utils/auth";
import "../styles/login.css"; //se reutiliza estilo de login en perfil

function Perfil() {
    const navigate = useNavigate();

    /* Estado con los datos del usuario */
    const [usuarioSesion, setUsuarioSesion] = useState(null);

    useEffect(() => {
        const sesion = getSession();
        if (!sesion) {
            navigate("/login");
        } else {
            setUsuarioSesion(sesion);
        }
    }, [navigate]
    );

    /* Cierre de sesión */
    const cerrarSesion = () => {
        endSession();
        navigate("/login");
    }

    if (!usuarioSesion) return null;

    return (
        <>
            <main className="perfil-main auth-page">
                <div className="contenedor-perfil">
                    <section className="perfil-card">
                        <h2>Mi perfil</h2>
                        <div className="perfil-datos">
                            <img
                                className="perfil-foto"
                                src="/imgs/default-profile.png"
                                alt="Foto de perfil"
                                onError={(e) => (e.currentTarget.style.display = "none")}
                            />
                            <p>
                                <strong>Usuario:</strong> <span>{usuarioSesion.usuario}</span>
                            </p>
                            <p>
                                <strong>Correo:</strong> <span>{usuarioSesion.correo}</span>
                            </p>
                        </div>

                        <div className="perfil-acciones">
                            <Link className="boton-primario" to="/productos">Ir al catálogo</Link>

                            <button className="boton-primario" onClick={cerrarSesion}>
                                Cerrar sesión
                            </button>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

export default Perfil;