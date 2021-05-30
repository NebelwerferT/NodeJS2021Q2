/**
 * @module taskRepo
 */

const Task = require("./task.model");

const repo = [];

/**
 * Gets all tasks by board id from the repository
 * @param {string} boardId board id of the requested tasks
 * @returns {Promise<Array<Task>>} a promise object representing an array of tasks
 */
const getAll = async (boardId) => repo.filter(task => task.boardId === boardId);

/**
 * Gets a task by id from the repository
 * @param {string} id id of the requested task
 * @returns {Promise<Task>} a promise object representing a task
 */
const getById = async (id) => repo.filter(task => task.id === id)[0];

/**
 * Creates a new task in the repository
 * @param {Object} reqBody an object with a task structure
 * @returns {Promise<Task>} a promise object representing a created task
 */
const createTask = async (reqBody) => repo[repo.push(new Task(reqBody)) - 1]

/**
 * Sends data according to which the task with the specified id will be updated.
 * @param {Object} reqBody an object with a task structure
 * @returns {Promise<Task>} a promise object representing an updated task
 */
const updateById = async (reqBody) => {
  const updatedTask = repo[repo.indexOf(repo.filter(task => task.id === reqBody.id)[0])];
  if (updatedTask !== undefined) {
    updatedTask.title = reqBody.title;
  }
  return updatedTask;
};

/**
 * Deletes a task by id from the repository
 * @param {string} id id of the task to remove
 * @returns {Promise<Task>} a promise object representing a deleted task
 */
const deleteById = async (id) => {
  const deletedTask = repo.filter(task => task.id === id)[0];
  if (deletedTask !== undefined) {repo.splice(repo.indexOf(deletedTask), 1);}
  return deletedTask;
};

/**
 * Updates the task ID to set the user id field to null
 * @param {string} deletedUserId id of the deleted user
 * @returns {Promise<void>} no return required
 */
const setUserIdToNull = async (deletedUserId) => {
    repo.forEach((elem, i) => {
        if (elem.userId === deletedUserId) {
            repo[i].userId = null;
        }
    }); 
}

/**
 * Deletes all tasks by the id of the removed board
 * @param {string} deletedBoardId id of the deleted board
 * @returns {Promise<void>} no return required
 */
const deleteBoardsTasks = async (deletedBoardId) => {
  const deletedTasks = repo.filter(task => task.boardId === deletedBoardId);
  deletedTasks.forEach(elem => {
    repo.splice(repo.indexOf(elem), 1);
  });
}

module.exports = { getAll, getById, createTask, updateById, deleteById, setUserIdToNull, deleteBoardsTasks };