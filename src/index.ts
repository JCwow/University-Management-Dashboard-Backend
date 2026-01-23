import express from 'express';
import subjectsRouter from './routes/subjects.js'
const app = express();
const PORT = 8000;

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
