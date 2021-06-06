import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const { PORT, NODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY } = process.env;
const AUTH_MODE = process.env['AUTH_MODE'] === 'true';

const LOG_DIR = 'logs';
const REQ_LOG = `${LOG_DIR}/log_info.txt`;
const ERR_LOG = `${LOG_DIR}/log_errors.txt`;
const UNP_LOG = `${LOG_DIR}/log_unexpected_errors.txt`;

export { LOG_DIR, REQ_LOG, ERR_LOG, UNP_LOG };

export {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  AUTH_MODE
};