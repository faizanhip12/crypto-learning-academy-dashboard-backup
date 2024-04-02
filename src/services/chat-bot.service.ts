import request from 'src/services/httpService'

export const createEventSource = ({
  url,
  onMessage
}: {
  url: string
  onMessage: (event: { data: any }, request: EventSource) => void
}) => {
  let baseURL = request.getUri()

  let requestUrl = `${baseURL}/${url}`
  const events = new EventSource(requestUrl)

  events.onmessage = event => {
    onMessage(event, events)
  }

  events.onerror = () => {
    events.close()
  }
}

const chatbotServices = {
  getAll: () => {
    return request.get('/ask/list')
  }
}

export default chatbotServices
