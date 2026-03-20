import { Pool } from "pg";

/**
 * PostgreSQL connection pool singleton.
 *
 * Uses the DB_URI environment variable for the connection string.
 * In development, the pool is cached on `globalThis` so that
 * hot-module-reloading doesn't create a new pool every time.
 */

const globalForPg = globalThis as unknown as {
  pgPool: Pool | undefined;
};

function createPool(): Pool {
  const connectionString = process.env.DB_URI;

  if (!connectionString) {
    throw new Error(
      "❌ DB_URI environment variable is not set. " +
        "Add it to your .env file."
    );
  }

  return new Pool({
    connectionString,
    max: 10, // max number of connections in the pool
    idleTimeoutMillis: 30_000, // close idle connections after 30s
    connectionTimeoutMillis: 5_000, // fail fast if DB is unreachable
    ssl: {
      rejectUnauthorized: false, // required for Neon / most cloud Postgres
    },
  });
}

export const pool: Pool =
  globalForPg.pgPool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  // Preserve the pool across hot reloads in development
  globalForPg.pgPool = pool;
}

// ─── Helper: run a query and return rows ────────────────────────────
export async function query<T = Record<string, unknown>>(
  text: string,
  params?: unknown[]
): Promise<T[]> {
  const result = await pool.query(text, params);
  return result.rows as T[];
}

// ─── Helper: run a query and return the first row (or null) ─────────
export async function queryOne<T = Record<string, unknown>>(
  text: string,
  params?: unknown[]
): Promise<T | null> {
  const rows = await query<T>(text, params);
  return rows[0] ?? null;
}

export default pool;
