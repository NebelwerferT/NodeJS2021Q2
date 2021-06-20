import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
@Entity({ name: 'task' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 255 })
  title: string;
  @Column()
  order: number;
  @Column({ type: 'varchar', length: 255 })
  description: string;
  @Column({ type: 'varchar', nullable: true, length: 255 })
  userId!: string | null;
  @Column({ type: 'varchar', nullable: true, length: 255 })
  boardId: string | null;
  @Column({ type: 'varchar', nullable: true, length: 255 })
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
}
