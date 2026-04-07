import { Router, Request, Response } from 'express';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import { protect } from '../middleware/auth.js';

interface AuthRequest extends Request {
  user?: { id: string };
}

const router = Router();

// All order routes require auth
router.use(protect);

// GET /api/orders - get all user orders
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({ userId: req.user!.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/orders/:id - get single order
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user!.id });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/orders - create new order
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const { items, shippingAddress, totalPrice, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must have items' });
    }

    if (!shippingAddress) {
      return res.status(400).json({ message: 'Shipping address is required' });
    }

    // Generate unique order number
    const orderNumber = `ORD-${Date.now()}`;

    const order = new Order({
      userId: req.user!.id,
      orderNumber,
      items,
      totalPrice,
      shippingAddress,
      paymentMethod: paymentMethod || 'cod',
      status: 'pending',
      paymentStatus: 'completed',
    });

    await order.save();

    // Clear user's cart after order
    await Cart.updateOne({ userId: req.user!.id }, { items: [], totalPrice: 0 });

    res.status(201).json(order);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// PUT /api/orders/:id/status - update order status
router.put('/:id/status', async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, userId: req.user!.id },
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/orders/:id/payment-status - update payment status
router.put('/:id/payment-status', async (req: AuthRequest, res: Response) => {
  try {
    const { paymentStatus } = req.body;

    const validStatuses = ['pending', 'completed', 'failed'];
    if (!validStatuses.includes(paymentStatus)) {
      return res.status(400).json({ message: 'Invalid payment status' });
    }

    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, userId: req.user!.id },
      { paymentStatus },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
