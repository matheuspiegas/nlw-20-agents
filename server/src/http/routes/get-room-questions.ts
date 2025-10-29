import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { db } from "../../db/connection.ts"
import { schema } from "../../db/schema/index.ts"
import z from "zod"
import { desc, eq } from "drizzle-orm"

export const getRoomQuestions: FastifyPluginCallbackZod = (app) => {
  app.get(
    "/rooms/:roomId/questions",
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    async (req, reply) => {
      const { roomId } = req.params

      const result = await db
        .select({
          id: schema.questions.id,
          question: schema.questions.question,
          createdAt: schema.questions.createdAt,
          answer: schema.questions.answer,
        })
        .from(schema.questions)
        .where(eq(schema.questions.roomId, roomId))
        .orderBy(desc(schema.questions.createdAt))
      return result
    }
  )
}
