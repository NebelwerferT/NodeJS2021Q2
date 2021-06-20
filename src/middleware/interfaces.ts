import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export interface IReqRes {
    req: Request,
    res: Response,
}

export interface ILogErr extends Error {
    date?: Date,
    reqres: IReqRes;
    statusCode: number;
    msg: string;
    stack?: string;
}

export interface IUnexpErr extends Error {
    date: Date,
    statusCode: number;
    msg: string;
}

export interface ILogInfo {
    date: Date,
    req: Request,
    res: Response,
    time: number;
}

export class UnexpErr extends Error implements IUnexpErr {
    date: Date;

    statusCode: number;

    msg: string;

    constructor(
        date: Date,
        statusCode: number,
        msg: string
    ) {
        super();
        this.date = date;
        this.statusCode = statusCode;
        this.msg = msg;
    }
}

export class LogErr extends Error implements ILogErr {
    reqres: IReqRes;

    statusCode: number;

    msg: string;

    stack?: string;

    date?: Date;

    constructor(
        reqres: IReqRes,
        statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
        msg: string = ReasonPhrases.INTERNAL_SERVER_ERROR,
        stack?: string,
        date?: Date,
    ) {
        super();
        this.date = date;
        this.reqres = reqres;
        this.statusCode = statusCode;
        this.msg = msg;
        this.stack = stack;
    }
}