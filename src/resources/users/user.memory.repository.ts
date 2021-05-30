import { User, IUser } from './user.model';
/**
 * @module userRepo
 */

const repo: IUser[] = [];

/**
 * Gets all users from the repository
 * @returns {Promise<Array<User>>} a promise object representing an array of users
 */
const getAll = async (): Promise<IUser[]> => repo;

/**
 * Gets an user by id from the repository
 * @param {string} id id of the requested user
 * @returns {Promise<User>} a promise object representing an user
 */
const getById = async (id: string): Promise<IUser | undefined> => repo.find(user => user.id === id);

/**
 * Creates a new user in the repository
 * @param {Object} reqBody an object with an user structure
 * @returns {Promise<User>} a promise object representing a created user
 */
const createUser = async (reqBody: IUser): Promise<IUser> => {
  const newUser = new User(reqBody);
  repo.push(newUser);
  return newUser;
}
/**
 * Sends data according to which the user with the specified id will be updated.
 * @param {string} id id of the user to update
 * @param {string} name new name value for the user being updated
 * @returns {Promise<User>} a promise object representing an updated user
 */
const updateById = async (id: string, name: string): Promise<IUser | undefined> => {
  const updatedUser = repo.find(user => user.id === id);;
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
const deleteById = async (id: String) => {
  const deletedUser = repo.filter(user => user.id === id)[0];
  if (deletedUser !== undefined) { repo.splice(repo.indexOf(deletedUser), 1); }
  return deletedUser;
};

export { getAll, getById, createUser, updateById, deleteById };
