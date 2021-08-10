import http from 'http';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import admin from 'firebase-admin';
import { Server } from 'socket.io';
import authRouter from './routes/auth.js';
import sendRouter from './routes/send.js';
import getRouter from './routes/retrieve.js';
import serviceAccount from './private/key.js';
import { handling } from './functions/socket.js';

dotenv.config();

const app = express();
const dbURL = process.env.DBKey;
const PORT = process.env.PORT || 2000;
const server = http.createServer(app);
const io = new Server(server, {cors: { origin: '*' }});

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
})

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected to MongoDB!')).catch((error) => console.log(error));

app.use(express.json({type: ['application/json', 'text/plain']}));
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.json())	
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

handling(io)

app.use('/auth', authRouter)
app.use('/send', sendRouter)
app.use('/retrieve', getRouter)

server.listen(PORT, () => console.log(`Server Started on port ${PORT}`))