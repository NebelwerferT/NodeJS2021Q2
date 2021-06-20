import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Columns } from './column.model';

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

@Entity({ name: 'board' })
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string;

  @OneToMany(
    () => Columns,
    column => column.board,
    { onDelete: 'CASCADE', cascade: true, eager: true }
  )
  columns: Columns[];

  /**
   * @type {Board}
   * @param {Object} boardProps an object containing board properties
   * @param {string} boardProps.id board id by uuid
   * @param {string} boardProps.title board title
   * @param {Array<Column>} boardProps.columns board columns
   */
}