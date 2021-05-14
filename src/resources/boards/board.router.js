const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(200).json(boards);
  })
  .post(async (req, res) => {
    const board = await boardsService.createBoard(req.body);
    res.status(201).json(board);
  });

router.route('/:id')
  .get(async (req, res) => {
    const {id} = req.params;
    const board = await boardsService.getById(id);
    res.status(200).json(board);
  })
  .put(async (req, res) => {
    const updatedBoard = await boardsService.updateById(req.body);
    res.status(200).json(updatedBoard);
  })
  .delete(async (req, res) => {
    const {id} = req.params;
    const deletedBoard = await boardsService.deleteById(id);
    res.status(200).json(deletedBoard)
  });

module.exports = router;