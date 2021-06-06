/**
 * @module taskService
 */

import { ITask } from "./task.model";

import * as tasksRepo from './task.memory.repository';


/**
 * Calls repository to get all tasks by board id
 * @param {string} boardId board id of the requested tasks
 * @returns {Promise<Array<Task>>} a promise object representing an array of tasks
 * {@link module:taskRepo}
 */
const getAll = (boardId: string): Promise<ITask[]> => tasksRepo.getAll(boardId);

/**
 * Calls repository to get a task by id
 * @param {string} id id of the requested task
 * @returns {Promise<Task>} a promise object representing a task
 * {@link module:taskRepo}
 */
const getById = (id: string): Promise<ITask | undefined> => tasksRepo.getById(id);

/**
 * Calls repository to create a new task
 * @param {Object} reqBody an object with a task structure
 * @returns {Promise<Task>} a promise object representing a created task
 * {@link module:taskRepo}
 */
const createTask = (reqBody: ITask): Promise<ITask> => tasksRepo.createTask(reqBody);

/**
 * Calls repository to send data according to which the task with the specified id will be updated
 * @param {Object} reqBody an object with a task structure
 * @returns {Promise<Task>} a promise object representing an updated task
 * {@link module:taskRepo}
 */
const updateById = (reqBody: ITask): Promise<ITask | undefined> => tasksRepo.updateById(reqBody);

/**
 * Calls repository to delete a task by id
 * @param {string} id id of the task to remove
 * @returns {Promise<Task>} a promise object representing an deleted task
 * {@link module:taskRepo}
 */
const deleteById = (id: string): Promise<ITask | undefined> => tasksRepo.deleteById(id);

/**
 * Calls repository to update the task ID to set the user id field to null
 * @param {string} deletedUserId id of the deleted user
 * @returns {Promise<void>} no return required
 * {@link module:taskRepo} 
 */
const setUserIdToNull = (deletedUserId: string): Promise<void> => tasksRepo.setUserIdToNull(deletedUserId);

/**
 * Calls repository to delete all tasks by the id of the removed board
 * @param {string} deletedBoardId id of the deleted board
 * @returns {Promise<void>} no return required
 * {@link module:taskRepo} 
 */
const deleteBoardsTasks = (deletedBoardId: string): Promise<void> => tasksRepo.deleteBoardsTasks(deletedBoardId);

export { getAll, getById, createTask, updateById, deleteById, setUserIdToNull, deleteBoardsTasks };