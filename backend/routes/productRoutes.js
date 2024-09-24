import express from 'express';
import  {getAllProducts, getProduct, incremeentProductView}  from '../controllers/productController.js';
const router = express.Router();

router.route('/').get(getAllProducts)


router.route('/:id')
    .get(getProduct)
   

router.route('/:id/view')
    .put(incremeentProductView)
   
export default router;