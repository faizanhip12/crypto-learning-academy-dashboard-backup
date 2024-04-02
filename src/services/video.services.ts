import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'

const Services = {
  getAllByChannel(query: string): Promise<AxiosResponse> {
    return requests.get(`/videos/channel/${query}`)
  },
  getAllLikedVideos(): Promise<AxiosResponse> {
    return requests.get(`/videos/like`)
  },
  getAllSavedVideos(): Promise<AxiosResponse> {
    return requests.get(`/videos/saveVideo`)
  },
  getAllByPlaylistId(query: string): Promise<AxiosResponse> {
    return requests.get(`/videos/playlist/${query}`)
  },
  getAll(query: string): Promise<AxiosResponse> {
    return requests.get(`/videos/me/channel/${query}`)
  },
  getAllVideos(): Promise<AxiosResponse> {
    return requests.get(`/videos/channel`)
  },
  getLikeStatus(id: string): Promise<AxiosResponse> {
    return requests.get(`/videos/like/${id}`)
  },
  getSaveStatus(id: string): Promise<AxiosResponse> {
    return requests.get(`/videos/saveVideo/${id}`)
  },
  getById(id: string, playlistId: string): Promise<AxiosResponse> {
    return requests.get(`/videos/view/${id}/${playlistId ? playlistId : undefined}`)
  },
  updateVideo(id: string, body: any): Promise<AxiosResponse> {
    return requests.put(`/videos/${id}`, body)
  },
  getByVideoId(id: string): Promise<AxiosResponse> {
    return requests.get(`/videos/saveVideo/${id}`)
  },
  getByPlaylistId(id: string): Promise<AxiosResponse> {
    return requests.get(`/playlist/${id}`)
  },
  getAllComments(id: string): Promise<AxiosResponse> {
    return requests.get(`/videos/comment/${id}`)
  },
  postComments(id: string, body: any): Promise<AxiosResponse> {
    return requests.post(`/videos/comment/${id}`, body)
  },
  likeComments(id: string): Promise<AxiosResponse> {
    return requests.get(`/videos/comment/like/${id}`)
  },
  updateComments(id: string, body: any): Promise<AxiosResponse> {
    return requests.put(`/videos/comment/${id}`, body)
  },
  deleteComments(id: string): Promise<AxiosResponse> {
    return requests.delete(`/videos/comment/${id}`)
  },
  add(body: any): Promise<AxiosResponse> {
    return requests.post('/videos', body)
  },
  update(id: string, body: any): Promise<AxiosResponse> {
    return requests.put(`/auth/employee/${id}`, body)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`/videos/${id}`)
  },
  createLiveVideoEvent(data: any): Promise<AxiosResponse> {
    return requests.post(`/videos/createLiveVideoEvent`, data)
  }
}

export default Services
