import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'
import { ApiParams } from 'src/types/api'
// import { GetParams } from 'src/services/service'

const Services = {
  getAll(): Promise<AxiosResponse> {
    return requests.get('event')
  },
  getAllById(id: string): Promise<AxiosResponse> {
    return requests.get(`event/playlist/${id}`)
  },
  add(data: ApiParams): Promise<AxiosResponse> {
    return requests.post('event', data)
  },
  update(id: string, data: ApiParams): Promise<AxiosResponse> {
    return requests.put(`event/${id}`, data)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`event/${id}`)
  }
}

export default Services
