const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const uri =
  "mongodb+srv://Thew:8IJfg3igy0NhsF89@events-cluster.ntshh.mongodb.net/?retryWrites=true&w=majority&appName=events-cluster";

const userRoutes = require("./routes/users");

async function startServer() {
  try {
    await mongoose.connect(uri);
    console.log("Conectado a MongoDB");
    app.listen(port, () => {
      console.log("Servidor corriendo en el puerto 3000");
    });
  } catch (error) {
    console.error("Error al conectar a MongoDB", error);
  }
}

startServer();

app.use("/users", userRoutes);
