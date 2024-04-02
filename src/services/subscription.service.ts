import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'
import { GetParams } from 'src/services/service'

const Services = {
  getAll({ query }: GetParams): Promise<AxiosResponse> {
    return requests.get(`/subscription?${query}`)
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/subscription/${id}`)
  },
  add(body: any): Promise<AxiosResponse> {
    return requests.post('/subscription', body)
  },
  update(id: string, body: any): Promise<AxiosResponse> {
    return requests.put(`/subscription/${id}`, body)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`/subscription/${id}`)
  }
}

export default Services
