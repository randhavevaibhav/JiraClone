import app from './app';
import { client } from './db';
import { config } from './utils/config';
import { API_PORT } from './utils/constants';
import { setupGracefulShutdown } from './utils/gracefulShutdown';

const server = app.listen(API_PORT, () => {
  console.log(
    `🚀 Server running in ${config.ENV} mode on http://localhost:${API_PORT}`,
  );
  console.log(`URL: ${config.API_URL}`);
});

setupGracefulShutdown(server, client);
