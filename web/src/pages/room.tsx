import { Navigate, useParams } from "react-router-dom"

type RoomParams = {
  roomId: string
}

export function Room() {
  const params = useParams<RoomParams>()
  if (!params.roomId) {
    return <Navigate to="/" replace />
  }
  return (
    <div>
      <h1>Room Details</h1>
      <div>{JSON.stringify(params)}</div>
    </div>
  )
}
