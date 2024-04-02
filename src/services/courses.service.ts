import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'
import { GetParams } from 'src/services/service'

const Services = {
  getAll({ query }: GetParams): Promise<AxiosResponse> {
    return requests.get(`auth/users?${query}`)
  },
  getAllMyCourses({ query }: GetParams): Promise<AxiosResponse> {
    return requests.get(`/auth/student?${query ? `take=${query}` : ''}`)
  },
  getAllTopCourses(): Promise<AxiosResponse> {
    return requests.get(`/playlist/top-courses`)
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`auth/users/${id}`)
  },
  add(body: any): Promise<AxiosResponse> {
    return requests.post('videos', body)
  },
  addVideo(body: any): Promise<AxiosResponse> {
    return requests.post('videos/livewaiting', body)
  },
  update(id: string, body: any): Promise<AxiosResponse> {
    return requests.put(`auth/users/${id}`, body)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`playlist/${id}`)
  }
}

export default Services
