import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Backend is working 🚀',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API info endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'CODE HUB API',
    version: '1.0.0',
    description: 'Backend API for CODE HUB EdTech Platform',
    endpoints: {
      auth: '/api/auth/*',
      courses: '/api/courses/*',
      enrollments: '/api/enrollments/*',
      contact: '/api/contact/*',
      blog: '/api/blog/*',
      projects: '/api/projects/*',
      aiLab: '/api/ai-lab/*'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path
  });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Export Express app as Firebase Function
export const api = functions.https.onRequest(app);