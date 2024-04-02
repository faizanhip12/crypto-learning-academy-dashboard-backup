import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'
import { GetParams } from 'src/services/service'

const Services = {
  getAll(query: GetParams): Promise<AxiosResponse> {
    return requests.get(`/playlist/workSpace/folder/${query}`)
  },
  getById(query: any) {
    return requests.get(`/playlist/workSpace/playlist/${query}`)
  },
  addWokspaceFiles(id: string, file: any): Promise<AxiosResponse> {
    return requests.post(`/file?folderId=${id}`, file)
  },
  addWokspaceFolders(id: string, body: any): Promise<AxiosResponse> {
    return requests.post(`/playlist/workSpace/folder/${id}`, body)
  },
  update(id: string, body: any): Promise<AxiosResponse> {
    return requests.put(`reviews/${id}`, body)
  },
  updateFolderName(id: string, body: any): Promise<AxiosResponse> {
    return requests.put(`/playlist/workspace/folder/${id}`, body)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`reviews/${id}`)
  },
  deleteFile(id: string): Promise<AxiosResponse> {
    return requests.delete(`file/${id}`)
  },
  deleteFolder(id: string): Promise<AxiosResponse> {
    return requests.delete(`/playlist/workspace/folder/${id}`)
  }
}

export default Services
