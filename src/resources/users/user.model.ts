import { v4 as uuidv4 } from 'uuid';

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}
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
class User implements IUser {

  id: string;
  name: string;
  login: string;
  password: string;
  /**
   * @type {User}
   * @param {Object} userProps an object containing board properties
   * @param {string} userProps.id user id by uuid
   * @param {string} userProps.name user name
   * @param {string} userProps.login user login
   * @param {string} userProps.password user password
   */
  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  }: IUser) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Creates a copy of the user object, but without the password field
   * @param {User} user user object
   * @returns {{id, name, login, string}} user object without password field
   */
  static toResponse(user: IUser): { id: string, name: string, login: string } {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export {User};
