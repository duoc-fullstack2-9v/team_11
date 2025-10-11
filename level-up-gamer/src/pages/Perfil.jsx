import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css"; //se reutiliza estilo de login en perfil

function Perfil() {
    const navigate = useNavigate();

    // Datos de ejemplo de usuario
    const usuario = "pruebaUser";
    const correo = "prueba@correo.com";

    const handleLogout = () => {
        navigate("/login");
    }

    return (
        <>
            <main className="perfil-main auth-page">
                <div className="contenedor-perfil">
                    <section className="perfil-card">
                        <h2>Mi perfil</h2>
                        <div className="perfil-datos">
                            <img
                                className="perfil-foto"
                                src="./imgs/default-profile.png"
                                alt="Foto de perfil"
                                onerror={(e) => (e.currentTarget.style.display = "none")}
                            />
                            <p>
                                <strong>Usuario:</strong> <span id="perfil-usuario">—</span>
                            </p>
                            <p>
                                <strong>Correo:</strong> <span id="perfil-correo">—</span>
                            </p>
                        </div>

                        <div className="perfil-acciones">
                            <Link className="boton-primario" to="/productos">Ir al catálogo</Link>

                            <button className="boton-primario" onClick={handleLogout}>
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