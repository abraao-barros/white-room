import { db } from "./src/lib/db"
import { systemSettings } from "./src/lib/db/schema"
import { randomUUID } from "node:crypto"

async function main() {
  try {
    const userId = "d5771ab2-c98c-4f10-90fe-fbe4cd0364d2" // dummy uuid, maybe use an existing one?
    // Actually just use a fake UUID that is in users, wait, FK constraint!
    // Let's get a random user
    const users = await db.query.users.findMany({ limit: 1 })
    if (users.length === 0) { console.log("No users found"); return; }
    const actualUserId = users[0].id

    console.log("Found user", actualUserId)
    
    await db.insert(systemSettings).values({
      userId: actualUserId,
      id: "test",
      value: "value1",
    }).onConflictDoUpdate({
      target: [systemSettings.userId, systemSettings.id],
      set: { value: "value2" },
    })

    console.log("Success")
  } catch (e) {
    console.error("Error:", e)
  }
  process.exit(0)
}
main()
