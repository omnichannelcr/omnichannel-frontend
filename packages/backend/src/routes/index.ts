import { Router } from 'express';

const router = Router();

// Basic API route
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Omnichannel API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

export { router as apiRoutes };
