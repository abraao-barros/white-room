import { db } from "./src/lib/db";
import { sql } from "drizzle-orm";

async function check() {
  try {
    const columns = await db.execute(sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'budgets'
        `);
    console.log("Budgets table columns:", columns);
  } catch (e) {
    console.error("Error checking columns:", e);
  }
}

check();
