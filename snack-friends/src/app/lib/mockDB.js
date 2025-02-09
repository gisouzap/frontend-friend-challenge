import users from './users';

const usersInfo = users;

export const addUser = user => {
  usersInfo.push(user);
};

export const findUserByEmail = email => {
  return usersInfo.find(user => user.email === email);
};

export const findUserById = id => {
  return usersInfo.find(user => user.id === id);
};

export const usersDB = usersInfo;
