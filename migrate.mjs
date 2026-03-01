import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import pg from "pg";

const { Client } = pg;

async function migrate() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL is not set, skipping migration");
    process.exit(1);
  }

  const client = new Client({ connectionString: databaseUrl });

  try {
    await client.connect();
    console.log("Connected to database");

    // Create migrations tracking table if not exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS __drizzle_migrations (
        id SERIAL PRIMARY KEY,
        hash TEXT NOT NULL UNIQUE,
        created_at BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)
      )
    `);

    // Read migration files
    const migrationsDir = join(process.cwd(), "drizzle");
    const files = readdirSync(migrationsDir)
      .filter((f) => f.endsWith(".sql"))
      .sort();

    for (const file of files) {
      // Check if already applied
      const hash = file.replace(".sql", "");
      const { rows } = await client.query(
        "SELECT id FROM __drizzle_migrations WHERE hash = $1",
        [hash]
      );

      if (rows.length > 0) {
        console.log(`Migration ${file} already applied, skipping`);
        continue;
      }

      // Run migration
      const sql = readFileSync(join(migrationsDir, file), "utf-8");
      console.log(`Applying migration: ${file}`);
      await client.query(sql);

      // Record migration
      await client.query(
        "INSERT INTO __drizzle_migrations (hash) VALUES ($1)",
        [hash]
      );
      console.log(`Migration ${file} applied successfully`);
    }

    console.log("All migrations complete");
  } catch (error) {
    console.error("Migration failed:", error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

migrate();
