const uuid = require('uuid');
const Column = require('./column.model');
/**
 * Class to create a Board object
 * @class Board
 */
class Board {
/**
 * @type {Board}
 * @param {Object} boardProps an object containing board properties
 * @param {string} boardProps.id board id by uuid
 * @param {string} boardProps.title board title
 * @param {Array<Column>} boardProps.columns board columns
 */
  constructor({
    id = uuid.v4(),
    title ,
    columns = [new Column()],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns
    };
  }


module.exports = Board;
