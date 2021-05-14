const User = require("./user.model");

const repo = [new User(), new User(), new User(), new User(), new User(), new User()];

const getAll = async () => repo;

const getById = async (id) => repo.filter(user => user.id === id)[0];

const createUser = async () => repo[repo.push(new User()) - 1];

const updateById = async (id, name) => {
  const updatingUserIdx = repo.indexOf(repo.filter(user => user.id === id)[0]);
  repo[updatingUserIdx].name = name;
  return repo[updatingUserIdx];
};

const deleteById =  async (id) => {
  const deletedUser = repo.filter(user => user.id === id)[0];
  if (deletedUser !== undefined) {repo.slice(repo.indexOf(deletedUser), 1);}
  return deletedUser;
};

module.exports = { getAll, getById, createUser, updateById, deleteById };
