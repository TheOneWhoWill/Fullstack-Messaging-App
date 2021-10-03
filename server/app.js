import http from 'http';
import dotenv from 'dotenv';
import './aws/initalize.js'
import express from 'express';
import mongoose from 'mongoose';
import admin from 'firebase-admin';
import titleRouter from './routes/title.js';
import uploadRouter from './routes/upload.js';
import serviceAccount from './private/key.js';

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	storageBucket: 'webflix-c9265.appspot.com'
})

dotenv.config();

const app = express();
const dbURL = process.env.DBKey;
const PORT = process.env.PORT || 2000;
const server = http.createServer(app);

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected to MongoDB!')).catch((error) => console.log(error));

app.use(express.json({type: ['application/json', 'text/plain']}));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/Feed', titleRouter)
app.use('/Upload', uploadRouter)

server.listen(PORT, () => console.log(`Server Started on port ${PORT}`))