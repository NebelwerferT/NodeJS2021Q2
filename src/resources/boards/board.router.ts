import { Request, Response } from 'express';
import * as boardsService from './board.service';

const router = require('express').Router();

router.route('/')
  .get(async (_req: Request, res: Response) => {
    const boards = await boardsService.getAll();
    res.status(200).json(boards);
  })
  .post(async (req: Request, res: Response) => {
    const board = await boardsService.createBoard(req.body);
    res.status(201).json(board);
  });

router.route('/:id')
  .get(async (req: Request, res: Response) => {
    const {id} = req.params;
    if (id !== undefined) {
    const board = await boardsService.getById(id);
    if (!board) {res.sendStatus(404);}
    else {res.status(200).json(board);}
  }
  else {res.sendStatus(404);}
  })
  .put(async (req: Request, res: Response) => {
    const updatedBoard = await boardsService.updateById(req.body);
    if (!updatedBoard) {res.sendStatus(404);}
    else {res.status(200).json(updatedBoard);}
  })
  .delete(async (req: Request, res: Response) => {
    const {id} = req.params;
    if (id !== undefined) {
    const deletedBoard = await boardsService.deleteById(id);
    if (deletedBoard === undefined) {res.sendStatus(404);}
    else {res.status(200).json(deletedBoard);}
    }
    else {res.sendStatus(404);}
  });

export { router };