import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { findUser, saveUser, startSession } from "../utils/auth";
import "../styles/inicioSesion.css";

function InicioSesion() {
    const [view, setView] = useState("inicioSesion");
    const [error, setError] = useState("");
    const navigate = useNavigate(); //esto debería redirigir tras inicioSesion

    const iniciarSesion = e => {
        e.preventDefault();
        const formulario = new FormData(e.target);
        const usuario = formulario.get("usuario");
        const contrasena = formulario.get("contrasena");

        const user = findUser(usuario);
        if (!user || user.contrasena !== contrasena){
            setError("Usuario o contraseña incorrectos");
            return;
        }
        startSession(user);
        navigate("/perfil"); //redirige a perfil
    }

    const registrarse = (e) => {
        e.preventDefault();
        const formulario_reg = new FormData(e.target);
        const usuario = formulario_reg.get("usuario");
        const correo = formulario_reg.get("correo");
        const contrasena = formulario_reg.get("contrasena");

        if (findUser(usuario)) {
            setError("Ese usuario ya existe");
            return;
        }

        const nuevoUsuario = {usuario, correo, contrasena}; 
        saveUser(nuevoUsuario);
        startSession(nuevoUsuario);
        navigate("/perfil");
    }

    return (
        <>
            <main className="auth-page">
                <div className="contenedor-auth">
                    <div className="auth-caja">

                        <button
                            className="auth-switch"
                            onClick={() => {
                                setError("");
                                setView(v => (v === "inicioSesion" ? "registro" : "inicioSesion"));
                            }}
                        >
                            {view === "inicioSesion" ? "Registrarse" : "Iniciar sesión"}
                        </button>

                        {error && <p className="mensaje-error">{error}</p>}

                        {view === "inicioSesion" && (
                            <section className="auth-card">
                                <h2>Iniciar sesión</h2>
                                <form className="formulario" onSubmit={iniciarSesion}>
                                    <div className="formulario-grupo">
                                        <label htmlFor="usuario">Usuario</label>
                                        <input
                                            id="usuario"
                                            name="usuario"
                                            required className="formulario-control"
                                        />
                                    </div>
                                    <div className="formulario-grupo">
                                        <label htmlFor="contrasena">Contraseña</label>
                                        <input
                                            type="password"
                                            id="contrasena"
                                            name="contrasena"
                                            required className="formulario-control"
                                        />
                                    </div>
                                    <button className="boton-primario">Ingresar
                                    </button>
                                </form>
                            </section>
                        )}

                        {view === "registro" && (
                            <section className="auth-card">
                                <h2>Registrarse</h2>
                                <form className="formulario" onSubmit={registrarse}>
                                    <div className="formulario-grupo">
                                        <label htmlFor="reg-usuario">Nombre de usuario</label>
                                        <input
                                            id="reg-usuario"
                                            name="usuario"
                                            required className="formulario-control"
                                        />
                                    </div>
                                    <div className="formulario-grupo">
                                        <label htmlFor="reg-correo">Correo</label>
                                        <input
                                            type="email"
                                            id="reg-correo"
                                            name="correo"
                                            required className="formulario-control"
                                        />
                                    </div>
                                    <div className="formulario-grupo">
                                        <label htmlFor="reg-contrasena">Contraseña</label>
                                        <input
                                            type="password"
                                            id="reg-contrasena"
                                            name="contrasena"
                                            className="formulario-control"
                                            required
                                        />
                                    </div>
                                    <button className="boton-primario">Crear cuenta
                                    </button>
                                </form>
                            </section>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}

export default InicioSesion;