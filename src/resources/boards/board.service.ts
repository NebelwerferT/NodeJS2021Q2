import * as boardsRepo from './board.memory.repository';
import { deleteBoardsTasks } from '../tasks/task.service';
import { IBoard } from './board.model';
/**
 * @module boardService
 */

/**
 * Calls repository to get all boards
 * @returns {Promise<Array<Board>>} a promise object representing an array of boards
 * {@link module:boardRepo}
 */
const getAll = (): Promise<IBoard[]> => boardsRepo.getAll();

/**
 * Calls repository to get a board by id
 * @param {string} id id of the requested board
 * @returns {Promise<Board>} a promise object representing a board
 * {@link module:boardRepo}
 */
const getById = (id: string): Promise<IBoard | undefined> => boardsRepo.getById(id);

/**
 * Calls repository to create a new board
 * @param {Object} reqBody an object with a board structure
 * @returns {Promise<Board>} a promise object representing a created board
 * {@link module:boardRepo}
 */
const createBoard = (reqBody: IBoard): Promise<IBoard> => boardsRepo.createBoard(reqBody);

/**
 * Calls repository to send data according to which the board with the specified id will be updated
 * @param {Object} reqBody an object with a board structure
 * @returns {Promise<Board>} a promise object representing an updated board
 * {@link module:boardRepo}
 */
const updateById = (reqBody: IBoard): Promise<IBoard|undefined> => boardsRepo.updateById(reqBody);

/**
 * Calls repository to delete a board by id
 * @param {string} id id of the board to remove
 * @returns {Promise<Board>} a promise object representing an deleted board
 * {@link module:boardRepo}
 * {@link module:taskService}
 */
const deleteById = async (id: string): Promise<IBoard | undefined> => {
    const deletedBorder = await boardsRepo.deleteById(id);
    if (deletedBorder) { await deleteBoardsTasks(deletedBorder.id); }
    return deletedBorder;
}

export { getAll, getById, createBoard, updateById, deleteById };
