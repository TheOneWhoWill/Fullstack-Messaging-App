import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config()
const dbURL = process.env.DBKey;

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected to MongoDB!')).catch((error) => console.log(error));