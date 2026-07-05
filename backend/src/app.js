import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { globalLimiter } from './middlewares/rateLimiter.js';

const app = express();

// Security HTTP headers
app.use(helmet());

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Global Rate Limiter
app.use('/api', globalLimiter);

// CORS and Body Parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/enquiries', enquiryRoutes);

// Error Handling Middleware
app.use(errorHandler);

export default app;
