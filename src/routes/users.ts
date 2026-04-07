import { Router } from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);

// GET /api/users/profile
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById((req as any).user!.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/users/profile
router.put('/profile', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      (req as any).user!.id,
      { name, email },
      { new: true, runValidators: true }
    ).select('-password');
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;

