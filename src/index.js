import 'dotenv/config';

import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import authRoutes from './routes/auth.route.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(json());


app.get('/', (req, res) => {
  res.send('Welcome to the Engineering Management Backend API');
});

app.use("/api", authRoutes);

app.use(
  (err, req, res, next) => {
    errorHandler(err, req, res, next);
  }
);

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

export default app;