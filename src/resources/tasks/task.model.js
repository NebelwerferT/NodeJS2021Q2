const uuid = require('uuid');

class Task {
  constructor({
    id = uuid.v4(),
    title = "Test",
    order = 1,
    description = null,
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

//   static toResponse(user) {
//     const { id, name, login } = user;
//     return { id, name, login };
//   }
}

module.exports = Task;
