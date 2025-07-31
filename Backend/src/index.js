require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const authRoutes = require('./interfaces/routes/AuthRoutes');
const empleadoRoutes = require('./interfaces/routes/EmpleadoRoutes');
const solicitudRoutes = require('./interfaces/routes/SolicitudRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Prueba
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// rutas
app.use('/api/auth', authRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/solicitudes', solicitudRoutes);

// configuracion
const PORT = process.env.PORT;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexion a la base de datos realizada");

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
})();
