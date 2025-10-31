import express from 'express';
import 'dotenv/config';

const app = express();

app.get('/', (_, res) => {
  return res.status(200).json({
    success: true,
    message: 'Home page',
    healthy: true,
    uptime: Math.round(process.uptime())
  });
});

app.listen(3000, () => {
  console.log(`API is running at http://localhost:3000 🚀`);
});