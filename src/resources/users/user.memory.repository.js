/**
 * @module userRepo
 */

const User = require("./user.model");

const repo = [new User(), new User(), new User(), new User(), new User(), new User()];

/**
 * Gets all users from the repository
 * @returns {Promise<Array<User>>} a promise object representing an array of users
 */
const getAll = async () => repo;

/**
 * Gets an user by id from the repository
 * @param {string} id id of the requested user
 * @returns {Promise<User>} a promise object representing an user
 */
const getById = async (id) => repo.filter(user => user.id === id)[0];

/**
 * Creates a new user in the repository
 * @param {Object} reqBody an object with an user structure
 * @returns {Promise<User>} a promise object representing a created user
 */
const createUser = async (reqBody) => repo[repo.push(new User(reqBody)) - 1];

/**
 * Sends data according to which the user with the specified id will be updated.
 * @param {string} id id of the user to update
 * @param {string} name new name value for the user being updated
 * @returns {Promise<User>} a promise object representing an updated user
 */
const updateById = async (id, name) => {
  const updatedUser = repo[repo.indexOf(repo.filter(user => user.id === id)[0])];
  if (updatedUser !== undefined) {
    updatedUser.name = name;
  }
  return updatedUser;
};

/**
 * Deletes an user by id from the repository
 * @param {string} id id of the user to remove
 * @returns {Promise<User>} a promise object representing a deleted user
 */
const deleteById =  async (id) => {
  const deletedUser = repo.filter(user => user.id === id)[0];
  if (deletedUser !== undefined) {repo.splice(repo.indexOf(deletedUser), 1);}
  return deletedUser;
};

module.exports = { getAll, getById, createUser, updateById, deleteById };
