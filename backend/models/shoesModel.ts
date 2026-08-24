import { query } from '../database/database';
import { Shoe } from '../types/Shoe';

export const shoesModelGet = async () => {
  const result = await query(
    `SELECT
      s.shoe_id,
      s.brand,
      s.title,
      s.price,
      s.category,
      r.rating,
      r.quantity,
      s.image_url AS "imageUrl",
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'value', s2.sizes_value,
          'stock', s2.stock_quantity
        )
        ORDER BY s2.sizes_value ASC
      ) AS "sizes"
    FROM shoes s
    LEFT JOIN sizes s2 ON s.shoe_id = s2.shoe_id
    left join ratings r on r.shoe_id = s.shoe_id
    GROUP BY s.shoe_id, r.rating, r.quantity;`,
  );

  return result.rows;
};

export const shoesModelGetById = async (id: number) => {
  const queryText = `
    SELECT
      s.shoe_id,
      s.brand,
      s.title,
      s.price,
      s.category,
      r.rating,
      r.quantity,
      s.image_url AS "imageUrl",
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'value', s2.sizes_value,
          'stock', s2.stock_quantity
        )
        ORDER BY s2.sizes_value ASC
      ) AS "sizes"
    FROM shoes s
    LEFT JOIN sizes s2 ON s.shoe_id = s2.shoe_id
    left join ratings r on r.shoe_id = s.shoe_id
    WHERE s.shoe_id = $1
    GROUP BY s.shoe_id, r.rating, r.quantity;
  `;

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
