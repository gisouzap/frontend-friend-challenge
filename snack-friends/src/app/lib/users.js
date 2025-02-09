import bcrypt from 'bcryptjs';

const users = [
  {
    id: 1,
    email: 'geralt@thewitcher.com',
    username: 'Geralt de Rivia',
    password: bcrypt.hashSync('123456', 10),
    friends: [],
  },
  {
    id: 2,
    username: 'Yennefer',
    email: 'yennefer@thewitcher.com',
    password: bcrypt.hashSync('123456', 10),
    friends: [],
  },
  {
    id: 3,
    username: 'Triss Merigold',
    email: 'triss@thewitcher.com',
    password: bcrypt.hashSync('123456', 10),
    friends: [],
  },
  {
    id: 4,
    username: 'Ciri',
    email: 'ciri@thewitcher.com',
    password: bcrypt.hashSync('123456', 10),
    friends: [],
  },
  {
    id: 5,
    username: 'Rick Grimes',
    email: 'rickgrimes@thewalkingdead.com',
    password: bcrypt.hashSync('123456', 10),
    friends: [],
  },
  {
    id: 6,
    username: 'Daryl Dixon',
    email: 'daryldixon@thewalkingdead.com',
    password: bcrypt.hashSync('123456', 10),
    friends: [],
  },
  {
    id: 7,
    username: 'Aloy',
    email: 'aloy@horizon.com',
    password: bcrypt.hashSync('123456', 10),
    friends: [],
  },
  {
    id: 8,
    username: 'Ellie Williams',
    email: 'ellie@thelastofus.com',
    password: bcrypt.hashSync('123456', 10),
    friends: [],
  },
  {
    id: 9,
    username: 'Joel Miller',
    email: 'joel@thelastofus.com',
    password: bcrypt.hashSync('123456', 10),
    friends: [],
  },
  {
    id: 15,
    username: 'Gi Souza',
    email: 'giselle@snackteam.com',
    password: bcrypt.hashSync('123456', 10),
    friends: [],
  },
];

export default users;
