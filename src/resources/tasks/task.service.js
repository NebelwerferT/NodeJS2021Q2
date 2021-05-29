/**
 * @module taskService
 */

const tasksRepo = require('./task.memory.repository');


/**
 * Calls repository to get all tasks by board id
 * @param {string} boardId board id of the requested tasks
 * @returns {Promise<Array<Task>>} a promise object representing an array of tasks
 * {@link module:taskRepo}
 */
const getAll = (boardId) => tasksRepo.getAll(boardId);

/**
 * Calls repository to get a task by id
 * @param {string} id id of the requested task
 * @returns {Promise<Task>} a promise object representing a task
 * {@link module:taskRepo}
 */
const getById = (id) => tasksRepo.getById(id);

/**
 * Calls repository to create a new task
 * @param {Object} reqBody an object with a task structure
 * @returns {Promise<Task>} a promise object representing a created task
 * {@link module:taskRepo}
 */
const createTask = (reqBody) => tasksRepo.createTask(reqBody);

/**
 * Calls repository to send data according to which the task with the specified id will be updated
 * @param {Object} reqBody an object with a task structure
 * @returns {Promise<Task>} a promise object representing an updated task
 * {@link module:taskRepo}
 */
const updateById = (reqBody) => tasksRepo.updateById(reqBody);

/**
 * Calls repository to delete a task by id
 * @param {string} id id of the task to remove
 * @returns {Promise<Task>} a promise object representing an deleted task
 * {@link module:taskRepo}
 */
const deleteById = (id) => tasksRepo.deleteById(id);

/**
 * Calls repository to update the task ID to set the user id field to null
 * @param {string} deletedUserId id of the deleted user
 * @returns {Promise<void>} no return required
 * {@link module:taskRepo} 
 */
const setUserIdToNull = (deletedUserId) => tasksRepo.setUserIdToNull(deletedUserId);

/**
 * Calls repository to delete all tasks by the id of the removed board
 * @param {string} deletedBoardId id of the deleted board
 * @returns {Promise<void>} no return required
 * {@link module:taskRepo} 
 */
const deleteBoardsTasks = (deletedBoardId) => tasksRepo.deleteBoardsTasks(deletedBoardId);

module.exports = { getAll, getById, createTask, updateById, deleteById, setUserIdToNull, deleteBoardsTasks };