// server/server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Подключение к MongoDB
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/mydb';
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Подключение к MongoDB установлено'))
.catch((error) => console.error('Ошибка подключения к MongoDB:', error));

// Middleware для парсинга JSON
app.use(express.json());

// Пример маршрута
app.get('/api', (req, res) => {
  res.json({ message: 'Привет от Express!' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
