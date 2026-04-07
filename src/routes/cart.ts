import { Router, Request, Response } from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';

interface AuthRequest extends Request {
  user?: { id: string };
}

const router = Router();

// All cart routes require auth
router.use(protect);

// GET /api/cart - get user cart
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    let cart = await Cart.findOne({ userId: req.user!.id });
    if (!cart) {
      cart = new Cart({ userId: req.user!.id, items: [], totalPrice: 0 });
      await cart.save();
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/cart/add - add item to cart
router.post('/add', async (req: AuthRequest, res: Response) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const product = await Product.findOne({ id: productId });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ userId: req.user!.id });
    if (!cart) {
      cart = new Cart({ userId: req.user!.id, items: [], totalPrice: 0 });
    }

    const existingItem = cart.items.find((item: any) => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        material: product.material,
        category: product.category,
        quantity,
      });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/cart/update/:productId - update quantity
router.put('/update/:productId', async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    const cart = await Cart.findOne({ userId: req.user!.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find((item: any) => item.productId === parseInt(productId));
    if (!item) return res.status(404).json({ message: 'Item not in cart' });

    item.quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/cart/remove/:productId - remove item from cart
router.delete('/remove/:productId', async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId: req.user!.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter((item: any) => item.productId !== parseInt(productId));
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/cart/clear - clear entire cart
router.delete('/clear', async (req: AuthRequest, res: Response) => {
  try {
    const cart = await Cart.findOne({ userId: req.user!.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

