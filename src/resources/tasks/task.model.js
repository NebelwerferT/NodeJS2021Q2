const uuid = require('uuid');

/**
 * Class to create a Task object
 * @class Task
 */
class Task {
/**
 * @type {Task}
 * @param {Object} taskProps an object containing task properties
 * @param {string} taskProps.id task id by uuid
 * @param {string} taskProps.title task title
 * @param {Number} taskProps.order order of the task instance in its column
 * @param {string} taskProps.description task description
 * @param {string|null} taskProps.userId user id for this task instance
 * @param {string} taskProps.boardId board ID for this task instance
 * @param {string|null} taskProps.columnId column ID for this task instance
 */  
  constructor({
    id = uuid.v4(),
    title = 'Test',
    order = '1',
    description = 'Desc',
    userId = null,
    boardId,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;
