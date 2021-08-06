import dotenv from 'dotenv';
import mongoose from 'mongoose';
import admin from 'firebase-admin';
import bodyParser from 'body-parser';
import express, { json } from 'express';
import authRouter from './routes/auth.js';
import sendRouter from './routes/send.js';
import getRouter from './routes/retrieve.js';
import serviceAccount from './private/key.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2000;
const dbURL = process.env.DBKey;

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
})

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected to MongoDB!')).catch((error) => console.log(error));

app.use(express.json({type: ['application/json', 'text/plain']}));
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.json())	
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