import { Response, Request } from 'express';
import { User } from './user.model';
import * as usersService from './user.service';

const router = require("express").Router();

router.route('/')
  .get(async (_req: Request, res: Response) => {
    const users = await usersService.getAll();
    res.status(200).json(users.map(User.toResponse));
  })
  .post(async (req: Request, res: Response) => {
    const user = await usersService.createUser(req.body);
    if (user !== undefined)
      res.status(201).json(User.toResponse(user));
  });

router.route('/:id')
  .get(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (id !== undefined) {
      const user = await usersService.getById(id);
      if (!user) { res.sendStatus(404); }
      else {
        res.status(200).json(User.toResponse(user));
      }
    }
    else { res.sendStatus(404); }
  })
  .put(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    if (id !== undefined) {
      const updatedUser = await usersService.updateById(id, name);
      if (!updatedUser) { res.sendStatus(404); }
      else {
        res.status(200).json(User.toResponse(updatedUser));
      }
    }
    else { res.sendStatus(404); }
  })
  .delete(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (id !== undefined) {
      const deletedUser = await usersService.deleteById(id);
      if (!deletedUser) {
        res.sendStatus(404);
      }
      else {
        res.status(200).json(User.toResponse(deletedUser));
      }
    }
    else { res.sendStatus(404); }
  });

export { router };