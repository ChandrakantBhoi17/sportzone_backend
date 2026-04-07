import { Router } from 'express';
import auth from './auth.js';
import cart from './cart.js';
import orders from './orders.js';
import products from './products.js';
import users from './users.js';
import addresses from './addresses.js';

const router = Router();

router.use('/auth', auth);
router.use('/cart', cart);
router.use('/orders', orders);
router.use('/products', products);
router.use('/users', users);
router.use('/addresses', addresses);

export default router;
