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

let Message = sequelize.define('message', {
    message: Sequelize.STRING,
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    senderId: {type: Sequelize.INTEGER, allowNull: false},
    roomId: {type: Sequelize.INTEGER, allowNull: false}
});
let Room = sequelize.define('room', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING, allowNull: false}
});


// 1:M
User.hasMany(Message, {foreignKey: 'senderId'});
Room.hasMany(Message, {foreignKey: 'roomId'});
Room.belongsToMany(User, {
    through: 'user_room_link'
});
User.belongsToMany(Room, {
    through: 'user_room_link'
});
Room.create({name: 'Main'});

sequelize.sync();

const databaseController = {
    createUser: (req, res) => {
        User.create({name: req.body.name, password: req.body.password}).then((userInstance, error) => {
            if (error) {
              return res.status(400).send({message: error});
            }
            Room.findOne({where: {id: 1}}).then((roomInstance, error) => {
                if (error) {
                    return res.status(400).send({ message: error});
                }
                userInstance.addRoom(roomInstance);
                console.log(userInstance);
                res.cookie('userId', userInstance.id);
                res.cookie('roomId', 1);
                res.cookie('roomName', 'Main');
                res.redirect('/home');
            });
        });
    },

    createMessage: (req, res) => {
        Message.create({message: req.body.message, senderId: req.cookies.userId, roomId: req.cookies.roomId}).then((messageIntance, error) => {
            if (error) {
                return res.status(400).send({message: error});
            }
            res.redirect('/home');
        })
    },

    getMessages: (req, res) => {
        Message.findAll({where: {roomId: req.cookies.roomId}}).then((messages, error) => {
            if (error) {
                return res.status(400).send({message: error});
            }
            res.render('../client/home', {roomName:req.cookies.roomName, Messages: messages});
        })
    },

    getAllUsers: (req, res) => {
        User.findAll().then((users, error) => {
            if (error) {
                return res.status(400).send({message: error});
            }
            res.render('../client/createRoom', {Users: users});
        })
    },

    createRoom: (req, res) => {
        Room.create({name: req.body.name}).then((roomInstance, error) => {
            if (error) {
                return res.status(400).send({message: error});
            }
            const findUserPromises = [];
            req.body.users.forEach(user => {
                console.log('user', user);
                findUserPromises.push(User.findOne({
                    where: {name: user}
                }));
            });
            Promise.all(findUserPromises).then((users, error) => {
                roomInstance.addUsers(users);
                res.cookie('roomName', roomInstance.name);
                res.cookie('roomId', roomInstance.id);
                res.render('../client/home', {roomName: roomInstance.name, Messages: []});
            });
        });
    }
};

module.exports = databaseController;
