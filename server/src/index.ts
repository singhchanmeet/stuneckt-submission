import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectToDatabase } from './mongoose.config';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import postRoutes from './routes/post.routes';

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectToDatabase();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Stuneckt Microblogging API.')
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;