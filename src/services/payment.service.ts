import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'
import { GetParams } from 'src/services/service'

const Services = {
  getAll({ query }: GetParams): Promise<AxiosResponse> {
    return requests.get(`invoice/admin`)
  },
  getAllById(query: GetParams): Promise<AxiosResponse> {
    return requests.get(`reviews/playlist/${query}`)
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`reviews/${id}`)
  },
  add(body: any): Promise<AxiosResponse> {
    return requests.post('reviews', body)
  },
  update(id: string, body: any): Promise<AxiosResponse> {
    return requests.put(`reviews/${id}`, body)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`reviews/${id}`)
  }
}

export default Services
