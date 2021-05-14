const uuid = require('uuid');

class Board { 
  constructor({
    id = uuid.v4(),
    title,
    columns,
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = (columns.map(column => {
      const columnWithId = {
        id: uuid.v4(),
        order: column.order,
        title: column.title
      }
      return columnWithId;
    }));
  }

  addColumn(column) {
    const cColumn = column;
    cColumn.id = uuid.v4();
    this.columns.push(cColumn);
  }
}

module.exports = Board;
