import { client } from '../db';

afterAll(async () => {
  await client.end();
});
