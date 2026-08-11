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
      'SELECT id, brand, title, price, category, sizes, rating, imageurl as "imageUrl" from shoes ORDER BY id DESC',
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Ошибка:', error);
    res
      .status(500)
      .send(error instanceof Error ? error.message : 'Unknown error');
  }
});

app.get('/api/shoes/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const queryText = 'SELECT * FROM shoes WHERE id = $1';
    const result = await query(queryText, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Кроссовки не найдены' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error instanceof Error ? error : 'Неизвестная ошибка');
  }
});

app.post('/api/shoes', async (req, res) => {
  if (req.headers['role-user'] === 'user') {
    return res.status(403).send('Недостаточно прав');
  }
  try {
    const { brand, title, price, category, sizes, imageUrl } = req.body as Shoe;

    const queryText =
      'INSERT INTO shoes (brand, title, price, category, sizes, imageurl) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const result = await query(queryText, [
      brand,
      title,
      price,
      category,
      sizes,
      imageUrl,
    ]);

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error instanceof Error ? error : 'Неизвестная ошибка');
  }
});

app.delete('/api/shoes/:id', async (req, res) => {
  if (req.headers['role-user'] === 'user') {
    return res.status(403).send('Недостаточно прав');
  }
  const id = parseInt(req.params.id);

  try {
    const queryText = 'DELETE FROM shoes WHERE id = $1 RETURNING *';
    const result = await query(queryText, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Кроссовки не найдены' });
    }

    res
      .status(200)
      .json({ message: 'Успешно удалено', deletedShoe: result.rows[0] });
  } catch (error) {
    console.error(error instanceof Error ? error : 'Неизвестная ошибка');
  }
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
