import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'

const Services = {
  getAll(): Promise<AxiosResponse> {
    return requests.get(`https://api.coin-stats.com/v4/coins?&limit=100`)
  },
}

export default Services
