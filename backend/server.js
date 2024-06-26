import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import morgan from 'morgan';
import cors from 'cors';
import authRoute from './routes/authRoute.js';
import transactionRoutes from './routes/transactionRoutes.js';
// import path from 'path';

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/transation', transactionRoutes);

// const __dirname = path.dirname(new URL(import.meta.url).pathname);

// app.use(express.static(path.join(__dirname, './client/build')));

// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, './client/build/index.html'));
// });

app.use('/hello', (req, res) => {
  try {
    res.send('<h1>hello from the server</h1>');
  } catch (error) {
    console.log('fail to connect');    
  }
});

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "script-src 'self' https://js.stripe.com/v3");
  return next();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`the server successfully connected to port ${PORT}`.bgCyan.white);
});
