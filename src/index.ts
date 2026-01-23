import express from 'express';
import subjectsRouter from './routes/subjects.js'
import cors from 'cors'
const app = express();
const PORT = 8000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods:['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

// JSON middleware
app.use(express.json());

app.use('/api/subjects', subjectsRouter)
// Root GET route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to University Management Dashboard API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
