import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'
import { GetParams } from 'src/services/service'
import { IAssignment } from 'src/types/apps/assignment'

const Services = {
  getAll(query: GetParams): Promise<AxiosResponse> {
    return requests.get(`/playlist/workSpace/folder/${query}`)
  },
  getSingleStudentAssignment(id: string, courseId: string): Promise<AxiosResponse> {
    return requests.get(`/assignment/student/${id}/${courseId}`)
  },
  getById(id: string) {
    return requests.get(`/assignment/${id}`)
  },
  add(body: IAssignment): Promise<AxiosResponse> {
    return requests.post(`/assignment/submit-test`, body)
  },
  update(id: string, body: any): Promise<AxiosResponse> {
    return requests.put(`reviews/${id}`, body)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`reviews/${id}`)
  }
}

export default Services
