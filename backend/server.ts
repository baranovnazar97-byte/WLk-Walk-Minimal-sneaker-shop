import cors from 'cors';
import dotenv from 'dotenv';
import e from 'express';
import { Pool } from 'pg';
import shoesMockData, { Shoe } from './database';
dotenv.config();

const app = e();

const PORT = process.env.PORT || 5000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

app.use(cors());

app.use(e.json());

app.get('/api/shoes', async (req, res) => {
  try {
    const result = await query(
      'SELECT id, brand, title, price, category, sizes, imageurl as "imageUrl" from shoes ORDER BY id DESC',
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Ошибка:', error);
    res
      .status(500)
      .send(error instanceof Error ? error.message : 'Unknown error');
  }
});

app.get('/api/shoes/:id', (req, res) => {
  const id = parseInt(req.params.id);

  res.status(200).json(shoesMockData.find((item) => item.id === id));
});

app.post('/api/shoes', (req, res) => {
  if (req.headers['role-user'] === 'user') {
    return res.status(403).send('Недостаточно прав');
  }
  const { brand, title, price, category, sizes, imageUrl } = req.body as Shoe;

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
  if (req.headers['role-user'] === 'user') {
    return res.status(403).send('Недостаточно прав');
  }
  const id = parseInt(req.params.id);

  shoesMockData.splice(
    0,
    shoesMockData.length,
    ...shoesMockData.filter((item) => item.id !== id),
  );

  res.status(200).json(shoesMockData);
});

app.patch('/api/shoes/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const updates = req.body as Partial<Shoe>;

  const shoe = shoesMockData.find((item) => item.id === id);

  if (shoe) {
    Object.assign(shoe, updates);
    res.status(200).json(shoe);
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
