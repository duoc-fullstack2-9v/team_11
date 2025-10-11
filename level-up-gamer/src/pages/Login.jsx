import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
    const [view, setView] = useState("login");
    const navigate = useNavigate(); //esto debería redirigir tras login

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/"); //con esto vuelve al Home
    }

    return (
        <>
            <main className="auth-page">
                <div className="contenedor-auth">
                    <div className="auth-caja">

                        <button
                            className="auth-switch"
                            onClick={() =>
                                setView(view === "login" ? "register" : "login")
                            }
                        >
                            {view === "login" ? "Registrarse" : "Iniciar sesión"}
                        </button>

                        {view === "login" && (
                            <section className="auth-card">
                                <h2>Iniciar sesión</h2>
                                <form className="formulario" onSubmit={handleSubmit}>
                                    <div className="formulario-grupo">
                                        <label htmlFor="usuario">Usuario</label>
                                        <input
                                            type="text"
                                            id="usuario"
                                            name="usuario"
                                            className="formulario-control"
                                            required
                                        />
                                    </div>
                                    <div className="formulario-grupo">
                                        <label htmlFor="password">Contraseña</label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            className="formulario-control"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="boton-primario">Ingresar
                                    </button>
                                </form>
                            </section>
                        )}

                        {view === "register" && (
                            <section className="auth-card">
                                <h2>Registrarse</h2>
                                <form className="formulario" onSubmit={handleSubmit}>
                                    <div className="formulario-grupo">
                                        <label htmlFor="reg-usuario">Nombre de usuario</label>
                                        <input
                                            type="text"
                                            id="reg-usuario"
                                            name="usuario"
                                            className="formulario-control"
                                            required
                                        />
                                    </div>
                                    <div className="formulario-grupo">
                                        <label htmlFor="reg-correo">Correo</label>
                                        <input
                                            type="email"
                                            id="reg-correo"
                                            name="correo"
                                            className="formulario-control"
                                            required
                                        />
                                    </div>
                                    <div className="formulario-grupo">
                                        <label htmlFor="reg-password">Contraseña</label>
                                        <input
                                            type="text"
                                            id="reg-password"
                                            name="password"
                                            className="formulario-control"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="boton-primario">Crear cuenta
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

export default Login;