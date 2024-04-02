import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'
// import { GetParams } from 'src/services/service'

const Services = {
  getAll(): Promise<AxiosResponse> {
    return requests.get('/event')
  }
}

export default Services
