import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'
import { GetParams } from 'src/services/service'

const Services = {
  getAll({ query }: GetParams): Promise<AxiosResponse> {
    return requests.get(`auth/teachers?${query}`)
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`auth/users/${id}`)
  },
  add(body: any): Promise<AxiosResponse> {
    return requests.post('auth/user', body)
  },
  update(id: string, body: any): Promise<AxiosResponse> {
    return requests.put(`auth/users/${id}`, body)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`auth/users/${id}`)
  }
}

export default Services
