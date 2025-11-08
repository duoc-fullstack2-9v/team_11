import express from 'express';


const app = express();
const PORT = 5000; 

app.get('/', (req, res) => {
  res.send('¡Hola desde el Backend! La API está funcionando.');
});

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});