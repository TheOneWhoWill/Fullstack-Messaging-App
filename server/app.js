import http from 'http';
import './private/key.js';
import './database/mongo.js'
import express from 'express';
import titleRouter from './routes/title.js';
import uploadRouter from './routes/upload.js';
import videosRouter from './routes/videos.js';

const app = express();
const PORT = process.env.PORT || 2000;
const server = http.createServer(app);

app.use(express.json({type: ['application/json', 'text/plain']}));
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use('/Feed', titleRouter)
app.use('/Upload', uploadRouter)
app.use('/Videos', videosRouter)

server.listen(PORT, () => console.log(`Server Started on port ${PORT}`))