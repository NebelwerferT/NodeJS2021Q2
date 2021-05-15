const boardsRepo = require('./board.memory.repository');
const {deleteBoardsTasks} = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();
const getById = (id) => boardsRepo.getById(id);
const createBoard = (reqBody) => boardsRepo.createBoard(reqBody);
const updateById = (reqBody) => boardsRepo.updateById(reqBody);
const deleteById = async (id) => {
    const deletedBorder = await boardsRepo.deleteById(id);
    if (deletedBorder) {await deleteBoardsTasks(deletedBorder.id);}
    return deletedBorder;
}

module.exports = { getAll, getById, createBoard, updateById, deleteById };
