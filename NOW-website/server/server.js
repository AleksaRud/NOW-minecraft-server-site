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

// Определяем схему и модель для коллекции categories
const productSchema = new mongoose.Schema({
  product_id: { type: String, required: true},
  category_id: { type: String, required: true},
  pic: { type: String, required: true},
  name: { type: String, required: true},
  description: { type: String, required: true},
  characteristics: { type: String, required: true},
  price: { type: Number, required: true},
  status: { type: String, required: true},
  rate:{ type: Number, required: true},
});

const Product = mongoose.model('Product', productSchema);

// Создаём эндпоинт для получения категорий
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Эндпоинт для получения товара по его ID
app.get('/api/products/:product_id', async (req, res) => {
  const productId = req.params.product_id;
  try {
    let product;
    if (mongoose.Types.ObjectId.isValid(productId)) {
      product = await Product.findById(productId);
    } 
    // Если невалидное ObjectId, или товар не найден по _id, попробуем искать по собственному полю product_id
    if (!product) {
      product = await Product.findOne({ product_id: productId });
    }
    if (!product) {
      // Если товар с таким ID не найден, возвращаем ошибку 404
      return res.status(404).json({ error: 'Product not found' });
    }
    // Если товар найден, отправляем его в ответе
    res.json(product);
  } catch (error) {
    console.error(`Ошибка при получении товара с id ${productId}:`, error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products/:category_id', async (req, res) => {
  const categoryId = req.params.category_id;
  try {
    // Ищем все товары с полем category_id, равным переданному значению.
    const products = await Product.find({ category_id: categoryId });
    if (!products || products.length === 0) {
      return res.status(404).json({ error: 'Products not found' });
    }
    res.json(products);
  } catch (error) {
    console.error(`Ошибка при получении товаров для категории ${categoryId}:`, error);
    res.status(500).json({ error: error.message });
  }
});

// Определяем схему и модель для коллекции categories
const reviewSchema = new mongoose.Schema({
  review_id: { type: String, required: true },
  product_id: { type: String, required: true },
  date: { type: Date, required: true },
  user_id: { type: String, required: true },
  rate: { type: Number, required: true },
  text: { type: String, required: true },
  advantages: { type: String, default: '' },
  disadvantages: { type: String, default: '' }
});

const Review = mongoose.model('Review', reviewSchema);

// Создаём эндпоинт для получения категорий
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Запускаем сервер на порту 3000
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
