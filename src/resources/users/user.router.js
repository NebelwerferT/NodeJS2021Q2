const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    res.status(200).json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const user = await usersService.createUser(req.body);
    res.status(201).json(User.toResponse(user));
  });

router.route('/:id')
  .get(async (req, res) => {
    const {id} = req.params;
    const user = await usersService.getById(id);
    if (!user) {res.sendStatus(404);}
    else {
      res.status(200).json(User.toResponse(user));
    }
  })
  .put(async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    const updatedUser = await usersService.updateById(id, name);
    if (!updatedUser) {res.sendStatus(404);}
    else {
      res.status(200).json(User.toResponse(updatedUser));
    }
  })
  .delete(async (req, res) => {
    const {id} = req.params;
    const deletedUser = await usersService.deleteById(id);
    if (!deletedUser) {
      res.sendStatus(404);
    }
    else {
      res.status(200).json(User.toResponse(deletedUser));
    }
  });

module.exports = router;
