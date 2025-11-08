const USUARIO   = "lug_usuario";
const CONTRASENA = "lug_contrasena";

//Usuario
export function getUsers() {
  return JSON.parse(localStorage.getItem(USUARIO)) ?? [];
}

export function findUser(usuario) {
  return getUsers().find(u => u.usuario === usuario);
}

export function saveUser(user) {
  const usuarios = getUsers();
  usuarios.push(user);
  localStorage.setItem(USUARIO, JSON.stringify(usuarios));
}

//Contraseña
export function startSession(user) {
  localStorage.setItem(CONTRASENA, JSON.stringify(user));
}

export function endSession() {
  localStorage.removeItem(CONTRASENA);
}

export function getSession() {
  return JSON.parse(localStorage.getItem(CONTRASENA));
}