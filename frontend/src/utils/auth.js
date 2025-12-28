//const USUARIO   = "lug_usuario"; 
//const CONTRASENA = "lug_contrasena";

// Clave única para guardar la sesión actual
const SESSION_KEY = "lug_sesion";

// Guarda datos de la sesión (usuario, correo, token, lo que quieras)
export function startSession(userData) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
}

// Eliminar/cerrar la sesión
export function endSession() {
  localStorage.removeItem(SESSION_KEY);
}

// Obtener datos de la sesión actual (o null si no hay)
export function getSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error al leer la sesión desde localStorage: ", e);
    return null;
  }
}

// //Usuario
// export function getUsers() {
//   return JSON.parse(localStorage.getItem(USUARIO)) ?? [];
// }

// export function findUser(usuario) {
//   return getUsers().find(u => u.usuario === usuario);
// }

// export function saveUser(user) {
//   const usuarios = getUsers();
//   usuarios.push(user);
//   localStorage.setItem(USUARIO, JSON.stringify(usuarios));
// }

// //Contraseña
// export function startSession(user) {
//   localStorage.setItem(CONTRASENA, JSON.stringify(user));
// }

// export function endSession() {
//   localStorage.removeItem(CONTRASENA);
// }

// export function getSession() {
//   return JSON.parse(localStorage.getItem(CONTRASENA));
// }