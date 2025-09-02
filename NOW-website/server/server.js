const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/shop/categories', express.static(path.join(__dirname, 'uploads', 'shop', 'categories')));
app.use('/shop/products', express.static(path.join(__dirname, 'uploads', 'shop', 'products')));
app.use('/projects', express.static(path.join(__dirname, 'uploads', 'projects')));
app.use('/players_cards', express.static(path.join(__dirname, 'uploads', 'players_cards')));
app.use('/players_cards/season1', express.static(path.join(__dirname, 'uploads', 'players_cards', 'season1')));
app.use('/players_cards/middle_season1', express.static(path.join(__dirname, 'uploads', 'players_cards', 'middle_season1')));
app.use('/seasons', express.static(path.join(__dirname, 'uploads', 'seasons')));
app.use('/news', express.static(path.join(__dirname, 'uploads', 'news')));
mongoose.connect('mongodb://localhost:27017/NOW-DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Подключение к MongoDB успешно'))
  .catch(err => console.error('Ошибка подключения к MongoDB:', err));


// Настройка сессии
app.use(session({
  secret: 'sefcbvyWEd3EW3v79',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.post('/api/cart/add', (req, res) => {
  const product = req.body;
  if (!req.session.cart) {
    req.session.cart = [];
  }
  const index = req.session.cart.findIndex(item => item.product_id === product.product_id);
  if (index !== -1) {
    req.session.cart[index].quantity += product.quantity;
  } else {
    req.session.cart.push(product);
  }
  res.json({ success: true, cart: req.session.cart });
});

app.get('/session/cart', (req, res) => {
  res.json({ cart: req.session.cart || [] });
});

// Эндпоинт для получения корзины
app.get('/api/cart', (req, res) => {
  res.json({ cart: req.session.cart || [] });
});

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  discription: { type: String, required: true },
  pic: { type: String, required: true },
  btn_link: { type: String, default: '' },
  btn_tytle: { type: String, default: '' }
});

const News = mongoose.model('News', newsSchema);
/* GET /api/news — получение всех новостей */
app.get('/api/news', async (req, res) => {
  try {
    
    const baseUrl = "http://localhost:3000";
    const news = await News.find({});
    const updatedNews = news.map(item => {
      if (!/^https?:\/\//.test(item.pic)) {
        item.pic = `${baseUrl}/news/${item.pic}`;
      }
      return item;
    });
    res.json(updatedNews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

const fileUpload = require('express-fileupload');
const fs = require('fs');


app.use(fileUpload());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

function transliterate(text) {
  const rus = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g',
    'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k',
    'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
    'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
    'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '',
    'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
    'я': 'ya'
  };

  return text
    .toLowerCase()
    .split('')
    .map(char => rus[char] !== undefined ? rus[char] : char)
    .join('')
    .replace(/\s+/g, '_');
}
/* POST /api/upload — загрузка файла (например, картинки) */
app.post('/api/upload', (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: 'Файл не предоставлен' });
  }

  const uploadedFile = req.files.file;
  const uploadDir = path.join(__dirname, 'uploads', 'news');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const safeFileName = transliterate(uploadedFile.name);
  const uniqueName = `file-${Date.now()}-${safeFileName}`;
  const uploadPath = path.join(uploadDir, uniqueName);

  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      console.error('Ошибка при перемещении файла:', err);
      return res.status(500).json({ error: 'Ошибка при загрузке файла' });
    }
    res.json({ filename: uniqueName });
  });
});


/* POST /api/news — создание новой новости */
app.post('/api/news', async (req, res) => {
  try {
    const { title, date, discription, pic, btn_link, btn_tytle } = req.body;
    const newNews = new News({ title, date, discription, pic, btn_link, btn_tytle });
    await newNews.save();
    res.status(201).json(newNews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при создании новости' });
  }
});

/* PUT /api/news/:id — обновление существующей новости по id */
app.put('/api/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, discription, pic, btn_link, btn_tytle } = req.body;
    const updatedNews = await News.findByIdAndUpdate(
      id,
      { title, date, discription, pic, btn_link, btn_tytle },
      { new: true }
    );
    if (!updatedNews) {
      return res.status(404).json({ error: 'Новость не найдена' });
    }
    res.json(updatedNews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка обновления новости' });
  }
});

/* DELETE /api/news/:id — удаление новости по id */
app.delete('/api/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNews = await News.findByIdAndDelete(id);
    if (!deletedNews) {
      return res.status(404).json({ error: 'Новость не найдена' });
    }
    res.json({ message: 'Новость успешно удалена' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при удалении новости' });
  }
});











  

const seasonSchema = new mongoose.Schema({
  season_id: { type: String, required: true },
  name: { type: String, required: true },
  pic: { type: String, required: true },
  period: { type: String, required: true },
  minecraft_version: { type: String, required: true },
  description: { type: String, required: true },
  hint: { type: String, required: true },
  world_save: { type: String, required: true },
});

const Season = mongoose.model('Season', seasonSchema);

