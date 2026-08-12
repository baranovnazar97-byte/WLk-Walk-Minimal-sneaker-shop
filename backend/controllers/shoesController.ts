import { Request, Response } from 'express';
import {
  shoesModelDelete,
  shoesModelGet,
  shoesModelGetById,
  shoesModelPost,
} from '../models/shoesModel';

export const shoesControllerGet = async (req: Request, res: Response) => {
  try {
    const result = await shoesModelGet();

    res.status(200).json(result);
  } catch (error) {
    console.error(error instanceof Error ? error : 'Unknown error');
    return res.status(500).json({ message: 'Server-side error' });
  }
};

export const shoesControllerGetById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'invalid ID format' });
    }

    const result = await shoesModelGetById(id);

    if (!result) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error instanceof Error ? error : 'Unknown error');
    return res.status(500).json({ message: 'Server-side error' });
  }
};

export const shoesControllerPost = async (req: Request, res: Response) => {
  try {
    const shoe = req.body;

    if (
      'title' in shoe &&
      'brand' in shoe &&
      'category' in shoe &&
      'price' in shoe &&
      'sizes' in shoe
    ) {
      const result = await shoesModelPost(shoe);

      return res.status(201).json(result);
    }

    return res.status(400).json({ message: 'All fields are required' });
  } catch (error) {
    console.error(error instanceof Error ? error : 'Unknown error');
    return res.status(500).json({ message: 'Server-side error' });
  }
};

export const shoesControllerDelete = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'invalid ID format' });
    }

    const result = await shoesModelDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Shoes not found' });
    }

    res
      .status(200)
      .json({ message: 'Successfully deleted', deletedRow: result });
  } catch (error) {
    console.error(error instanceof Error ? error : 'Unknown error');
    return res.status(500).json({ message: 'Server-side error' });
  }
};
