import { getRepository } from 'typeorm';
import { Board } from "../../entities/board.model";

/**
 * @module boardRepo
 */

/**
 * Gets all boards from the repository
 * @returns {Promise<Array<Board>>} a promise object representing an array of boards
 */
const getAll = async (): Promise<Board[]> => {
  const repo = getRepository(Board);
  return await repo.find();
};

/**
 * Gets a board by id from the repository
 * @param {string} id id of the requested board
 * @returns {Promise<Board>} a promise object representing a board
 */
const getById = async (id: string): Promise<Board | undefined> => {
  const repo = getRepository(Board);
  return await repo.findOne({ where: { id } });
}

/**
 * Creates a new board in the repository
 * @param {Object} reqBody an object with a board structure
 * @returns {Promise<Board>} a promise object representing a created board
 */
const createBoard = async (reqBody: Board): Promise<Board> => {
  const repo = getRepository(Board);
  const newBoard = repo.create(reqBody);
  return await repo.save(newBoard);
};


/**
 * Sends data according to which the board with the specified id will be updated.
 * @param {Object} reqBody an object with a board structure
 * @returns {Promise<Board>} a promise object representing an updated board
 */
const updateById = async (reqBody: Board): Promise<Board | undefined> => {
  const {id, columns, ...data} = reqBody;
  const repo = getRepository(Board);
  const updatedBoard = await repo.findOne(id);
  if (updatedBoard !== undefined) {
    await repo.update(id, data);
  }
  return await repo.findOne(reqBody.id);
};

/**
 * Deletes a board by id from the repository
 * @param {string} id id of the board to remove
 * @returns {Promise<Board>} a promise object representing an deleted board
 */
const deleteById = async (id: string): Promise<Board | undefined> => {
  const repo = getRepository(Board);
  const deletedBoard = await repo.findOne({ where: { id } });
  if (deletedBoard !== undefined) {
    await repo.delete(id)
  }
  return deletedBoard;
};

export { getAll, getById, createBoard, updateById, deleteById };