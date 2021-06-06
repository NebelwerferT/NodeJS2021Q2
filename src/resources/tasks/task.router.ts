import { Request, Response } from 'express';
import * as tasksService from './task.service';

const router = require('express').Router();


router.route('/:boardId/tasks/')
  .get(async (req: Request, res: Response) => {
    const { boardId } = req.params;
    if (boardId !== undefined) {
      const tasks = await tasksService.getAll(boardId);
      if (tasks.length === 0) { res.sendStatus(404); }
      else { res.status(200).json(tasks); }
    }
    else { res.sendStatus(404); }
  })
  .post(async (req: Request, res: Response) => {
    const { boardId } = req.params;
    if (!req.body.boardId && boardId) { req.body.boardId = boardId }
    if (req.body.boardId) {
      const task = await tasksService.createTask(req.body);
      res.status(201).json(task);
    }
    else {
      res.sendStatus(400);
    }
  });

router.route('/:boardId/tasks/:id')
  .get(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (id !== undefined) {
      const task = await tasksService.getById(id);
      if (!task) { res.sendStatus(404); }
      res.status(200).json(task);
    }
    else { res.sendStatus(404); }
  })
  .put(async (req: Request, res: Response) => {
    const updatedTask = await tasksService.updateById(req.body);
    if (!updatedTask) { res.sendStatus(404); }
    else { res.status(200).json(updatedTask); }
  })
  .delete(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (id !== undefined) {
      const deletedTask = await tasksService.deleteById(id);
      if (deletedTask === undefined) {
        res.sendStatus(404);
      }
      else { res.status(200).json(deletedTask); }
    }
    else { res.sendStatus(404); }
  });

export { router };
