import express from 'express';
import 'dotenv/config';

import connectDB from './configs/database';
import cookieParser from 'cookie-parser';
import AuthRouter from './routes/auth';
import UserRouter from './routes/user';
import isAuth from './middlewares/isAuth';

const app = express();
connectDB();

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', AuthRouter);
app.use('/api/user', isAuth, UserRouter);

app.use((req, res, next) => {
  console.log(`${req.url} - ${req.method} - ${req.ip}`);
  next();
});

app.get('/', (_, res) => {
  return res.status(200).json({
    success: true,
    message: 'Home page',
    healthy: true,
    uptime: Math.round(process.uptime())
  });
});

app.listen(3000, () => {
  console.log(`System is up and running at http://localhost:3000 🚀`);
});

export default app;