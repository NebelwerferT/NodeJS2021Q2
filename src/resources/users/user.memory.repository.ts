import { User } from '../../entities/user.model';
import { getRepository } from 'typeorm';

/**
 * @module userRepo
 */

/**
 * Gets all users from the repository
 * @returns {Promise<Array<User>>} a promise object representing an array of users
 */
const getAll = async (): Promise<User[]> => {
  const repo = getRepository(User);
  return await repo.find();
};

/**
 * Gets an user by id from the repository
 * @param {string} id id of the requested user
 * @returns {Promise<User>} a promise object representing an user
 */
const getById = async (id: string): Promise<User | undefined> => {
  const repo = getRepository(User);
  return await repo.findOne({ where: { id: id } });
}

/**
 * Creates a new user in the repository
 * @param {Object} reqBody an object with an user structure
 * @returns {Promise<User>} a promise object representing a created user
 */
const createUser = async (reqBody: User): Promise<User> => {
  const repo = getRepository(User);
  const newUser = repo.create(reqBody);
  return await repo.save(newUser);
};
/**
 * Sends data according to which the user with the specified id will be updated.
 * @param {string} id id of the user to update
 * @param {string} name new name value for the user being updated
 * @returns {Promise<User | undefined>} a promise object representing an updated user
 */
const updateById = async (id: string, name: string): Promise<User | undefined> => {
  const repo = getRepository(User);
  const updatedUser = await repo.findOne(id);
  if (updatedUser !== undefined) {
    await repo.update(id, {name: name})
  }
  return await repo.findOne(id);
};

/**
 * Deletes an user by id from the repository
 * @param {string} id id of the user to remove
 * @returns {Promise<User | undefined>} a promise object representing a deleted user
 */
const deleteById = async (id: string): Promise<User | undefined> => {
  const repo = getRepository(User);
  const deletedUser = await repo.findOne({ where: { id: id } });
  if (deletedUser !== undefined) {
    await repo.delete(id);
  }
  return deletedUser;
};

export { getAll, getById, createUser, updateById, deleteById };
