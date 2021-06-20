import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Board } from './board.model';

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
@Entity({ name: 'column' })
export class Columns {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column('integer')
  order: number;

  @ManyToOne(() => Board, { onDelete: 'CASCADE' })
  board: Board;

  @Column('uuid')
  boardId: string;

  /**
   * Creates a column instance
   * @type {Column}
   * @param {Object} columnProps an object containing column properties
   * @param {String} columnProps.id column id by uuid
   * @param {String} columnProps.title column title
   * @param {Number} columnProps.order order of column on the board
   */
}