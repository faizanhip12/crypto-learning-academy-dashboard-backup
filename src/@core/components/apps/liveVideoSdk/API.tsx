//Auth token we will use to generate a meeting and connect to it
export const authToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI0NjkzNmQxZS00NDY1LTQ1NmEtOTFkOS1iZWYyMjA1ZDgxZWYiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY4ODU1MTk3NiwiZXhwIjoxODQ2MzM5OTc2fQ.jBoCeDOFhFc06-08vjyCEJdf-COnmbDo5Bltm7Dg_N0'

export const createMeeting = async () => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: 'POST',
    headers: {
      authorization: `${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  })
  //Destructuring the roomId from the response
  const { roomId } = await res.json()
  return roomId
}
