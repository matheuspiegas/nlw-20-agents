import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CreateRoomRequest } from "./types/create-room-request"
import type { CreateRoomResponse } from "./types/create-room-response"

export function useCreateRoom() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CreateRoomRequest) => {
      const response = await fetch("http://localhost:3333/rooms", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const result: CreateRoomResponse = await response.json()
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-rooms"] })
    },
  })
}
