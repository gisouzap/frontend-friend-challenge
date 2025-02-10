import bcrypt from 'bcryptjs';

const users = [
  {
    id: 1,
    email: 'geralt@thewitcher.com',
    username: 'Geralt de Rivia',
    password: bcrypt.hashSync('123456', 10),
    friends: [],
    picture: 'https://bit.ly/3QcbQ9I',
  },
  {
    id: 2,
    username: 'Yennefer',
    email: 'yennefer@thewitcher.com',
    password: bcrypt.hashSync('123456', 10),
    friends: [],
    picture: 'https://bit.ly/4hoS32S',
  },
  {
    id: 3,
    username: 'Ciri',
    email: 'ciri@thewitcher.com',
    password: bcrypt.hashSync('123456', 10),
    friends: [],
    picture: 'https://bit.ly/42Jpdpx',
  },
  {
    id: 4,
    username: 'Rick Grimes',
    email: 'rickgrimes@thewalkingdead.com',
    password: bcrypt.hashSync('123456', 10),
    friends: [],
    picture: 'https://bit.ly/4aWluai',
  },
  {
    id: 5,
    username: 'Daryl Dixon',
    email: 'daryldixon@thewalkingdead.com',
    password: bcrypt.hashSync('123456', 10),
    friends: [],
    picture: 'https://bit.ly/3CRtfS0',
  },
  {
    id: 6,
    username: 'Aloy',
    email: 'aloy@horizon.com',
    password: bcrypt.hashSync('123456', 10),
    friends: [],
    picture: 'https://bit.ly/4hS9UiH',
  },
  {
    id: 7,
    username: 'Ellie Williams',
    email: 'ellie@thelastofus.com',
    password: bcrypt.hashSync('123456', 10),
    friends: [],
    picture: 'https://bit.ly/4hsAgYx',
  },
  {
    id: 8,
    username: 'Joel Miller',
    email: 'joel@thelastofus.com',
    password: bcrypt.hashSync('123456', 10),
    friends: [],
    picture: 'https://bit.ly/40TvMDq',
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
