import { Request, Response } from 'express';
import Template from '../models/template.js';

export const addTemplate = async (req: Request, res: Response) => {
  try {
    const { userId, name, description, category, imageSrc, imageAlt } = req.body;
    console.log('🚀 ~ file: template.ts:7 ~ addTemplate ~ req.body', req.body);

    const newTemplate = new Template({
      userId,
      name,
      description,
      category,
      imageSrc,
      imageAlt,
    });
    const savedTemplate = await newTemplate.save();

    res.status(201).json(savedTemplate);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllTemplate = async (req: Request, res: Response) => {
  try {
    const Templates = await Template.find({});
    res.status(200).json(Templates);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllTemplateByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    console.log('🚀 ~ file: template.ts:35 ~ getAllTemplateByCategory ~ category', category);

    const Templates = await Template.find({ category });
    res.status(200).json(Templates);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getTemplate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const template = await Template.findById(id);
    res.status(200).json(template);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};
