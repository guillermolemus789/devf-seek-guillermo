const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (request, response) => {
  response.send('Hola Mundo');
});

app.listen(PORT, () => {
  console.log(`Servidor Express funcionando en http://localhost:${PORT}`);
});