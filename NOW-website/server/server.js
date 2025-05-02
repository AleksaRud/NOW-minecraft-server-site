// server.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
//const staticPath = path.join(__dirname, 'uploads', 'shop', 'products');
app.use('/shop/categories', express.static(path.join(__dirname, 'uploads', 'shop', 'categories')));
app.use('/shop/products', express.static(path.join(__dirname, 'uploads', 'shop', 'products')));
app.use('/projects', express.static(path.join(__dirname, 'uploads', 'projects')));
app.use('/player_cards/season1', express.static(path.join(__dirname, 'uploads', 'player_cards', 'season1')));
app.use('/player_cards/middle_season1', express.static(path.join(__dirname, 'uploads', 'player_cards', 'middle_season1')));
app.use('/seasons/season1', express.static(path.join(__dirname, 'uploads', 'seasons', 'season1')));
app.use('/seasons/middle_season1', express.static(path.join(__dirname, 'uploads', 'seasons', 'middle_season1')));
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
    const aggregationResult = await Review.aggregate([
      { $match: { product_id: productId } },         // Отбираем отзывы для этого товара
      { $group: { _id: "$product_id", avgRating: { $avg: "$rate" } } }
    ]);
    
    const avgRating = aggregationResult.length > 0 ? aggregationResult[0].avgRating : 0;
    const baseUrl = "http://localhost:3000";

    product.pic = `${baseUrl}/shop/products/${product.pic}`;
    const productWithRating = { ...product.toObject(), avgRating };
    
    res.json(productWithRating);
  } catch (error) {
    console.error(`Ошибка при получении товара с id ${productId}:`, error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products', async (req, res) => {
  const { category_id } = req.query;
  try {
    const baseUrl = "http://localhost:3000";
    // Используем .lean() чтобы получить обычные объекты
    const productsList = await Product.find({ category_id }).lean();
    if (!productsList || productsList.length === 0) {
      return res.status(404).json({ error: 'Products not found' });
    }
    
    // Собираем массив product_id для всех найденных товаров (приводим к строке)
    const productIds = productsList.map(product => product.product_id.toString());
    
    // Агрегируем отзывы для этих товаров
    const ratings = await Review.aggregate([
      { $match: { product_id: { $in: productIds } } },
      { $group: { _id: "$product_id", avgRating: { $avg: "$rate" } } }
    ]);
    
    // Строим объект ratingMap: ключ – product_id, значение – avgRating
    const ratingMap = {};
    ratings.forEach(r => {
      ratingMap[r._id.toString()] = r.avgRating;
    });
    
    // Создаем новый массив товаров с внесением изменений в каждую запись
    const updatedProducts = [];
    for (let product of productsList) {
      // Если поле pic не содержит базовый URL (проверяем так, что оно не начинается на "http")
      if (!/^https?:\/\//.test(product.pic)) {
        product.pic = `${baseUrl}/shop/products/${product.pic}`;
      }
      
      // Подставляем вычисленный рейтинг; если отзывов нет — 0
      // Затем округляем значение до 1 знака после запятой (0.1)
      let avg = ratingMap[product.product_id.toString()] || 0;
      product.avgRating = Math.round(avg * 10) / 10;
      
      updatedProducts.push(product);
    }
    
    res.json(updatedProducts);
  } catch (error) {
    console.error(`Ошибка при получении товаров для категории ${category_id}:`, error);
    res.status(500).json({ error: error.message });
  }
});



/*
app.get('/api/products', async (req, res) => {
  const { category_id } = req.query;  
  try {
    // Находим все товары для заданной категории
    const productsList = await Product.find({ category_id: category_id });
    if (!productsList || productsList.length === 0) {
      return res.status(404).json({ error: 'Products not found' });
    }
    
    // Собираем массив product_id товаров для дальнейшей агрегации отзывов
    const productIds = productsList.map(product => product.product_id);
    
    // Получаем средний рейтинг для каждого товара (используя поле product_id)
    const ratings = await Review.aggregate([
      { $match: { product_id: { $in: productIds } } },
      { $group: { _id: "$product_id", avgRating: { $avg: "$rate" } } }
    ]);
    
    // Строим словарь (map): ключ – product_id, значение – средний рейтинг
    const ratingMap = {};
    ratings.forEach(r => {
      ratingMap[r._id] = r.avgRating;
    });
    
    // Задаём базовый URL для формирования полноценных ссылок на изображения
    const baseUrl = "http://localhost:3000";
    
    // Обновляем каждый товар: преобразуем документ Mongoose в обычный объект,
    // дополняем поле pic, формируя полный URL, и добавляем свойство avgRating
    const updatedProducts = productsList.map(product => {
      const productObj = product.toObject();
      productObj.pic = `${baseUrl}/shop/products/${productObj.pic}`;
      productObj.avgRating = ratingMap[productObj.product_id.toString()] !== undefined
        ? ratingMap[productObj.product_id.toString()]
        : 0;
      
      return productObj;
    });
    
    res.json(updatedProducts);
  } catch (error) {
    console.error(`Ошибка при получении товаров для категории ${category_id}:`, error);
    res.status(500).json({ error: error.message });
  }
});*/

/*
app.get('/api/products', async (req, res) => {
  const { category_id } = req.query;  
  try {
    const productsList = await Product.find({ category_id: category_id });
    if (!productsList || productsList.length === 0) {
      return res.status(404).json({ error: 'Products not found' });
    }


    res.json(productsList);
  } catch (error) {
    console.error(`Ошибка при получении товаров для категории ${category_id}:`, error);
    res.status(500).json({ error: error.message });
  }
});
*/
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
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
