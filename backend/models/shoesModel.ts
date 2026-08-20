import { query } from '../database/database';
import { Shoe } from '../types/Shoe';

export const shoesModelGet = async () => {
  const result = await query(
    'SELECT shoe_id, brand, title, price, category, sizes, rating, image_url as "imageUrl" from shoes ORDER BY shoe_id DESC',
  );

  return result.rows;
};

export const shoesModelGetById = async (id: number) => {
  const queryText = 'SELECT * FROM shoes WHERE shoe_id = $1';
  const result = await query(queryText, [id]);

  return result.rows[0];
};

export const shoesModelPost = async (shoe: Shoe) => {
  const queryText =
    'INSERT INTO shoes (brand, title, price, category, sizes, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const { brand, title, price, category, sizes, imageUrl } = shoe;
  const result = await query(queryText, [
    brand,
    title,
    price,
    category,
    sizes,
    imageUrl,
  ]);

  return result.rows[0];
};

export const shoesModelDelete = async (id: number) => {
  const queryText = 'DELETE FROM shoes WHERE shoe_id = $1 RETURNING *';
  const result = await query(queryText, [id]);

  return result.rows[0];
};
