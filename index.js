const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 3000
const uri = "mongodb+srv://Thew:8IJfg3igy0NhsF89@events-cluster.ntshh.mongodb.net/?retryWrites=true&w=majority&appName=events-cluster";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Base de Datos MongoDB Conectada");
  } finally {
    await mongoose.disconnect();
  }
}

run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('¡Hola Mundo!')
})

app.listen(port, () => {
  console.log(`API Escuchando en el puerto ${port}`)
})