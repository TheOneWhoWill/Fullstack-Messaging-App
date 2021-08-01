import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import admin from 'firebase-admin';
import compression from 'compression';
import authRouter from './routes/auth.js';
import sendRouter from './routes/send.js';
import getRouter from './routes/retrieve.js';
import serviceAccount from './private/key.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 2000;
const dbURL = process.env.DBKey;

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
})

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('Connected to db')
  })
  .catch((error) => console.log(error));

app.use(compression());
app.use(express.json())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/auth', authRouter)
app.use('/send', sendRouter)
app.use('/retrieve', getRouter)

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`))