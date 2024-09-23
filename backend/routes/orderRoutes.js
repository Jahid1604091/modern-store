import express from 'express';
const router = express.Router();
import { createOrder, getAllOrders, getMyOrders, getMyOrder, updateOrderToPaid, updateOrderToDelivered } from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

router.route('/').post(protect, createOrder)
    .get(protect, authorize('admin'), getAllOrders)
router.route('/:id/mark-as-delivered').get(protect, authorize('admin'), updateOrderToDelivered)

router.route('/myorders').get(protect, getMyOrders)
router.route('/myorders/:id').get(protect, getMyOrder)
router.route('/myorders/:id/pay').get(protect, updateOrderToPaid)

export default router