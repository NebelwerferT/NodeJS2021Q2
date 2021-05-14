const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

const {setUserIdToNull} = require('../tasks/task.service');

router.route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    res.status(200).json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const user = await usersService.createUser();
    delete user.password;
    res.status(201).json(user);
  });

router.route('/:id')
  .get(async (req, res) => {
    const {id} = req.params;
    const user = await usersService.getById(id);
    delete user.password;
    res.status(200).json(user);
  })
  .put(async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    const updatedUser = await usersService.updateById(id, name);
    delete updatedUser.password;
    res.status(200).json(updatedUser);
  })
  .delete(async (req, res) => {
    const {id} = req.params;
    const deletedUser = await usersService.deleteById(id);
    if (deletedUser === undefined) {
      res.status(404);
    }
    else {
      await setUserIdToNull(deletedUser.id);
    }
    res.status(200).json(deletedUser);
  });

module.exports = router;
