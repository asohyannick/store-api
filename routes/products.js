import express from 'express';
import { getAllProductsStatic, getAllProducts } from '../controllers/product.js';
const router = express.Router();
router.route('/static').get(getAllProductsStatic);
router.route('/').get(getAllProducts);
export default router;