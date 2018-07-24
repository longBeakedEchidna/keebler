const express = require ('express');
const app = express();
const router = require('./route.js') ;
const passportSetup = require('./setup/passport-config.js');
const path = require('path');
const cookieParser = require('cookie-parser');
const databaseController = require('./controller.js');
const passport = require('passport');
const cookieSession = require('cookie-session');
const http = require('http');
const bodyParser = require('body-parser');
const keys = require('./setup/keys');
const server = http.createServer(app);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cookieSession({
  keys:keys.cookieSession.key,
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth',router);
app.use((req, res, next) => {
  res.set({ 'Content-Type': 'text/html', charset: 'utf-8' });
  next();
});

app.get('/', (req, res) => {
  res.render('../client/login', {incorrectCredentials: false});
  // res.sendFile(path.join(__dirname + '/client/login.html'))
});

app.get('/register', (req, res) => {
  res.render('../client/register', {usernameTaken: false});
//res.sendFile(path.join(__dirname + '/client/index.html'))
});

//app.post('/login', databaseController.login);

app.post('/register', databaseController.createUser, (req, res) => {

});

app.post('/message', databaseController.createMessage, (req, res) => {

});

app.get('/home', databaseController.getRooms, databaseController.getRoomUsers, databaseController.getMessages, (req, res) => {
  // res.sendFile(path.join(__dirname + '/client/home.html'));
});

app.get('/room/:roomId/', (req, res, next) => {
  console.log('req params roomId', req.params.roomId);
  console.log('req cookies roomId', req.cookies.roomId);
  req.cookies.roomId = req.params.roomId;
  console.log('req cookies roomId after assigning', req.cookies.roomId);
  next();
}, databaseController.changeRooms, databaseController.getRooms, databaseController.getRoomUsers, databaseController.getMessages);

app.get('/createRoom', databaseController.getAllUsers, (req, res) => {
  // res.render('../client/home', {Messages: messages});
});

app.post('/createRoom', databaseController.getRooms, databaseController.createRoom, (req, res) => {
  console.log('new room created');
})

server.listen(8080, () => {
    console.log('listening 8080')
});

module.exports = server;
