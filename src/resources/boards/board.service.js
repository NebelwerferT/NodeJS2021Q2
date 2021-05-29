/**
 * @module boardService
 */

const boardsRepo = require('./board.memory.repository');
const {deleteBoardsTasks} = require('../tasks/task.service');

/**
 * Calls repository to get all boards
 * @returns {Promise<Array<Board>>} a promise object representing an array of boards
 * {@link module:boardRepo}
 */
const getAll = () => boardsRepo.getAll();

/**
 * Calls repository to get a board by id
 * @param {string} id id of the requested board
 * @returns {Promise<Board>} a promise object representing a board
 * {@link module:boardRepo}
 */
const getById = (id) => boardsRepo.getById(id);

/**
 * Calls repository to create a new board
 * @param {Object} reqBody an object with a board structure
 * @returns {Promise<Board>} a promise object representing a created board
 * {@link module:boardRepo}
 */
const createBoard = (reqBody) => boardsRepo.createBoard(reqBody);

/**
 * Calls repository to send data according to which the board with the specified id will be updated
 * @param {Object} reqBody an object with a board structure
 * @returns {Promise<Board>} a promise object representing an updated board
 * {@link module:boardRepo}
 */
const updateById = (reqBody) => boardsRepo.updateById(reqBody);

/**
 * Calls repository to delete a board by id
 * @param {string} id id of the board to remove
 * @returns {Promise<Board>} a promise object representing an deleted board
 * {@link module:boardRepo}
 * {@link module:taskService}
 */
const deleteById = async (id) => {
    const deletedBorder = await boardsRepo.deleteById(id);
    if (deletedBorder) {await deleteBoardsTasks(deletedBorder.id);}
    return deletedBorder;
}

module.exports = { getAll, getById, createBoard, updateById, deleteById };
