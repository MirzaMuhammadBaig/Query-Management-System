import { Request, Response } from 'express';
import Category from '../models/category.js';

export const addCategory = async (req: Request, res: Response) => {
  try {
    const { userId, name, category, imageSrc, imageAlt } = req.body;
    console.log('🚀 ~ file: category.ts:7 ~ addCategory ~ req.body', req.body);

    const newCategory = new Category({
      userId,
      name,
      category,
      imageSrc,
      imageAlt,
    });
    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.status(200).json(category);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};
