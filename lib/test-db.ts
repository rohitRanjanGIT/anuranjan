/**
 * Quick DB connection test.
 *
 * Run with:  npx tsx lib/test-db.ts
 */
import { pool, query } from "./db";

async function main() {
  try {
    console.log("🔌 Testing database connection...\n");

    const rows = await query<{ now: Date }>("SELECT NOW() AS now");
    console.log("✅ Connected successfully!");
    console.log(`   Server time: ${rows[0].now}\n`);

    // Check database version
    const version = await query<{ version: string }>("SELECT version()");
    console.log(`   ${version[0].version}\n`);
  } catch (err) {
    console.error("❌ Connection failed:", err);
    process.exit(1);
  } finally {
    await pool.end();
    console.log("🔒 Connection pool closed.");
  }
}

main();
