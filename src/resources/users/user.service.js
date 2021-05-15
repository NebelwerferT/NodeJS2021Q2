const usersRepo = require('./user.memory.repository');
const {setUserIdToNull} = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();
const getById = (id) => usersRepo.getById(id);
const createUser = (reqBody) => usersRepo.createUser(reqBody);
const updateById = (id, name) => usersRepo.updateById(id, name);
const deleteById = async (id) => {
    const deletedUser = await usersRepo.deleteById(id);
    if (deletedUser) {await setUserIdToNull(deletedUser.id);}
    return deletedUser;
}

module.exports = { getAll, getById, createUser, updateById, deleteById };
