import express from 'express';
const router = express.Router();
import { protect, authorize } from '../middleware/authMiddleware.js';
import { createBrand, deleteBrand, getBrands } from '../controllers/brandController.js';


router.route('/admin').post(protect, authorize('admin'), createBrand);
router.route('/admin/:id').delete(protect, authorize('admin'), deleteBrand);

router.route('/').get(getBrands);

export default router