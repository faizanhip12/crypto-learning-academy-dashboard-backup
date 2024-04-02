import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'
import { GetParams } from 'src/services/service'

const Services = {
  getAll({ query }: GetParams): Promise<AxiosResponse> {
    return requests.get(`/point?${query}`)
  },
  getAllPoints({ query }: GetParams): Promise<AxiosResponse> {
    return requests.get(`auth/reference?${query}`)
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/point/${id}`)
  },
  add(body: any): Promise<AxiosResponse> {
    return requests.post('auth/user', body)
  },
  update(id: string, body: any): Promise<AxiosResponse> {
    return requests.put(`/point/${id}`, body)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`auth/users/${id}`)
  }
}

export default Services
