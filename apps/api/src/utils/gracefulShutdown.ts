import { Server } from 'node:http';
import postgres from 'postgres';
import { API_FORCE_SHUTDOWN_TIMEOUT } from './constants';

export const setupGracefulShutdown = (server: Server, client: postgres.Sql) => {
  let isShuttingDown = false;

  const gracefulShutdown = async (signal: NodeJS.Signals) => {
    if (isShuttingDown) {
      return;
    }

    isShuttingDown = true;

    console.log(`\nReceived ${signal}. Starting graceful shutdown...`);

    const timeout = setTimeout(() => {
      console.error('Graceful shutdown timed out. Forcing exit.');
      process.exit(1);
    }, API_FORCE_SHUTDOWN_TIMEOUT);

    try {
      //creating a promise and awaiting it because
      // we want to exit the db pool just after server close
      // without it we have to write pool.end() in server.close callback

      // Stop accepting new requests
      await new Promise<void>((resolve, reject) => {
        server.close((err) => {
          if (err) {
            reject(err);
            return;
          }

          console.log('HTTP server closed.');
          resolve();
        });
      });

      // Close PostgreSQL pool
      await client.end();
      console.log('Database pool closed.');

      clearTimeout(timeout);

      console.log('Shutdown complete.');

      process.exit(0);
    } catch (error) {
      clearTimeout(timeout);

      console.error('Shutdown failed:', error);

      process.exit(1);
    }
  };

  process.once('SIGINT', gracefulShutdown);
  process.once('SIGTERM', gracefulShutdown);
};
