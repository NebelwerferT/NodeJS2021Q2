const uuid = require('uuid');
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
class User {
/**
 * @type {User}
 * @param {Object} userProps an object containing board properties
 * @param {string} userProps.id user id by uuid
 * @param {string} userProps.name user name
 * @param {string} userProps.login user login
 * @param {string} userProps.password user password
 */   
  constructor({
    id = uuid.v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

/**
 * Creates a copy of the user object, but without the password field
 * @param {User} user user object
 * @returns {Object} user object without password field
 */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
