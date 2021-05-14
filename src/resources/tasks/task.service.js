const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();
const getById = (id) => tasksRepo.getById(id);
const createTask = (reqBody) => tasksRepo.createTask(reqBody);
const updateById = (reqBody) => tasksRepo.updateById(reqBody);
const deleteById = (id) => tasksRepo.deleteById(id);
const setUserIdToNull = (deletedUserId) => tasksRepo.setUserIdToNull(deletedUserId);
const deleteBoardsTasks = (deletedBoardId) => tasksRepo.deleteBoardsTasks(deletedBoardId)

module.exports = { getAll, getById, createTask, updateById, deleteById, setUserIdToNull, deleteBoardsTasks };