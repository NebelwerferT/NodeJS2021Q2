import express, { Request, Response, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';;
import { access, constants } from "fs";
import { router as userRouter } from './resources/users/user.router';
import { router as boardRouter } from './resources/boards/board.router';
import { router as taskRouter } from './resources/tasks/task.router';
import { logger } from './middleware/logger';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
app.use(express.json());
app.use(logger.reqLogger);
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/docs', (_req: Request, res: Response, next: NextFunction) => {
  access(`${__dirname}/../out/index.html`, constants.R_OK, (err) => {
    if (err) {
      res.status(404).send("Not Found. Try to execute the npm run doc script through the terminal in the project directory.");
    }
    else {
      next();
    }
  });
});
app.use('/docs', express.static(`${__dirname}/../out/`))

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

app.use(logger.errLogger);

export { app };