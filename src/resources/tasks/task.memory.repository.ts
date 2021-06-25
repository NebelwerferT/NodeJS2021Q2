import { getRepository } from 'typeorm';
import { Task } from '../../entities/task.model';

/**
 * @module taskRepo
 */

/**
 * Gets all tasks by board id from the repository
 * @param {string} boardId board id of the requested tasks
 * @returns {Promise<Array<Task>>} a promise object representing an array of tasks
 */
const getAll = async (boardId: string): Promise<Task[]> => {
  const repo = getRepository(Task);
  return await repo.find({ where: { boardId } });
}

/**
 * Gets a task by id from the repository
 * @param {string} id id of the requested task
 * @returns {Promise<Task>} a promise object representing a task
 */
const getById = async (id: string): Promise<Task | undefined> => {
  const repo = getRepository(Task);
  return await repo.findOne({ where: { id } });
}

/**
 * Creates a new task in the repository
 * @param {Object} reqBody an object with a task structure
 * @returns {Promise<Task>} a promise object representing a created task
 */
const createTask = async (reqBody: Task): Promise<Task> => {
  const repo = getRepository(Task);
  const newTask = repo.create(reqBody);
  return await repo.save(newTask);
}

/**
 * Sends data according to which the task with the specified id will be updated.
 * @param {Object} reqBody an object with a task structure
 * @returns {Promise<Task>} a promise object representing an updated task
 */
const updateById = async (reqBody: Task): Promise<Task | undefined> => {
  const repo = getRepository(Task);
  const updatedTask = await repo.findOne(reqBody.id);
  if (updatedTask !== undefined) {
    await repo.update(reqBody.id, reqBody)
  }
  return await repo.findOne(reqBody.id);
};

/**
 * Deletes a task by id from the repository
 * @param {string} id id of the task to remove
 * @returns {Promise<Task>} a promise object representing a deleted task
 */
const deleteById = async (id: string): Promise<Task | undefined> => {
  const repo = getRepository(Task);
  const deletedTask = await repo.findOne({ where: { id } });
  if (deletedTask !== undefined) {
    await repo.delete(id)
  }
  return deletedTask;
};

/**
 * Updates the task ID to set the user id field to null
 * @param {string} deletedUserId id of the deleted user
 * @returns {Promise<void>} no return required
 */
const setUserIdToNull = async (deletedUserId: string): Promise<void> => {
  const repo = getRepository(Task);
  await repo.update({userId: deletedUserId}, {userId: null});
}

/**
 * Deletes all tasks by the id of the removed board
 * @param {string} deletedBoardId id of the deleted board
 * @returns {Promise<void>} no return required
 */
const deleteBoardsTasks = async (deletedBoardId: string): Promise<void> => {
  const repo = getRepository(Task);
  await repo.delete({ boardId: deletedBoardId });
}

export { getAll, getById, createTask, updateById, deleteById, setUserIdToNull, deleteBoardsTasks };