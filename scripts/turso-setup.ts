/**
 * One-time Turso setup — applies the Prisma schema to a Turso database
 * over HTTPS (no Turso CLI required) and then seeds the admin user.
 *
 * Usage (PowerShell):
 *   $env:TURSO_DATABASE_URL="libsql://<your-db>.turso.io"
 *   $env:TURSO_AUTH_TOKEN="<token>"
 *   npm run turso:setup
 */
import { execSync } from "node:child_process";
import { createClient } from "@libsql/client";

async function main() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    console.error("❌ TURSO_DATABASE_URL is not set.");
    process.exit(1);
  }

  console.log("① Generating schema SQL from prisma/schema.prisma …");
  const sql = execSync(
    "npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script",
    { encoding: "utf8" }
  );

  console.log("② Applying schema to Turso …");
  const client = createClient({ url, authToken });
  await client.executeMultiple(sql);
  console.log("   ✅ Tables created.");

  console.log("③ Seeding admin user + welcome post …");
  execSync("npx tsx prisma/seed.ts", { stdio: "inherit", env: process.env });

  console.log("\n🎉 Turso database is ready.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
