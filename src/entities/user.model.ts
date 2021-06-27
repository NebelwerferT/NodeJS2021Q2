import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import bcryptjs from 'bcryptjs';

/**
 * @module userModel
 */
/**
 * User instance type
 * @typedef {Object} User
 * @property {string} id user id
 * @property {string} name user name
 * @property {string} login user login
 * @property {string} password user password
 */
/**
 * @module userConstructor
 * @ignore
 */
/**
 * Class to create a User object
 */
@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 64 })
  name: string;

  @Column({ type: 'varchar', length: 64 })
  login: string;

  @Column({ type: 'varchar', length: 64 })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcryptjs.hash(this.password, 10);
  }

  /**
   * @type {User}
   * @param {Object} userProps an object containing board properties
   * @param {string} userProps.id user id by uuid
   * @param {string} userProps.name user name
   * @param {string} userProps.login user login
   * @param {string} userProps.password user password
   */

  /**
   * Creates a copy of the user object, but without the password field
   * @param {User} user user object
   * @returns {{id, name, login, string}} user object without password field
   */
  static toResponse(user: User): { id: string, name: string, login: string } {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
