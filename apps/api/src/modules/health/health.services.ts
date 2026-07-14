import { sql } from 'drizzle-orm';

import { db } from '../../db/client';

export async function checkDbConnection() {
  return db.execute<{ now: Date }>(sql`SELECT NOW()`);
}
