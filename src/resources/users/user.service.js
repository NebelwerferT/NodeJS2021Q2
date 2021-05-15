const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getById = (id) => usersRepo.getById(id);
const createUser = (reqBody) => usersRepo.createUser(reqBody);
const updateById = (id, name) => usersRepo.updateById(id, name);
const deleteById = (id) => usersRepo.deleteById(id);

module.exports = { getAll, getById, createUser, updateById, deleteById };
