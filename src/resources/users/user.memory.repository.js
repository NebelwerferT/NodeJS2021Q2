const User = require("./user.model");

const repo = [new User(), new User(), new User(), new User(), new User(), new User()];

const getAll = async () => repo;

const getById = async (id) => repo.filter(user => user.id === id)[0];

const createUser = async (reqBody) => repo[repo.push(new User(reqBody)) - 1];

const updateById = async (id, name) => {
  const updatedUser = repo[repo.indexOf(repo.filter(user => user.id === id)[0])];
  if (updatedUser !== undefined) {
    updatedUser.name = name;
  }
  return updatedUser;
};

const deleteById =  async (id) => {
  const deletedUser = repo.filter(user => user.id === id)[0];
  if (deletedUser !== undefined) {repo.splice(repo.indexOf(deletedUser), 1);}
  return deletedUser;
};

module.exports = { getAll, getById, createUser, updateById, deleteById };
