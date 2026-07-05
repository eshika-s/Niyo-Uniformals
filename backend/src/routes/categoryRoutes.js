import express from 'express';
import { getCategories, getCategoriesWithCount } from '../controllers/categoryController.js';

const router = express.Router();

router.route('/').get(getCategories);
router.route('/with-count').get(getCategoriesWithCount);

export default router;
