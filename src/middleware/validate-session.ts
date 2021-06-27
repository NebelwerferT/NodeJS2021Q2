import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../common/config';

function validateSession(req: Request, res: Response, next: NextFunction) {
    if (req.url === '/login' || req.url === '/doc' || req.url === '/') {
        return next();
    }
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader !== undefined) {
        const [type, token] = authorizationHeader.split(' ');
        if (type !== 'Bearer' || !token) {
            return res.status(StatusCodes.UNAUTHORIZED).send('Wrong auth scheme');
        }
        jwt.verify(token, String(JWT_SECRET_KEY));
        return next();
    }
    return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
}

export { validateSession };