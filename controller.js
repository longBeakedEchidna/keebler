const Sequelize = require('sequelize');

// create database
// give permissions to elf user

const sequelize = new Sequelize('keebler', 'elf', 'ilikecookies', {
    host: 'localhost',
    dialect: 'postgres'
});

// TEST DB CONNECTION
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

let User = sequelize.define('user', {
   name: {type: Sequelize.STRING, unique: true},
   password: Sequelize.STRING,
   id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true} 
});

let Messages = sequelize.define('message', {
    messages: Sequelize.STRING,
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    senderId: {type: Sequelize.INTEGER, allowNull: false}
});

// 1:M
User.hasMany(Messages, {foreignKey: 'senderId'});
// Messages.belongsTo(User, {foreignKey: 'id'});

// make a promise here!!!
sequelize.sync();

let activeUser = {};

let createUser = (req, res) => {
    User.create({name: req.body.name, password: req.body.password}).then((userInstance, err) => {
        if (err) {
          return res.status(404).send({ message: "Status code 404"});
        }
        // console.log('userInstance: ', userInstance);
        activeUser.id = userInstance.dataValues.id;
        res.redirect('/home');
    });
}

let createMessage = (req, res) => {
    Messages.create({messages: req.body.message, senderId: activeUser.id}).then((messageIntance, err) => {
        if (err) {
            return res.status(400).send({message: 'Error code 400'});
        }
        res.redirect('/home');
        console.log('req.body.message: ', req.body.message);
    })
}

let getAllMessages = (req, res) => {
    Messages.findAll().then((messages, err) => {
        if (err) console.log('error inside getAllMessages: ', err);
        res.render('../client/home', {Messages: messages})
    })
}

module.exports = {createUser, createMessage, getAllMessages}



// Messages.sync({force:true}).then(() => {
//     return Messages.create({
//         messages: 'hello world!',
//         id: 5678,
//         senderId: 9101112
//     });
// });

// // force: true will drop the table if it already exists
// User.sync({force: true}).then(() => {
//     // Table created
//     return User.create({
//       firstName: 'John',
//       lastName: 'Hancock'
//     });
//   });
  