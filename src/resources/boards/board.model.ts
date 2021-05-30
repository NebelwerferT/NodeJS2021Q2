import { v4 as uuidv4 } from 'uuid';

import {Column} from './column.model';

export interface IBoard {
  id: string;
  title: string;
  columns: Column[]
}
/**
 * @module boardModel
 */
/**
 * Board instance type
 * @typedef {Object} Board
 * @property {String} id board id
 * @property {String} title board title
 * @property {Array<Column>} columns an array of сolumn instances
 */

/**
 * @module boardConstructor
 * @ignore
 */
/**
 * Class to create a Board object
 */
class Board implements IBoard {
  id: string;
  title: string;
  columns: Column[];
/**
 * @type {Board}
 * @param {Object} boardProps an object containing board properties
 * @param {string} boardProps.id board id by uuid
 * @param {string} boardProps.title board title
 * @param {Array<Column>} boardProps.columns board columns
 */
  constructor({
    id = uuidv4(),
    title = "title",
    columns = [new Column({})],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns
    };
  }


export {Board};
