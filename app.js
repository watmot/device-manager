import devicesRouter from './routers/devices';
import express from 'express';

export default function (database) {
  const app = express();

  app.use('/devices', devicesRouter(database));

  return app;
}
