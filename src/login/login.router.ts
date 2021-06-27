import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../common/config';
import { authenticate } from "./login.service";

const loginRouter = express.Router();

loginRouter.route('/login').post(async (req: Request, res: Response) => {
    const user = req.body;
    const curUser = await authenticate(user);
    if (curUser) {
        const payload = { userId: curUser.id, login: curUser.login };
        const jwToken = jwt.sign(payload, String(JWT_SECRET_KEY));
        return res.status(StatusCodes.OK).json({token: jwToken});
    }
    return res.status(StatusCodes.FORBIDDEN).json(ReasonPhrases.FORBIDDEN);
});

export { loginRouter };