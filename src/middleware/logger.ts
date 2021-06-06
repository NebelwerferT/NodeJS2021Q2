import { NextFunction, Request, Response } from "express";
import { finished } from "stream";
import { StatusCodes } from 'http-status-codes';
import { transport } from './transport';
import { LogErr, UnexpErr } from "./interfaces";

const reqLogger = (req: Request, res: Response, next: NextFunction) => {
    const date = new Date();
    const start = Date.now();
    next();
    finished(res, () => {
        const time = Date.now() - start;
        transport.request({ date, req, res, time });
    });
};

const errLogger = (err: LogErr, req: Request, res: Response, next: NextFunction) => {
    const date = new Date();
    const reqres = { req, res };
    const errLog = new LogErr(reqres, err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, err.msg, err.stack, date);
    res.status(errLog.statusCode).json({
        statusCode: errLog.statusCode,
        error: errLog.msg
    });
    res.on('finish', () => transport.error(errLog));
    next();
};

const uncaughtException = process.on('uncaughtException', (err: Error) => {
    const date = new Date();
    transport.unexp(new UnexpErr(date, StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    process.exit(1);
});
const unhandledRejection = process.on('unhandledRejection', (err: Error) => {
    const date = new Date();
    transport.unexp(new UnexpErr(date, StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    process.exit(1);
});

export const logger = {
    reqLogger,
    errLogger,
    uncaughtException,
    unhandledRejection
};