import { v4 as uuidv4 } from 'uuid';
export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}
/**
 * @module taskModel
 */
/**
 * Task instance type
 * @typedef {Object} Task
 * @property {string} id task id 
 * @property {string} title task title
 * @property {Number} order task order
 * @property {string} description task description
 * @property {string|null} userId user id for this task
 * @property {string|null} boardId board ID for this task
 * @property {string|null} columnId column ID for this task
 */
/**
 * @module taskConstructor
 * @ignore
 */
/**
 * Class to create a Task object
 */
class Task implements ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
  /**
   * @type {Task}
   * @param {Object} taskProps an object containing task properties
   * @param {string} taskProps.id task id by uuid
   * @param {string} taskProps.title task title
   * @param {Number} taskProps.order order of the task instance in its column
   * @param {string} taskProps.description task description
   * @param {string|null} taskProps.userId user id for this task instance
   * @param {string|null} taskProps.boardId board ID for this task instance
   * @param {string|null} taskProps.columnId column ID for this task instance
   */
  constructor({
    id = uuidv4(),
    title = 'Test',
    order = 1,
    description = 'Desc',
    userId = "userId",
    boardId = "boardId",
    columnId = "columnId",
  }: ITask) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

export { Task };
