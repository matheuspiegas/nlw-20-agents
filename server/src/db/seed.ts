import { reset, seed } from "drizzle-seed"
import { db } from "./connection.ts"
import { schema } from "./schema/index.ts"

await reset(db, schema)
await seed(db, schema).refine((f) => ({
  rooms: {
    count: 20,
    columns: {
      name: f.companyName(),
      description: f.loremIpsum(),
    },
    with: { questions: 5 },
  },
}))

// biome-ignore lint/suspicious/noConsole: only used in dev
console.log("Database seeded")
process.exit(0)
