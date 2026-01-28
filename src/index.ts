import AgentAPI from 'apminsight';
AgentAPI.config()

import express from 'express';
import subjectsRouter from './routes/subjects.js'
import classesRouter from './routes/classes.js'
import usersRouter from './routes/users.js'
import cors from 'cors'
import 'dotenv/config'
import securityMiddleware from './middleware/security.js';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';
const app = express();
const PORT = 8000;

if(!process.env.FRONTEND_URL) throw new Error('FRONTEND_URL is not set in .env file. CORS will block cross-origin requests.')

console.log(`Backend expects origin: '${process.env.FRONTEND_URL}'`);

// Enable trust proxy to read X-Forwarded-For headers for accurate client IP
app.set('trust proxy', true);

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods:['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}))

app.all('/api/auth/*splat', toNodeHandler(auth));

// JSON middleware
app.use(express.json());

app.use(securityMiddleware);

app.use('/api/subjects', subjectsRouter)
app.use('/api/classes', classesRouter)
app.use('/api/users', usersRouter)
// Root GET route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to University Management Dashboard API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
