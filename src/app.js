const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const fs = require("fs");
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/docs', (req, res, next) => {
  fs.access(`${__dirname  }\\..\\out\\index.html`, fs.constants.R_OK, (err) => {
    if (err) {
      res.status(404).send("Not Found. Try to execute the npm run doc script through the terminal in the project directory.");
    }
    else {
      next();
    }
  });
});
app.use('/docs', express.static(`${__dirname  }/../out/`))

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

module.exports = app;
