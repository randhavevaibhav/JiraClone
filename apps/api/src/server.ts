import { env } from './utils/config';
import app from './app';
import { client } from './db';
import { API_PORT } from './utils/constants';
import { setupGracefulShutdown } from './utils/gracefulShutdown';

const server = app.listen(API_PORT, () => {
  console.log(
    `🚀 ${env.nodeEnv.toUpperCase()} server started on http://localhost:${env.port}`,
  );
});

setupGracefulShutdown(server, client);
