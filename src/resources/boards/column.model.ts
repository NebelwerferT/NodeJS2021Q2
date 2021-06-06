import { v4 as uuidv4 } from 'uuid';

export interface IColumn {
  id: string;
  title: string;
  order: number;
}
/**
 * @module boardModel
 * @ignore
 */
/**
 * Column instance type
 * @typedef {Object} Column
 * @property {String} id board id
 * @property {String} title board title
 * @property {Number} order column order
 */
/**
 * @module columnConstructor
 * @ignore
 */
/**
 * Class to create a Column object
 */
class Column implements IColumn {
  id: string;
  title: string;
  order: number;
  /**
   * Creates a column instance
   * @type {Column}
   * @param {Object} columnProps an object containing column properties
   * @param {String} columnProps.id column id by uuid
   * @param {String} columnProps.title column title
   * @param {Number} columnProps.order order of column on the board
   */
  constructor({
    id = uuidv4(),
    title = 'Column Title',
    order = 0
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

export { Column };