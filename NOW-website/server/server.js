// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Подключаемся к MongoDB (замените 'ваша_база' на имя вашей базы данных)
mongoose.connect('mongodb://localhost:27017/NOW-DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Подключение к MongoDB успешно'))
  .catch(err => console.error('Ошибка подключения к MongoDB:', err));

// Определяем схему и модель для коллекции categories
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  pic: {type: String, required: true},
  category_id: {type: String, required: true},
});

const Category = mongoose.model('Category', categorySchema);

// Создаём эндпоинт для получения категорий
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Запускаем сервер на порту 3000
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
