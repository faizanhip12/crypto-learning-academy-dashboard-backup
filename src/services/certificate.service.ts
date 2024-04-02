import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'
import { GetParams } from 'src/services/service'

export interface CertificateParams {
  studentId: string
  courseId: string
}

const Services = {
  getAll({ query }: GetParams): Promise<AxiosResponse> {
    return requests.get(`auth/users?${query}`)
  },
  getById(id: string, studentId: string): Promise<AxiosResponse> {
    return requests.get(`/certificate/${id}/student/${studentId}`)
  },
  create(body: CertificateParams): Promise<AxiosResponse> {
    return requests.post('/certificate', body)
  }
}

export default Services
