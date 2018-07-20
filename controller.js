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
    id: {type: Sequelize.INTEGER, primaryKey: true},
    senderId: Sequelize.INTEGER
});

// 1:M
User.hasMany(Messages, {foreignKey: 'senderId'});
// Messages.belongsTo(User, {foreignKey: 'id'});

// make a promise here!!!
sequelize.sync({force: true}) //.then(() => {
    // User.create({
    //     name: 'test',
    //     password: 'ilovetesting',
    //     id: 1234
    // }).then(() => {
    //         Messages.create({
    //             messages: 'hello world!',
    //             id: 5678,
    //             senderId: 1234
    //         });
//         }
//     );
// });

let createUser = (req, res) => {
    User.create({name: req.body.name, password: req.body.password}, (err, userInstance) => {
        if (err) {
          return res.status(404).json({ message: "Status code 404"});
        }
        res.json(userInstance);
    });
}

// given a request will create a new user in the user table



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
  