app.get('/api/seasons', async (req, res) => {
  try {
    const baseUrl = "http://localhost:3000";
    const seasonsList = await Season.find({}).lean();

    if (!seasonsList || seasonsList.length === 0) {
      return res.status(404).json({ error: 'Seasons not found' });
    }

    const updatedSeasons = seasonsList.map(season => {
      if (!/^https?:\/\//.test(season.pic)) {
        season.pic = `${baseUrl}/seasons/${season.pic}`;
      }
      return season;
    });

    res.json(updatedSeasons);
  } catch (err) {
    console.error('Ошибка при получении категорий:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});





const playerSchema = new mongoose.Schema({
  player_id: { type: String, required: true },
  nickname: { type: String, required: true },
  season_id: { type: Array, required: true },
  card: { type: String, required: true },
  all_pics: { type: Array, required: true },
  info: { type: String, required: true },
  links: { type: Array, default: [] },
});

const Player = mongoose.model('Player', playerSchema);

app.get('/api/players', async (req, res) => {
  try {
    
    const baseUrl = "http://localhost:3000";
    const players = await Player.find({});
    const updatedPlayers = players.map(player => {
      if (!/^https?:\/\//.test(player.card)) {
        player.card = `${baseUrl}/players_cards/${player.card}`;
        player.all_pics = player.all_pics.map(pic => {
          if (!/^https?:\/\//.test(pic)) {
            return `${baseUrl}/players_cards/${pic}`;
          }
          return pic;
        })
      }
      return player;
    });
    res.json(updatedPlayers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});
app.get('/api/players/:player_id', async (req, res) => {
  const playerId = req.params.player_id;
  try {
    let player;
    if (mongoose.Types.ObjectId.isValid(playerId)) {
      player = await Player.findById(playerId);
    } 
    if (!player) {
      player = await Player.findOne({ player_id: playerId });
    }
    if (!player) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const baseUrl = "http://localhost:3000";

    player.card = `${baseUrl}/players_cards/${player.card}`;
    player.all_pics = player.all_pics.map(pic => {
      if (!/^https?:\/\//.test(pic)) {
        return `${baseUrl}/players_cards/${pic}`;
      }
      return pic;
    })
    res.json(player);
  } catch (error) {
    console.error(`Ошибка при получении товара с id ${playerId}:`, error);
    res.status(500).json({ error: error.message });
  }
});

const projectSchema = new mongoose.Schema({
  pic: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  height: { type: Number, required: true },
});

const Project = mongoose.model('Project', projectSchema);

app.get('/api/projects', async (req, res) => {
  try {
    const baseUrl = "http://localhost:3000";
    const projects = await Project.find({});
    const updatedProjects = projects.map(item => {
      if (!/^https?:\/\//.test(item.pic)) {
        item.pic = `${baseUrl}/projects/${item.pic}`;
      }
      return item;
    });
    res.json(updatedProjects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});


const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  pic: {type: String, required: true},
  category_id: {type: String, required: true},
});

const Category = mongoose.model('Category', categorySchema);

app.get('/api/categories', async (req, res) => {
  try {
    const baseUrl = "http://localhost:3000";
    const categoriesList = await Category.find({}).lean();

    if (!categoriesList || categoriesList.length === 0) {
      return res.status(404).json({ error: 'Categories not found' });
    }

    const updatedCategories = categoriesList.map(category => {
      if (!/^https?:\/\//.test(category.pic)) {
        category.pic = `${baseUrl}/shop/categories/${category.pic}`;
      }
      return category;
    });

    res.json(updatedCategories);
  } catch (err) {
    console.error('Ошибка при получении категорий:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

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

app.get('/api/products/:product_id', async (req, res) => {
  const productId = req.params.product_id;
  try {
    let product;
    if (mongoose.Types.ObjectId.isValid(productId)) {
      product = await Product.findById(productId);
    } 
    if (!product) {
      product = await Product.findOne({ product_id: productId });
    }
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const aggregationResult = await Review.aggregate([
      { $match: { product_id: productId } },
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
    const productsList = await Product.find({ category_id }).lean();
    if (!productsList || productsList.length === 0) {
      return res.status(404).json({ error: 'Products not found' });
    }
    
    const productIds = productsList.map(product => product.product_id.toString());
    
    const ratings = await Review.aggregate([
      { $match: { product_id: { $in: productIds } } },
      { $group: { _id: "$product_id", avgRating: { $avg: "$rate" } } }
    ]);
    
    const ratingMap = {};
    ratings.forEach(r => {
      ratingMap[r._id.toString()] = r.avgRating;
    });
    
    const updatedProducts = [];
    for (let product of productsList) {
      if (!/^https?:\/\//.test(product.pic)) {
        product.pic = `${baseUrl}/shop/products/${product.pic}`;
      }
      
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

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

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

app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

const nodemailer = require('nodemailer');

// Создаём тестовый аккаунт и транспортёра один раз при запуске сервера
nodemailer.createTestAccount((err, testAccount) => {
  if (err) {
    console.error('Ошибка создания тестового аккаунта:', err);
    return;
  }

  // Создаём транспорт с данными тестового аккаунта
  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure, // true для 465, false для других портов
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
    connectionTimeout: 10000,
  });

  app.post('/api/send-email', async (req, res) => {
    const { from, to, subject, text } = req.body;
    const mailOptions = { from, to, subject, text };

    try {
      const info = await transporter.sendMail(mailOptions);
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log('Письмо отправлено успешно! Preview URL:', previewUrl);
      res.json({ message: 'Письмо отправлено успешно', previewUrl });
    } catch (error) {
      console.error('Ошибка при отправке письма:', error);
      res.status(500).json({ error: 'Ошибка при отправке письма' });
    }
  });

  app.get('/', (req, res) => {
    res.send('Сервер работает');
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`Сервер запущен на порту ${PORT}`)
  );
});


/*
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});*/
