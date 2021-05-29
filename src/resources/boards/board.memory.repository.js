const Board = require("./board.model");

const repo = [
  new Board({id: 'Test1', title: 'Test1', columns: []}),
  new Board({id: undefined, title: 'Test', columns: []}),
  new Board({id: undefined, title: 'Test', columns: []}),
  new Board({id: undefined, title: 'Test', columns: []}),
  new Board({id: 'Test2', title: 'Test2', columns: []}),
  new Board({id: undefined, title: 'Test', columns: []})
];

/**
 * Get all boards from the repository
 * @returns {Promise<Array<Board>>} a promise object representing an array of boards
 */
const getAll = async () => repo;

/**
 * Get a board by id from the repository
 * @param {string} id id of the requested board
 * @returns {Promise<Board>} a promise object representing a board
 */
const getById = async (id) => repo.filter(board => board.id === id)[0]

/**
 * Create a new board in the repository
 * @param {object} reqBody an object from the request body with a board structure
 * @returns {Promise<Board>} a promise object representing a created board
 */
const createBoard = async (reqBody) => repo[(repo.push(new Board(reqBody))) - 1];


/**
 * Sends data according to which the board with the specified id will be updated.
 * @param {object} reqBody an object from the request body with a board structure
 * @returns {Promise<Board>} a promise object representing an updated board
 */
const updateById = async (reqBody) => {
  const updatedBoard = repo[repo.indexOf(repo.filter(board => board.id === reqBody.id)[0])];
  if (updatedBoard !== undefined) {
    updatedBoard.title = reqBody.title;
    updatedBoard.columns = reqBody.columns;
  }
  return updatedBoard;
};

/**
 * Delete a board by id from the repository
 * @param {string} id id of the board to remove
 * @returns {Promise<Board>} a promise object representing an deleted board
 */
const deleteById =  async (id) => {
  const deletedBorder = repo.filter(board => board.id === id)[0];
  if(deletedBorder !== undefined) {repo.splice(repo.indexOf(deletedBorder), 1);}
  return deletedBorder;
};

module.exports = { getAll, getById, createBoard, updateById, deleteById };