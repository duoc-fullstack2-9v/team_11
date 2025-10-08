function Login() {
    return (
    <>
        <div className="wrapper">
            <aside>
                <img className="logo-imagen" src="./imgs/imagen_2025-09-05_021420718-removebg-preview.png" alt="Logo de mi tienda"/>

                <header>
                    <h1 className="logo">Level Up Gamer</h1>
                </header>
                <nav>
                    <ul className="menu">
                        <li>
                            <a className="boton-menu boton login active" href="./Login.html"><i
                                    className="bi bi-person-raised-hand"></i>Iniciar sesion</a>
                        </li>
                        <li>
                            <a className="boton-menu boton home" href="./Home.html"><i
                                    className="bi bi-hand-index-thumb-fill"></i>Home</a>
                        </li>
                        <li>
                            <a className="boton-menu boton categoria" href="./LevelUpGamer.html"><i
                                    className="bi bi-hand-index-thumb-fill"></i>Catalogo</a>
                        </li>

                        <li>
                            <a className="boton-menu boton-carrito" href="./carrito.html">
                                <i className="bi bi-cart-fill"></i>Carrito<span id="numerito" className="numerito">0</span>
                            </a>
                        </li>

                        <li>
                            <a className="boton-menu boton categoria"><i className="bi bi-hand-index-thumb-fill"></i>Soporte</a>
                        </li>
                    </ul>

                </nav>
                <footer>
                    <p className="texto-footer">© 2025</p>
                </footer>


            </aside>
            <main className="login-main">
                <div className="contenedor-auth">
                    <div className="auth-caja">
                        <a href="#" id="auth-switch" className="auth-switch" data-target="register">Registrarse</a>
                        
                        <section className="auth-card" data-view="login">
                            <div className="auth-panel" id="panel-login">
                                <h2>Iniciar sesión</h2>
                                <form action="Login.html" method="post" className="formulario">
                                    <div className="formulario-grupo">
                                        <label for="usuario">Usuario</label>
                                        <input type="text" id="usuario" name="usuario" className="formulario-control" required/>
                                    </div>

                                    <div className="formulario-grupo">
                                        <label for="password">Contraseña</label>
                                        <input type="password" id="password" name="password" className="formulario-control" required/>
                                    </div>

                                    <button type="submit" className="boton-primario">Ingresar</button>
                                </form>
                            </div>

                            <div className="auth-panel hidden" id="panel-register">
                                <h2>Registrarse</h2>
                                <form id="formulario-registro" className="formulario">
                                    <div className="formulario-grupo">
                                        <label for="reg-usuario">Nombre de usuario</label>
                                        <input type="text" id="reg-usuario" name="usuario" className="formulario-control" required/>
                                    </div>
                                    <div className="formulario-grupo">
                                        <label for="reg-correo">Correo</label>
                                        <input type="email" id="reg-correo" name="correo" className="formulario-control" required/>
                                    </div>
                                    <div className="formulario-grupo">
                                        <label for="reg-password">Contraseña</label>
                                        <input type="password" id="reg-password" name="password" className="formulario-control" required/>
                                    </div>
                                    <button type="submit" className="boton-primario">Crear cuenta</button>
                                </form>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

        </div>

    </>
    )
}

export default Login;