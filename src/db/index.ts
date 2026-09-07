import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

function getDb() {
  if (!_db) {
    _db = drizzle(neon(process.env.DATABASE_URL!), { schema });
  }
  return _db;
}

// Proxy so `db.select(...)` still works while deferring the connection
// until the first actual query, rather than at module load during build.
export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get: (_, prop) => Reflect.get(getDb(), prop),
});