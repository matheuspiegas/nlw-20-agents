import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CreateQuestionRequest } from "./types/create-question-request"
import type { CreateQuestionResponse } from "./types/create-question-response"

interface useCreateQuestionProps {
  roomId: string
}

export function useCreateQuestion({ roomId }: useCreateQuestionProps) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CreateQuestionRequest) => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const result: CreateQuestionResponse = await response.json()
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-rooms"] })
    },
  })
}
