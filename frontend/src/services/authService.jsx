import axios from "axios";

const AUTH_BASE_URL = "http://ec2-3-212-50-160.compute-1.amazonaws.com:8080/auth";
 // REEMPLAZAR CON LA URL DE NUESTRA API
//const AUTH_BASE_URL = "http://localhost:8080/auth"; // PARA PROBAR LOCALMENTE

// POST /auth/login
export const loginUsuario = async (email, password) => {
  const body = { email, password };

  const response = await axios.post(`${AUTH_BASE_URL}/login`, body); //si la contraseña está mal, se lanza un error 401
  return response.data; // Antes: "Login exitoso", Ahora: {id, email, token}
};

// POST /auth/registro
export const registrarUsuario = async (email, password) => {
  const body = { email, password };

  const response = await axios.post(`${AUTH_BASE_URL}/registro`, body); // Aquí se devuelve un usuario creado con {id, email, password}
  return response.data;
};