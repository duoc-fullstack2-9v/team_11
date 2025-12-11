import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { startSession } from "../utils/auth";
import { loginUsuario, registrarUsuario } from "../services/authService";
import "../styles/Login.css";


function InicioSesion() {
    const [view, setView] = useState("inicioSesion");
    const [error, setError] = useState("");
    const navigate = useNavigate(); //esto debería redirigir tras inicioSesion

    // const iniciarSesion = e => {
    //     e.preventDefault();
    //     const formulario = new FormData(e.target);
    //     const usuario = formulario.get("usuario");
    //     const contrasena = formulario.get("contrasena");

    //     const user = findUser(usuario);
    //     if (!user || user.contrasena !== contrasena){
    //         setError("Usuario o contraseña incorrectos");
    //         return;
    //     }
    //     startSession(user);
    //     navigate("/perfil"); //redirige a perfil
    // }

    const iniciarSesion = async (e) => {
    e.preventDefault();
    setError("");

    const formulario = new FormData(e.target);
    const correo = formulario.get("correo");
    const contrasena = formulario.get("contrasena");

    if (!correo || !contrasena) {
        setError("Todos los campos son obligatorios");
        return;
    }

    try {
        await loginUsuario(correo, contrasena); // llama a post /auth/login

        const datosSesion = {
        correo,
        email: correo,
        };
        startSession(datosSesion);

        navigate("/perfil");
    } catch (err) {
        console.error(err);
        setError("Usuario o contraseña incorrectos");
        }
    };


    // const registrarse = (e) => {
    //     e.preventDefault();
    //     const formulario_reg = new FormData(e.target);
    //     const usuario = formulario_reg.get("usuario");
    //     const correo = formulario_reg.get("correo");
    //     const contrasena = formulario_reg.get("contrasena");

    //     if (findUser(usuario)) {
    //         setError("Ese usuario ya existe");
    //         return;
    //     }

    //     const nuevoUsuario = {usuario, correo, contrasena}; 
    //     saveUser(nuevoUsuario);
    //     startSession(nuevoUsuario);
    //     navigate("/perfil");
    // }
    const registrarse = async (e) => {
    e.preventDefault();
    setError("");

    const formulario_reg = new FormData(e.target);
    const usuario = formulario_reg.get("usuario");  // solo lo guardaremos en la sesión
    const correo = formulario_reg.get("correo");    // este va como email al backend
    const contrasena = formulario_reg.get("contrasena");

    try {
        await registrarUsuario(correo, contrasena); //llama al post auth/registro 

        const nuevoUsuarioSesion = { //Se guarda nombre de usuario a nivel de frontend
            usuario,
            correo,
            email: correo
        };

        startSession(nuevoUsuarioSesion);
        navigate("/perfil");

    } catch (err) {
        console.error(err);
        setError("No se pudo registrar el usuario.");
        }
    };

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
                                        <label htmlFor="correo-login">Correo</label>
                                        <input
                                            type="email"
                                            id="correo-login"
                                            name="correo"
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