import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'

const BASE_URL = 'feedback'

const Services = {
  getAll(): Promise<AxiosResponse> {
    return requests.get(`${BASE_URL}`)
  },
  getAllByCustomer(): Promise<AxiosResponse> {
    return requests.get(`${BASE_URL}/customer`)
  },
  add(data: any): Promise<AxiosResponse> {
    return requests.post(`${BASE_URL}`, data)
  }
}

export default Services
