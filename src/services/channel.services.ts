import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'
import { GetParams } from 'src/services/service'

const Services = {
  getAll({ query }: GetParams): Promise<AxiosResponse> {
    return requests.get(`/channel?${query}`)
  },
  getAbout(query: GetParams): Promise<AxiosResponse> {
    return requests.get(`/channel/${query}`)
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/challenges/${id}`)
  },
  getByUser(): Promise<AxiosResponse> {
    return requests.get(`/channel/list/me`)
  },
  getChannelsByUserId(userId: string): Promise<AxiosResponse> {
    return requests.get(`/channel/user/${userId}`)
  },
  getByChannelId(id: string): Promise<AxiosResponse> {
    return requests.get(`/channel/${id}`)
  },
  subscribeByChannelId(id: any): Promise<AxiosResponse> {
    return requests.get(`/channel/subscribe/${id}`)
  },
  add(body: any): Promise<AxiosResponse> {
    return requests.post('/channel', body)
  },
  update(id: string, body: any): Promise<AxiosResponse> {
    return requests.put(`/channel/${id}`, body)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`/channel/${id}`)
  }
}

export default Services
