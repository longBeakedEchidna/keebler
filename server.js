const express = require ('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const databaseController = require('./controller.js');

const http = require('http');
const bodyParser = require('body-parser');

const server = http.createServer(app);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use((req, res, next) => {
  res.set({ 'Content-Type': 'text/html', charset: 'utf-8' });
  next();
});
  
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname + '/client/index.html'))
);

app.post('/register', databaseController.createUser, (req, res) => {

});

app.post('/message', databaseController.createMessage, (req, res) => {

});

app.get('/home', databaseController.getMessages, (req, res) => {
  // res.sendFile(path.join(__dirname + '/client/home.html'));
});

// app.get('/room/:roomId', controller.getMessages)

app.get('/createRoom', databaseController.getAllUsers, (req, res) => {
  // res.render('../client/home', {Messages: messages});
});

app.post('/createRoom', databaseController.createRoom, (req, res) => {
  console.log('new room created');
})

server.listen(8080, () => {
    console.log('listening 8080')
});

module.exports = server;