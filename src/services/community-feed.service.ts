import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'
import { GetParams } from 'src/services/service'

const Services = {
  getAll({ query }: GetParams): Promise<AxiosResponse> {
    return requests.get(`community-portal?${query}`)
  },
  getAllByUser(id: string): Promise<AxiosResponse> {
    return requests.get(`/community-portal/user/${id}`)
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`community-portal/${id}`)
  },
  add(body: any): Promise<AxiosResponse> {
    return requests.post('community-portal', body)
  },
  update(id: string, body: any): Promise<AxiosResponse> {
    return requests.put(`community-portal/${id}`, body)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`community-portal/${id}`)
  },
  getAllComments({ query }: GetParams): Promise<AxiosResponse> {
    return requests.get(`/community-portal/comment/${query}`)
  },
  postComments(body: any): Promise<AxiosResponse> {
    return requests.post(`/community-portal/comment`, body)
  },
  deleteComments(id: string): Promise<AxiosResponse> {
    return requests.delete(`/community-portal/comment/${id}`)
  },
  updateComments(id: string, body: any): Promise<AxiosResponse> {
    return requests.put(`/community-portal/comment/${id}`, body)
  },
  likePost(id: any): Promise<AxiosResponse> {
    return requests.get(`/community-portal/like/${id}`)
  }
}

export default Services
