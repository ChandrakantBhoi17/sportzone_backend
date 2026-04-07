import { Router } from 'express';
import Product from '../models/Product.js';

const router = Router();

// GET /api/products - list all, support ?category=? &minPrice=? &maxPrice=?
router.get('/', async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;
    let query: any = {};

    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice || 0);
      if (maxPrice) query.price.$lte = Number(maxPrice || Infinity);
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: Number(req.params.id) });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

