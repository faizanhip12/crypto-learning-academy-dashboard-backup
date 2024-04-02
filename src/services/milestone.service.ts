import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'
import { IMilestone } from 'src/types/apps/milestone'

const BASE = '/milestone'

const Services = {
  getAll(): Promise<AxiosResponse> {
    return requests.get(`${BASE}`)
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`${BASE}/${id}`)
  },
  add(body: IMilestone): Promise<AxiosResponse> {
    return requests.post(`${BASE}`, body)
  },
  update(id: string, body: IMilestone): Promise<AxiosResponse> {
    return requests.put(`${BASE}/${id}`, body)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`${BASE}/${id}`)
  }
}

export default Services
