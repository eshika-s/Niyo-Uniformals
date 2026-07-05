import express from 'express';
import {
  getEnquiries,
  createEnquiry,
  updateEnquiryStatus,
  deleteEnquiry,
  getEnquiryStats,
} from '../controllers/enquiryController.js';
import { strictLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

router.route('/')
  .get(getEnquiries)
  .post(strictLimiter, createEnquiry);

router.route('/stats').get(getEnquiryStats);

router.route('/:id/status').put(updateEnquiryStatus);
router.route('/:id').delete(deleteEnquiry);

export default router;
