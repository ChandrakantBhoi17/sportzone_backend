import { Router, Request, Response } from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
import { Address } from '../models/User.js';

interface AuthRequest extends Request {
  user?: { id: string };
}

const router = Router();

// All routes require authentication
router.use(protect);

// GET /api/addresses - get all user addresses
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user!.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.addresses || []);
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/addresses - create new address
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const { fullName, phone, address, city, state, postalCode, isDefault } = req.body;

    if (!fullName || !phone || !address || !city || !state || !postalCode) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findById(req.user!.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // If this is the first address, make it default
    const shouldBeDefault = isDefault || (user.addresses && user.addresses.length === 0);

    // If setting as default, unset others
    if (shouldBeDefault && user.addresses) {
      user.addresses.forEach((addr: any) => {
        addr.isDefault = false;
      });
    }

    const newAddress: Address = {
      fullName,
      phone,
      address,
      city,
      state,
      postalCode,
      isDefault: shouldBeDefault
    };

    if (!user.addresses) {
      user.addresses = [];
    }
    user.addresses.push(newAddress);
    await user.save();

    res.status(201).json(newAddress);
  } catch (error) {
    console.error('Error creating address:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/addresses/:id - update address
router.put('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { fullName, phone, address, city, state, postalCode, isDefault } = req.body;

    const user = await User.findById(req.user!.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const addressToUpdate = user.addresses?.find((addr: any) => addr._id?.toString() === req.params.id);
    if (!addressToUpdate) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // If setting as default, unset others
    if (isDefault && user.addresses) {
      user.addresses.forEach((addr: any) => {
        addr.isDefault = addr._id?.toString() === req.params.id;
      });
    }

    // Update fields
    if (fullName) addressToUpdate.fullName = fullName;
    if (phone) addressToUpdate.phone = phone;
    if (address) addressToUpdate.address = address;
    if (city) addressToUpdate.city = city;
    if (state) addressToUpdate.state = state;
    if (postalCode) addressToUpdate.postalCode = postalCode;
    if (typeof isDefault === 'boolean') addressToUpdate.isDefault = isDefault;

    await user.save();
    res.json(addressToUpdate);
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/addresses/:id - delete address
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user!.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const index = user.addresses?.findIndex((addr: any) => addr._id?.toString() === req.params.id);
    if (index === undefined || index === -1) {
      return res.status(404).json({ message: 'Address not found' });
    }

    const deletedAddress = user.addresses![index];
    user.addresses!.splice(index, 1);

    // If deleted address was default and there are other addresses, make the first one default
    if (deletedAddress.isDefault && user.addresses && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }

    await user.save();
    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
