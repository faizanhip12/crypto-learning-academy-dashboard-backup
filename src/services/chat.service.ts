import requests from 'src/services/httpService'
import { Axios, AxiosResponse } from 'axios'
// import { GetParams } from 'src/services/service'

const Services = {
  getAll(id: string): Promise<AxiosResponse> {
    return requests.get(`auth/users/chat?channelId=${id}`)
  },
  startConversation(id: string): Promise<AxiosResponse> {
    return requests.get(`/conversation/message/${id}`)
  },
  conversationStart(body: { participants: string[] }): Promise<AxiosResponse> {
    return requests.post(`/conversation`, body)
  },
  fethSelectedChannelChat(id: string): Promise<AxiosResponse> {
    return requests.post(`/conversation/channel/${id}`)
  },
  sendMsg(id: string, body: any): Promise<AxiosResponse> {
    return requests.post(`/conversation/message/${id}`, body)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`/conversation/${id}`)
  },
  connection() {
    const requestsURI = requests.getUri()
    const url = new URL(requestsURI)
    return `${url.origin}`
  }
  // disconnect() {
  //   const requestsURI = requests.getUri()
  //   const url = new URL(requestsURI)
  //   return `${url.origin}`
  // }
}

export default Services
