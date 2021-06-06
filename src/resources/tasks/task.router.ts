import { NextFunction, Request, Response } from 'express';
import * as tasksService from './task.service';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { LogErr } from '../../middleware/interfaces'

const router = require('express').Router();


router.route('/:boardId/tasks/')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    const { boardId } = req.params;
    if (boardId !== undefined) {
      const tasks = await tasksService.getAll(boardId);
      if (tasks.length === 0) { next(new LogErr({ req, res }, StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)); }
      else { res.status(StatusCodes.OK).json(tasks); }
    }
    else { next(new LogErr({ req, res }, StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)); }
  })
  .post(async (req: Request, res: Response, next: NextFunction) => {
    const { boardId } = req.params;
    if (!req.body.boardId && boardId) { req.body.boardId = boardId }
    if (req.body.boardId) {
      const task = await tasksService.createTask(req.body);
      res.status(StatusCodes.CREATED).json(task);
    }
    else { next(new LogErr({ req, res }, StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)); }
  });

router.route('/:boardId/tasks/:id')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (id !== undefined) {
      const task = await tasksService.getById(id);
      if (!task) { next(new LogErr({ req, res }, StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)); }
      else {
        res.status(StatusCodes.OK).json(task);
      }
    }
    else { next(new LogErr({ req, res }, StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)); }
  })
  .put(async (req: Request, res: Response, next: NextFunction) => {
    const updatedTask = await tasksService.updateById(req.body);
    if (!updatedTask) { next(new LogErr({ req, res }, StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)); }
    else { res.status(StatusCodes.OK).json(updatedTask); }
  })
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (id !== undefined) {
      const deletedTask = await tasksService.deleteById(id);
      if (!deletedTask) {
        next(new LogErr({ req, res }, StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND));
      }
      else { res.status(StatusCodes.OK).json(deletedTask); }
    }
    else { next(new LogErr({ req, res }, StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)); }
  });

export { router };
