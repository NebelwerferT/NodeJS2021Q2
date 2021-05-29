const router = require('express').Router();
const tasksService = require('./task.service');

router.route('/:boardId/tasks/')
  .get(async (req, res) => {
    const {boardId} = req.params;
    const tasks = await tasksService.getAll(boardId);
    if (tasks.length === 0) {res.sendStatus(404);}
    else {res.status(200).json(tasks);}
  })
  .post(async (req, res) => {
    req.body.boardId = req.params.boardId;
    const task = await tasksService.createTask(req.body);
    res.status(201).json(task);
  });

router.route('/:boardId/tasks/:id')
  .get(async (req, res) => {
    const {id} = req.params;
    const task = await tasksService.getById(id);
    if (!task) {res.sendStatus(404);}
    res.status(200).json(task);
  })
  .put(async (req, res) => {
    const updatedTask = await tasksService.updateById(req.body);
    if (!updatedTask) {res.sendStatus(404);}
    else {res.status(200).json(updatedTask);}
  })
  .delete(async (req, res) => {
    const {id} = req.params;
    const deletedTask = await tasksService.deleteById(id);
    if (deletedTask === undefined) {
      res.sendStatus(404);
    }
    else {res.status(200).json(deletedTask);}
  });

module.exports = router;