import '../utils/config';
import { client, db, users } from '../db';

afterAll(async () => {
  await client.end();
});

beforeEach(async () => {
  await db.delete(users);
});
