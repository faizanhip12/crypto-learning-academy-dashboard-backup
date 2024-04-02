import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'
import { GetParams } from 'src/services/service'

const Services = {
  getAll({ query }: GetParams): Promise<AxiosResponse> {
    return requests.get(`/challenges?${query}`)
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/challenges/${id}`)
  },
  add(body: any): Promise<AxiosResponse> {
    return requests.post('/challenges', body)
  },
  update(id: string, body: any): Promise<AxiosResponse> {
    return requests.put(`/challenges/${id}`, body)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`/challenges/${id}`)
  }
}

export default Services
