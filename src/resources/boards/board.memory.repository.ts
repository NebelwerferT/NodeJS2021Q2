import {Board, IBoard} from "./board.model";

/**
 * @module boardRepo
 */

const repo: IBoard[] = [];

/**
 * Gets all boards from the repository
 * @returns {Promise<Array<Board>>} a promise object representing an array of boards
 */
const getAll = async (): Promise<IBoard[]> => repo;

/**
 * Gets a board by id from the repository
 * @param {string} id id of the requested board
 * @returns {Promise<Board>} a promise object representing a board
 */
const getById = async (id: string): Promise<IBoard|undefined> => repo.find(board => board.id === id)

/**
 * Creates a new board in the repository
 * @param {Object} reqBody an object with a board structure
 * @returns {Promise<Board>} a promise object representing a created board
 */
const createBoard = async (reqBody: IBoard): Promise<IBoard> => {
  const newBoard = new Board(reqBody);
  repo.push(newBoard);
  return newBoard;
};


/**
 * Sends data according to which the board with the specified id will be updated.
 * @param {Object} reqBody an object with a board structure
 * @returns {Promise<Board>} a promise object representing an updated board
 */
const updateById = async (reqBody: IBoard): Promise<IBoard|undefined> => {
  const updatedBoard = repo.find(board => board.id === reqBody.id);
  if (updatedBoard !== undefined) {
    updatedBoard.title = reqBody.title;
    updatedBoard.columns = reqBody.columns;
  }
  return updatedBoard;
};

/**
 * Deletes a board by id from the repository
 * @param {string} id id of the board to remove
 * @returns {Promise<Board>} a promise object representing an deleted board
 */
const deleteById =  async (id: string): Promise<IBoard|undefined> => {
  const deletedBorder = repo.find(board => board.id === id);
  if(deletedBorder !== undefined) {repo.splice(repo.indexOf(deletedBorder), 1);}
  return deletedBorder;
};

export { getAll, getById, createBoard, updateById, deleteById };