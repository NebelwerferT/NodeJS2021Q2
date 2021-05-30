/**
 * @module userService
 */
import { IUser } from './user.model';
import * as usersRepo from './user.memory.repository';
import { setUserIdToNull } from '../tasks/task.service';

/**
 * Calls repository to get all users
 * @returns {Promise<Array<User>>} a promise object representing an array of users
 * {@link module:userRepo}
 */
const getAll = (): Promise<IUser[]> => usersRepo.getAll();

/**
 * Calls repository to get a user by id
 * @param {string} id id of the requested user
 * @returns {Promise<User>} a promise object representing a user
 * {@link module:userRepo}
 */
const getById = (id: string): Promise<IUser | undefined> => usersRepo.getById(id);

/**
 * Calls repository to create a new user
 * @param {Object} reqBody an object with a user structure
 * @returns {Promise<User>} a promise object representing a created user
 * {@link module:userRepo}
 */
const createUser = (reqBody: IUser): Promise<IUser> => usersRepo.createUser(reqBody);

/**
 * Calls repository to send data according to which the user with the specified id will be updated
 * @param {string} id id of the user to update
 * @param {string} name new name value for the user being updated
 * @returns {Promise<User>} a promise object representing an updated user
 * {@link module:userRepo}
 */
const updateById = (id: string, name: string): Promise<IUser | undefined> => usersRepo.updateById(id, name);

/**
 * Calls repository to delete a user by id
 * @param {string} id id of the user to remove
 * @returns {Promise<User>} a promise object representing an deleted user
 * {@link module:userRepo}
 * {@link module:taskService}
 */
const deleteById = async (id: string): Promise<IUser | undefined> => {
    const deletedUser: IUser | undefined = await usersRepo.deleteById(id);
    if (deletedUser) { await setUserIdToNull(deletedUser.id); }
    return deletedUser;
}

export { getAll, getById, createUser, updateById, deleteById };
