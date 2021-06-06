import { NextFunction, Request, Response } from 'express';
import * as boardsService from './board.service';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { LogErr } from '../../middleware/interfaces';

const router = require('express').Router();

router.route('/')
  .get(async (_req: Request, res: Response) => {
    const boards = await boardsService.getAll();
    res.status(StatusCodes.OK).json(boards);
  })
  .post(async (req: Request, res: Response) => {
    const board = await boardsService.createBoard(req.body);
    res.status(StatusCodes.CREATED).json(board);
  });

router.route('/:id')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (id !== undefined) {
      const board = await boardsService.getById(id);
      if (!board) { next(new LogErr({ req, res }, StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)); }
      else { res.status(StatusCodes.OK).json(board); }
    }
    else { next(new LogErr({ req, res }, StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)); }
  })
  .put(async (req: Request, res: Response, next: NextFunction) => {
    const updatedBoard = await boardsService.updateById(req.body);
    if (!updatedBoard) { next(new LogErr({ req, res }, StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)); }
    else { res.status(StatusCodes.OK).json(updatedBoard); }
  })
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (id !== undefined) {
      const deletedBoard = await boardsService.deleteById(id);
      if (deletedBoard === undefined) { next(new LogErr({ req, res }, StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)); }
      else { res.status(StatusCodes.OK).json(deletedBoard); }
    }
    else { next(new LogErr({ req, res }, StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)); }
  });

export { router };