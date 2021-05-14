const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const getById = (id) => boardsRepo.getById(id);
const createBoard = (reqBody) => boardsRepo.createBoard(reqBody);
const updateById = (reqBody) => boardsRepo.updateById(reqBody);
const deleteById = (id) => boardsRepo.deleteById(id);

module.exports = { getAll, getById, createBoard, updateById, deleteById };
