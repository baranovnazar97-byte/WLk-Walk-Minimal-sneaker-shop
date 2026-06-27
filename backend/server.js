const e = require('express');
require('dotenv').config();
let shoesMockData = require('./database');
const cors = require('cors');

const app = e();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(e.json());

app.get('/api/shoes', (req, res) => {
  res.status(200).json(shoesMockData);
});

app.get('/api/shoes/:id', (req, res) => {
  const id = parseInt(req.params.id);

  res.status(200).json(shoesMockData.find((item) => item.id === id));
});

app.post('/api/shoes', (req, res) => {
  const { brand, title, price, category, sizes, imageUrl } = req.body;

  const newShoe = {
    id: Date.now(),
    brand: brand,
    title: title,
    price: price,
    category: category,
    sizes: sizes,
    imageUrl: imageUrl,
  };

  shoesMockData.push(newShoe);

  res.status(200).json(newShoe);
});

app.delete('/api/shoes/:id', (req, res) => {
  const id = parseInt(req.params.id);

  shoesMockData = shoesMockData.filter((item) => item.id !== id);

  res.status(200).json(shoesMockData);
});

app.patch('/api/shoes/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const updates = req.body;

  const shoe = shoesMockData.find((item) => item.id === id);

  Object.assign(shoe, updates);

  res.status(200).json(shoe);
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
