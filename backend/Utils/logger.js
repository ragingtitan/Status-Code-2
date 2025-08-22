import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import fs from 'fs';

const logDir = path.resolve('logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const transport = new DailyRotateFile({
  filename: path.join(logDir, 'activity-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxFiles: '30d',
  auditFile: path.join(logDir, '.activity-audit.json'),
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [transport]
});

export default logger;

