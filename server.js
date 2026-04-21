const express = require('express');
const app = express();

app.use(express.json());

// 🔥 variável para guardar a última localização
let ultimaLocalizacao = {};

// 📡 recebe dados do ESP32
app.post('/localizacao', (req, res) => {
  ultimaLocalizacao = req.body;
  console.log("Recebido do ESP32:", ultimaLocalizacao);
  res.send("OK");
});

// 📱 app consulta dados
app.get('/localizacao', (req, res) => {
  res.json(ultimaLocalizacao);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log("Servidor rodando");
});