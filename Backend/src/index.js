require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Prueba
app.get('/', (req, res) => {
  res.send('Hello World!')
});

const PORT = process.env.PORT;

(async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
})();
