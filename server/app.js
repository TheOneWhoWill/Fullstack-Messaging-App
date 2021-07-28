import dotenv from 'dotenv';
import express from 'express';
import admin from 'firebase-admin';
import compression from 'compression';
import authRouter from './routes/auth.js';
import serviceAccount from './private/key.js';
import { verifyIDToken } from './middleware/auth.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 2000;

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
})

app.use(compression());
app.use(express.json())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/auth', authRouter)

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`))