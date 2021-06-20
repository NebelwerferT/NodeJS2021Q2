import { Router, Response, Request, NextFunction } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { User } from './user.model';
import * as usersService from './user.service';
import { LogErr } from '../../middleware/interfaces';

const router = Router();

router.route('/')
  .get(async (_req: Request, res: Response) => {
    const users = await usersService.getAll();
    res.status(StatusCodes.OK).json(users.map(User.toResponse));
  })
  .post(async (req: Request, res: Response) => {
    const user = await usersService.createUser(req.body);
    if (user !== undefined)
      res.status(StatusCodes.CREATED).json(User.toResponse(user));
  });

router.route('/:id')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (id !== undefined) {
      const user = await usersService.getById(id);
      if (!user) { next(new LogErr({ req, res }, StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)); }
      else {
        res.status(StatusCodes.OK).json(User.toResponse(user));
      }
    }
    else { next(new LogErr({ req, res }, StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)); }
  })
  .put(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name } = req.body;
    if (id !== undefined) {
      const updatedUser = await usersService.updateById(id, name);
      if (!updatedUser) { next(new LogErr({ req, res }, StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)); }
      else {
        res.status(StatusCodes.OK).json(User.toResponse(updatedUser));
      }
    }
    else { next(new LogErr({ req, res }, StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)); }
  })
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (id !== undefined) {
      const deletedUser = await usersService.deleteById(id);
      if (!deletedUser) {
        next(new LogErr({ req, res }, StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND));
      }
      else {
        res.status(StatusCodes.OK).json(User.toResponse(deletedUser));
      }
    }
    else { next(new LogErr({ req, res }, StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)); }
  });

export { router };