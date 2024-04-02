import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'
import { GetParams } from 'src/services/service'

const Services = {
  getAll({ query }: GetParams): Promise<AxiosResponse> {
    return requests.get(`/videos/comment/${query}`)
  },
  getAllById(query: GetParams): Promise<AxiosResponse> {
    return requests.get(`reviews/playlist/${query}`)
  },
  likeReplies(id: string): Promise<AxiosResponse> {
    return requests.get(`/videos/comment/like/${id}`)
  },
  getById(id: any) {
    return requests.get(`/videos/comment/replies/${id}`)
  },
  add(id: any, body: any): Promise<AxiosResponse> {
    return requests.post(`/videos/comment/${id}`, body)
  },
  update(id: string, body: any): Promise<AxiosResponse> {
    return requests.put(`/videos/comment/${id}`, body)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`/videos/comment/${id}`)
  }
}

export default Services
