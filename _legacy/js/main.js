console.log('main.js cargado');

/* Switch entre los paneles de login y registro */

// Esto es para que el HTML esté cargado:
document.addEventListener('DOMContentLoaded', () => {
    
    // ---- Switch entre Login y Registro ----
    const switchLink = document.getElementById('auth-switch');
    const panelLogin = document.getElementById('panel-login');
    const panelReg = document.getElementById('panel-register');

    function show(view) {
        const isLogin = view === 'login';
        panelLogin.classList.toggle('hidden', !isLogin); // Aquì oculta el login si No es login
        panelReg.classList.toggle('hidden', isLogin); // Aquí oculta el registro si Sí es login

        if (switchLink) {
            // Actualización del texto y el objetivo siguiente del link
            switchLink.dataset.target = isLogin ? 'register': 'login';
            switchLink.textContent = isLogin ? 'Registrarse': 'Iniciar sesión';
        }
    }

    // Aquì enlazo el clic de "Registrarse"
    if (switchLink){
        switchLink.addEventListener('click', (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del enlace, evita la recarga con preventDefault
        show(switchLink.dataset.target); // Aquì alterna entre login y registro
    });
    }

    // Estado inicial: debe mostrar panel de login
    show('login');

    /* ---- LOGIN ---- */
    const formLogin  = document.querySelector('#panel-login form');  
    const loginUser  = document.getElementById('usuario');
    const loginPass  = document.getElementById('password');

    /* Validaciones */
    function validarLogin() {
        if (!formLogin || !loginUser || !loginPass) return false;

        // Mensajes personalizados
        loginUser.setCustomValidity('');
        loginPass.setCustomValidity('');

        if (loginUser.value.trim().length < 3) {
        loginUser.setCustomValidity('Usuario: mínimo 3 caracteres');
        }
        if (loginPass.value.length < 6) {
        loginPass.setCustomValidity('Contraseña: mínimo 6 caracteres');
        }

        // Muestra mensajes nativos del navegador y devuelve true/false
        return formLogin.reportValidity();
    }

    /* Después del login exitoso: */
    const ACTION_AFTER_LOGIN = 'redirect';        // 'clear' para limpiar
    const PROFILE_URL = './perfil.html';

    if (formLogin){
        formLogin.addEventListener('submit', (e) => {
        // Si algo está mal, el navegador muestra los mensajes
        if (!validarLogin()) { e.preventDefault(); return; }

        e.preventDefault(); // evita recarga por el action del form

        if (ACTION_AFTER_LOGIN === 'clear') {
        formLogin.reset();
        } else {
        const user = loginUser.value.trim();
        localStorage.setItem('authUser', user);   // guardar “sesión”
        window.location.href = PROFILE_URL;       // ir a perfil
        }
        });
    }

    /* ---- REGISTRO ---- */
    const formReg   = document.getElementById('formulario-registro');
    const regUser   = document.getElementById('reg-usuario');
    const regEmail  = document.getElementById('reg-correo');
    const regPass   = document.getElementById('reg-password');
   
    function validarEmail (value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
    }      

    function validarRegistro() {
        if (!formReg || !regUser || !regEmail || !regPass) return false;

        regUser.setCustomValidity('');
        regEmail.setCustomValidity('');
        regPass.setCustomValidity('');

        if (regUser.value.trim().length < 3) {
        regUser.setCustomValidity('Usuario: mínimo 3 caracteres');
        }
        const email = regEmail.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        regEmail.setCustomValidity('Ingresa un correo válido');
        }
        if (regPass.value.length < 6) {
        regPass.setCustomValidity('Contraseña: mínimo 6 caracteres');
        }
        return formReg.reportValidity();
    }

    if (formReg) {
        formReg.addEventListener('submit', (e) => {
        if (!validarRegistro()) { e.preventDefault(); return; }
        e.preventDefault();

        alert('¡Cuenta creada con exito! Por favor, inicia sesión.');
        if (loginUser && regUser) loginUser.value = regUser.value.trim();
        
        formReg.reset();
        show('login');

        const link = document.getElementById('auth-switch');
        if (link) link.focus();
    });
}   
});