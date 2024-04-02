import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'
import { GetParams } from 'src/services/service'
import { IPlaylist } from 'src/types/apps/playlist'

const Services = {
  getAll(id: string): Promise<AxiosResponse> {
    return requests.get(`/playlist/channel/${id}`)
  },
  getAllStudents(id: string): Promise<AxiosResponse> {
    return requests.get(`/playlist/${id}/student`)
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/playlist/${id}`)
  },
  enrollInACourse(body: any): Promise<AxiosResponse> {
    return requests.post(`/playlist/enroll`, body)
  },
  add(body: any): Promise<AxiosResponse> {
    return requests.post('/playlist', body)
  },
  update(id: string, body: any): Promise<AxiosResponse> {
    return requests.put(`playlist/${id}`, body)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`playlist/${id}`)
  }
}

export default Services
