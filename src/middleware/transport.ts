import fs from 'fs';
import { REQ_LOG, ERR_LOG, UNP_LOG, LOG_DIR } from '../common/config';
import { ILogErr, ILogInfo, IUnexpErr } from "./interfaces";

const mkdir = (path: string) => {
    if (!fs.existsSync(path)) { fs.mkdirSync(path); }
};

mkdir(LOG_DIR);

const reqLogStream = fs.createWriteStream(REQ_LOG, { flags: "a" });
const errLogStream = fs.createWriteStream(ERR_LOG, { flags: 'a' });

export const transport = {
    request: ({ date, req, res, time }: ILogInfo) => {
        reqLogStream.write(
            `Date: ${date} 
            Method: ${req.method} 
            URL: ${req.originalUrl} 
            Query Params: ${JSON.stringify(req.params)} 
            Body: ${JSON.stringify(req.body)} 
            Status: ${res.statusCode} 
            Time: [${time} ms]\n`
        );
    },
    error: (errLog: ILogErr) => {
        errLogStream.write(
            `Date: ${errLog.date}
            Method: ${errLog.reqres.req.method} 
            URL: ${errLog.reqres.req.url} 
            Query Params: ${JSON.stringify(errLog.reqres.req.params)} 
            Body: ${JSON.stringify(errLog.reqres.req.body)} 
            Status: ${errLog.statusCode} 
            Message: ${errLog.msg}\n`);
    },
    unexp: (unexpErr: IUnexpErr) => {
        fs.appendFileSync(UNP_LOG,
            `Date: ${unexpErr.date} 
            Status: ${unexpErr.statusCode} 
            Message: ${unexpErr.msg} 
            Stack: ${unexpErr.stack}\n`,
            { flag: 'a' });
    }
};