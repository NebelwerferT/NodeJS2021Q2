import { ITask, Task } from './task.model';
/**
 * @module taskRepo
 */

const repo: ITask[] = [];

/**
 * Gets all tasks by board id from the repository
 * @param {string} boardId board id of the requested tasks
 * @returns {Promise<Array<Task>>} a promise object representing an array of tasks
 */
const getAll = async (boardId: string): Promise<ITask[]> => repo.filter(task => task.boardId === boardId);

/**
 * Gets a task by id from the repository
 * @param {string} id id of the requested task
 * @returns {Promise<Task>} a promise object representing a task
 */
const getById = async (id: string): Promise<ITask | undefined> => repo.filter(task => task.id === id)[0];

/**
 * Creates a new task in the repository
 * @param {Object} reqBody an object with a task structure
 * @returns {Promise<Task>} a promise object representing a created task
 */
const createTask = async (reqBody: ITask): Promise<ITask> => {

  const newTask = new Task(reqBody);
  repo.push(newTask);
  return newTask;
}

/**
 * Sends data according to which the task with the specified id will be updated.
 * @param {Object} reqBody an object with a task structure
 * @returns {Promise<Task>} a promise object representing an updated task
 */
const updateById = async (reqBody: ITask): Promise<ITask | undefined> => {
  const updatedTask = repo.find(task => task.id === reqBody.id);
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
const deleteById = async (id: string): Promise<ITask | undefined> => {
  const deletedTask = repo.find(task => task.id === id);;
  if (deletedTask !== undefined) { repo.splice(repo.indexOf(deletedTask), 1); }
  return deletedTask;
};

/**
 * Updates the task ID to set the user id field to null
 * @param {string} deletedUserId id of the deleted user
 * @returns {Promise<void>} no return required
 */
const setUserIdToNull = async (deletedUserId: string): Promise<void> => {
  repo.forEach((elem, i) => {
    if (elem.userId === deletedUserId) {
      const targetTask = repo[i];
      if (targetTask !== undefined) {
        targetTask.userId = null;
      }
    }
  });
}

/**
 * Deletes all tasks by the id of the removed board
 * @param {string} deletedBoardId id of the deleted board
 * @returns {Promise<void>} no return required
 */
const deleteBoardsTasks = async (deletedBoardId: string) => {
  const deletedTasks = repo.filter(task => task.boardId === deletedBoardId);
  deletedTasks.forEach(elem => {
    repo.splice(repo.indexOf(elem), 1);
  });
}

export { getAll, getById, createTask, updateById, deleteById, setUserIdToNull, deleteBoardsTasks };