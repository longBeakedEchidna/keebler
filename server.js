const express = require ('express');
const app = express();
const path = require('path');

const http = require('http');
const bodyParser = require('body-parser');

const server = http.createServer(app);
// const eventCtrl = require('./controllers/event-controller');

app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.set({ 'Content-Type': 'text/html', charset: 'utf-8' });
  next();
});
  
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname + '/client/index.html'))
);

app.post('/register', (req, res) => {
    console.log(req.body);
    res.send(404);
});

server.listen(8080, () => {
    console.log('listening 8080')
});

module.exports = server;