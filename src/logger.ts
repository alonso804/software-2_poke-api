import winston from 'winston';

export const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true }),
      ),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'warn' }),
    new winston.transports.File({ filename: 'logs/app.log', level: 'info' }),
  ],
});
